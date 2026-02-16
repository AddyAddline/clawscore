#!/usr/bin/env bash
set -euo pipefail

API_BASE="https://clawscore.setupmyclaw.in"
LOCAL_ONLY=0
AUTO_YES=0
ANONYMOUS=0

for arg in "$@"; do
  case "$arg" in
    --local) LOCAL_ONLY=1 ;;
    --yes) AUTO_YES=1 ;;
    --anonymous) ANONYMOUS=1 ;;
    *) echo "Unknown flag: $arg"; exit 1 ;;
  esac
done

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required"
  exit 1
fi

green='\033[0;32m'
yellow='\033[1;33m'
red='\033[0;31m'
blue='\033[0;34m'
muted='\033[0;37m'
reset='\033[0m'

pass() { printf "%bPASS%b" "$green" "$reset"; }
warn() { printf "%bWARN%b" "$yellow" "$reset"; }
fail() { printf "%bFAIL%b" "$red" "$reset"; }

print_header() {
  echo -e "${blue}┌──────────────────────────────────────────┐${reset}"
  echo -e "${blue}│      CLAWSCORE SECURITY SCANNER v1       │${reset}"
  echo -e "${blue}└──────────────────────────────────────────┘${reset}"
}

hash_machine_id() {
  if [[ "$ANONYMOUS" -eq 1 ]]; then
    echo "anonymous"
    return
  fi

  local raw
  raw="$(hostname 2>/dev/null || echo unknown)-$(uname -n 2>/dev/null || echo host)"

  if command -v sha256sum >/dev/null 2>&1; then
    echo -n "$raw" | sha256sum | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then
    echo -n "$raw" | shasum -a 256 | awk '{print $1}'
  else
    echo "anon-fallback"
  fi
}

version_to_int() {
  local ver="$1"
  local a b c
  a=$(echo "$ver" | cut -d'.' -f1)
  b=$(echo "$ver" | cut -d'.' -f2)
  c=$(echo "$ver" | cut -d'.' -f3)
  a=${a:-0}; b=${b:-0}; c=${c:-0}
  printf "%d%03d%03d" "$a" "$b" "$c"
}

status_json() {
  case "$1" in
    pass) echo "pass" ;;
    warn) echo "warn" ;;
    fail) echo "fail" ;;
    *) echo "warn" ;;
  esac
}

print_check() {
  local label="$1"
  local status="$2"
  local detail="$3"

  if [[ "$status" == "pass" ]]; then
    echo -e "  $(pass)  ${label}: ${detail}"
  elif [[ "$status" == "warn" ]]; then
    echo -e "  $(warn)  ${label}: ${detail}"
  else
    echo -e "  $(fail)  ${label}: ${detail}"
  fi
}

print_header

echo -e "${muted}[scan] Detecting OpenClaw installation...${reset}"
if ! command -v openclaw >/dev/null 2>&1; then
  echo -e "$(fail) OpenClaw CLI not found in PATH"
  echo "Install OpenClaw first, then re-run this scanner."
  exit 1
fi

OPENCLAW_VERSION_RAW="$(openclaw --version 2>/dev/null | head -n1 || true)"
OPENCLAW_VERSION="$(echo "$OPENCLAW_VERSION_RAW" | grep -Eo '[0-9]+\.[0-9]+\.[0-9]+' || true)"
OPENCLAW_VERSION="${OPENCLAW_VERSION:-0.0.0}"

REQ_VERSION="2026.1.29"
REQ_INT=$(version_to_int "$REQ_VERSION")
CUR_INT=$(version_to_int "$OPENCLAW_VERSION")

# Version check (20)
if [[ "$CUR_INT" -ge "$REQ_INT" ]]; then
  version_score=20; version_status="pass"; version_detail="Patched ($OPENCLAW_VERSION)"
else
  version_score=0; version_status="fail"; version_detail="Outdated ($OPENCLAW_VERSION < $REQ_VERSION)"
fi

# Auth check (25)
auth_val="$(openclaw config get gateway.auth.enabled 2>/dev/null || echo unknown)"
if [[ "$auth_val" == "true" || "$auth_val" == "1" ]]; then
  auth_score=25; auth_status="pass"; auth_detail="Authentication enabled"
elif [[ "$auth_val" == "false" || "$auth_val" == "0" ]]; then
  auth_score=0; auth_status="fail"; auth_detail="Authentication disabled"
else
  auth_score=10; auth_status="warn"; auth_detail="Could not verify auth state"
fi

# Network check (20)
host_val="$(openclaw config get gateway.host 2>/dev/null || echo unknown)"
if [[ "$host_val" == "127.0.0.1" || "$host_val" == "localhost" ]]; then
  network_score=20; network_status="pass"; network_detail="Bound locally ($host_val)"
elif [[ "$host_val" == "0.0.0.0" ]]; then
  network_score=0; network_status="fail"; network_detail="Exposed host binding ($host_val)"
else
  network_score=8; network_status="warn"; network_detail="Host binding unclear ($host_val)"
fi

# Skills check (15)
skill_list="$(openclaw skills list 2>/dev/null || true)"
skill_names="$(echo "$skill_list" | awk 'NR>1 {print $1}' | tr '\n' ',' | sed 's/,$//')"
unverified_count=$(echo "$skill_list" | grep -ci 'unverified' || true)
malicious_count=$(echo "$skill_list" | grep -ci 'malicious' || true)
if [[ "$malicious_count" -gt 0 ]]; then
  skills_score=0; skills_status="fail"; skills_detail="$malicious_count malicious skills detected"
elif [[ "$unverified_count" -gt 0 ]]; then
  penalty=$((unverified_count * 5))
  raw=$((15 - penalty))
  if [[ "$raw" -lt 0 ]]; then raw=0; fi
  skills_score=$raw; skills_status="warn"; skills_detail="$unverified_count unverified skills"
else
  skills_score=15; skills_status="pass"; skills_detail="All installed skills verified"
fi

# Permissions check (10)
cred_file="$HOME/.openclaw/credentials.json"
if [[ -f "$cred_file" ]]; then
  perm=$(stat -c "%a" "$cred_file" 2>/dev/null || stat -f "%A" "$cred_file" 2>/dev/null || echo 644)
  case "$perm" in
    600|400) permissions_score=10; permissions_status="pass"; permissions_detail="Credential permissions strict ($perm)" ;;
    640|644) permissions_score=5; permissions_status="warn"; permissions_detail="Credential readable by others ($perm)" ;;
    *) permissions_score=0; permissions_status="fail"; permissions_detail="Credential permission unsafe ($perm)" ;;
  esac
else
  permissions_score=6; permissions_status="warn"; permissions_detail="Credentials file not found for audit"
fi

# Process check (5)
gateway_pid="$(pgrep -f 'openclaw.*gateway' | head -n1 || true)"
if [[ -n "$gateway_pid" ]]; then
  owner="$(ps -o user= -p "$gateway_pid" 2>/dev/null | tr -d ' ' || echo unknown)"
  if [[ "$owner" == "root" ]]; then
    process_score=0; process_status="fail"; process_detail="Gateway process running as root"
  else
    process_score=5; process_status="pass"; process_detail="Gateway process running as $owner"
  fi
else
  process_score=3; process_status="warn"; process_detail="Could not detect running gateway process"
fi

# SSL/TLS check (5)
ssl_mode="$(openclaw config get gateway.tls.mode 2>/dev/null || echo unknown)"
if [[ "$ssl_mode" == "valid" || "$ssl_mode" == "strict" ]]; then
  ssl_score=5; ssl_status="pass"; ssl_detail="Valid TLS mode ($ssl_mode)"
elif [[ "$ssl_mode" == "self-signed" ]]; then
  ssl_score=3; ssl_status="warn"; ssl_detail="Self-signed TLS certificate"
elif [[ "$ssl_mode" == "off" || "$ssl_mode" == "none" ]]; then
  ssl_score=0; ssl_status="fail"; ssl_detail="TLS disabled"
else
  ssl_score=2; ssl_status="warn"; ssl_detail="TLS status unknown"
fi

total=$((version_score + auth_score + network_score + skills_score + permissions_score + process_score + ssl_score))
if [[ "$total" -gt 100 ]]; then total=100; fi

echo ""
echo -e "${muted}[scan] Results${reset}"
print_check "Version" "$version_status" "$version_detail"
print_check "Authentication" "$auth_status" "$auth_detail"
print_check "Network" "$network_status" "$network_detail"
print_check "Skills" "$skills_status" "$skills_detail"
print_check "Permissions" "$permissions_status" "$permissions_detail"
print_check "Process" "$process_status" "$process_detail"
print_check "SSL/TLS" "$ssl_status" "$ssl_detail"

echo ""
if [[ "$total" -ge 80 ]]; then
  echo -e "Security Score: ${green}${total}/100${reset}"
elif [[ "$total" -ge 50 ]]; then
  echo -e "Security Score: ${yellow}${total}/100${reset}"
else
  echo -e "Security Score: ${red}${total}/100${reset}"
fi

echo ""
echo "Top fixes:"
if [[ "$network_status" == "fail" ]]; then
  echo "  [CRITICAL] Network exposure"
  echo "    openclaw config set gateway.host \"127.0.0.1\""
  echo "    openclaw gateway restart"
fi
if [[ "$auth_status" == "fail" ]]; then
  echo "  [CRITICAL] Authentication disabled"
  echo "    openclaw config set gateway.auth.enabled true"
  echo "    openclaw gateway restart"
fi
if [[ "$skills_status" != "pass" ]]; then
  echo "  [HIGH] Untrusted skill inventory"
  echo "    openclaw skills list --unverified"
  echo "    openclaw skills remove <skill-name>"
fi
if [[ "$ssl_status" == "fail" || "$ssl_status" == "warn" ]]; then
  echo "  [MEDIUM] Improve TLS"
  echo "    openclaw cert issue --provider letsencrypt"
  echo "    openclaw gateway restart"
fi

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
machine_id=$(hash_machine_id)
skills_json="[]"
if [[ -n "$skill_names" ]]; then
  skills_json="[\"$(echo "$skill_names" | sed 's/,/\",\"/g')\"]"
fi

payload=$(cat <<JSON
{
  "version": "$OPENCLAW_VERSION",
  "checks": {
    "version": { "score": $version_score, "max": 20, "status": "$(status_json "$version_status")", "details": "$version_detail" },
    "auth": { "score": $auth_score, "max": 25, "status": "$(status_json "$auth_status")", "details": "$auth_detail" },
    "network": { "score": $network_score, "max": 20, "status": "$(status_json "$network_status")", "details": "$network_detail" },
    "skills": { "score": $skills_score, "max": 15, "status": "$(status_json "$skills_status")", "details": "$skills_detail" },
    "permissions": { "score": $permissions_score, "max": 10, "status": "$(status_json "$permissions_status")", "details": "$permissions_detail" },
    "process": { "score": $process_score, "max": 5, "status": "$(status_json "$process_status")", "details": "$process_detail" },
    "ssl": { "score": $ssl_score, "max": 5, "status": "$(status_json "$ssl_status")", "details": "$ssl_detail" }
  },
  "skills": $skills_json,
  "totalScore": $total,
  "machineId": "$machine_id",
  "timestamp": "$timestamp"
}
JSON
)

if [[ "$LOCAL_ONLY" -eq 1 ]]; then
  echo ""
  echo "Local mode enabled (--local): no upload performed."
  exit 0
fi

upload_choice="y"
if [[ "$AUTO_YES" -ne 1 ]]; then
  echo ""
  read -r -p "Upload anonymous scan summary to ClawScore? [Y/n] " upload_choice
fi

if [[ "${upload_choice,,}" == "n" ]]; then
  echo "Skipped upload."
  exit 0
fi

echo -e "${muted}[scan] Uploading result...${reset}"
response=$(curl -fsSL -X POST "$API_BASE/api/scan" -H "Content-Type: application/json" -d "$payload" 2>/dev/null || true)

if [[ -z "$response" ]]; then
  echo "Upload failed (network/API unavailable)."
  exit 0
fi

report_url=$(echo "$response" | grep -oE '"reportUrl"[[:space:]]*:[[:space:]]*"[^"]+"' | sed 's/.*"\(http[^"]*\)"/\1/')
badge_url=$(echo "$response" | grep -oE '"badgeUrl"[[:space:]]*:[[:space:]]*"[^"]+"' | sed 's/.*"\(http[^"]*\)"/\1/')

if [[ -n "$report_url" ]]; then
  echo "Report: $report_url"
fi
if [[ -n "$badge_url" ]]; then
  echo "Badge:  $badge_url"
fi
