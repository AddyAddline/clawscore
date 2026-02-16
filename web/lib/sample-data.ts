import { DailyStats, FixItem, ScanChecks, ScanRecord, SkillRecord } from "@/lib/types";

export const commandToRun = "curl -sSL clawscore.setupmyclaw.in/scan | bash";

export const defaultChecks: ScanChecks = {
  version: { score: 20, max: 20, status: "pass", details: "Patched for CVE-2026-25253" },
  auth: { score: 25, max: 25, status: "pass", details: "Gateway authentication enabled" },
  network: { score: 0, max: 20, status: "fail", details: "Gateway bound to 0.0.0.0" },
  skills: { score: 10, max: 15, status: "warn", details: "2 unverified skills" },
  permissions: { score: 10, max: 10, status: "pass", details: "Credential file mode 600" },
  process: { score: 5, max: 5, status: "pass", details: "Gateway running as non-root" },
  ssl: { score: 3, max: 5, status: "warn", details: "Self-signed certificate" },
};

export const sampleReport: ScanRecord = {
  reportId: "x7Kj9mP",
  version: "2026.1.29",
  checks: defaultChecks,
  skills: ["skill-audit", "terminal-tools", "legacy-skill"],
  totalScore: 73,
  machineId: "anonymous",
  timestamp: "2026-02-16T19:00:00Z",
  createdAt: Date.now() - 2 * 60 * 60 * 1000,
};

export const sampleFixes: FixItem[] = [
  {
    severity: "Critical",
    title: "Network exposure detected",
    risk:
      "Your gateway is listening on all interfaces. Attackers on the same network can discover and interact with OpenClaw.",
    fixCommands: [
      "openclaw config set gateway.host \"127.0.0.1\"",
      "openclaw gateway restart",
    ],
    verify: [
      "ss -tlnp | grep 18789",
      "# Expect 127.0.0.1:18789 (not 0.0.0.0:18789)",
    ],
  },
  {
    severity: "High",
    title: "Unverified skills installed",
    risk: "Unverified skills can execute arbitrary logic and may leak data or run unsafe commands.",
    fixCommands: [
      "openclaw skills list --unverified",
      "openclaw skills remove legacy-skill",
    ],
    verify: ["openclaw skills list --json | jq '.[] | select(.verified==false)'"],
  },
  {
    severity: "Medium",
    title: "TLS certificate is self-signed",
    risk: "Self-signed TLS can allow man-in-the-middle attacks outside trusted local environments.",
    fixCommands: [
      "openclaw cert issue --provider letsencrypt",
      "openclaw gateway restart",
    ],
    verify: ["curl -Iv https://localhost:18789 | grep -i issuer"],
  },
];

export const sampleSkillDb: SkillRecord[] = [
  {
    name: "skill-audit",
    status: "verified",
    riskLevel: "low",
    lastChecked: Date.now() - 7 * 60 * 60 * 1000,
    reports: 1,
    notes: "Maintained by core OpenClaw community maintainers.",
  },
  {
    name: "legacy-skill",
    status: "unverified",
    riskLevel: "high",
    lastChecked: Date.now() - 2 * 24 * 60 * 60 * 1000,
    reports: 18,
    notes: "Outdated dependency chain and unknown maintainer history.",
  },
  {
    name: "shell-overdrive",
    status: "malicious",
    riskLevel: "critical",
    lastChecked: Date.now() - 40 * 60 * 1000,
    reports: 73,
    notes: "Flagged for unauthorized command execution patterns.",
  },
  {
    name: "terminal-tools",
    status: "verified",
    riskLevel: "medium",
    lastChecked: Date.now() - 30 * 60 * 1000,
    reports: 4,
    notes: "Verified package; medium risk due to elevated shell feature set.",
  },
];

export const statsTimeline: DailyStats[] = [
  {
    date: "2026-02-10",
    totalScans: 10123,
    averageScore: 57,
    scoreDistribution: [2, 4, 8, 14, 19, 22, 16, 9, 5, 1],
    issueBreakdown: { version: 22, auth: 11, network: 38, skills: 29, permissions: 8, process: 4, ssl: 25 },
    cvePatched: 58,
  },
  {
    date: "2026-02-11",
    totalScans: 10942,
    averageScore: 59,
    scoreDistribution: [1, 3, 7, 13, 18, 24, 18, 10, 5, 1],
    issueBreakdown: { version: 20, auth: 10, network: 36, skills: 26, permissions: 8, process: 3, ssl: 24 },
    cvePatched: 61,
  },
  {
    date: "2026-02-12",
    totalScans: 11682,
    averageScore: 60,
    scoreDistribution: [1, 3, 6, 12, 17, 24, 20, 11, 5, 1],
    issueBreakdown: { version: 18, auth: 9, network: 34, skills: 24, permissions: 7, process: 3, ssl: 22 },
    cvePatched: 64,
  },
  {
    date: "2026-02-13",
    totalScans: 12114,
    averageScore: 62,
    scoreDistribution: [1, 2, 5, 10, 16, 23, 22, 13, 6, 2],
    issueBreakdown: { version: 17, auth: 8, network: 33, skills: 22, permissions: 7, process: 2, ssl: 20 },
    cvePatched: 68,
  },
  {
    date: "2026-02-14",
    totalScans: 12453,
    averageScore: 61,
    scoreDistribution: [1, 2, 4, 11, 16, 22, 22, 14, 6, 2],
    issueBreakdown: { version: 16, auth: 8, network: 31, skills: 22, permissions: 6, process: 2, ssl: 19 },
    cvePatched: 71,
  },
];

export const recentActivity = [
  "Score improved: 45 -> 89 (auth + network fixes)",
  "Critical resolved: exposed gateway host fixed",
  "New user scan: 63/100 from OpenClaw 2026.1.29",
  "Score improved: 29 -> 54 after skill cleanup",
  "TLS validation enabled on 17 hosts today",
];
