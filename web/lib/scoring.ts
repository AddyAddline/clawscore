import { CheckResult, FixItem, ScanChecks } from "@/lib/types";
import { sampleFixes } from "@/lib/sample-data";

export const CHECK_LABELS: Record<keyof ScanChecks, string> = {
  version: "Version / CVE",
  auth: "Authentication",
  network: "Network Exposure",
  skills: "Skill Trust",
  permissions: "File Permissions",
  process: "Runtime Process",
  ssl: "SSL / TLS",
};

export function statusColor(status: CheckResult["status"]) {
  if (status === "pass") return "text-emerald-400";
  if (status === "warn") return "text-yellow-400";
  return "text-red-400";
}

export function barColor(score: number, max: number) {
  const pct = (score / Math.max(max, 1)) * 100;
  if (pct >= 80) return "var(--accent-green)";
  if (pct >= 50) return "var(--accent-yellow)";
  return "var(--accent-red)";
}

export function percentileFromScore(score: number) {
  return Math.max(5, Math.min(99, Math.round(score + 7)));
}

export function getFixesForChecks(checks: ScanChecks): FixItem[] {
  const needsNetworkFix = checks.network.status === "fail";
  const needsSkillFix = checks.skills.status !== "pass";
  const needsTlsFix = checks.ssl.status !== "pass";

  return sampleFixes.filter((fix) => {
    if (fix.title.includes("Network")) return needsNetworkFix;
    if (fix.title.includes("skill")) return needsSkillFix;
    if (fix.title.includes("TLS")) return needsTlsFix;
    return true;
  });
}

export function levelColor(level: FixItem["severity"]) {
  if (level === "Critical") return "text-red-400 border-red-500/40";
  if (level === "High") return "text-orange-300 border-orange-400/40";
  if (level === "Medium") return "text-yellow-300 border-yellow-400/40";
  return "text-zinc-300 border-zinc-400/40";
}
