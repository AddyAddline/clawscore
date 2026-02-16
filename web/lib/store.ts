import { sampleReport, sampleSkillDb, statsTimeline } from "@/lib/sample-data";
import { percentileFromScore } from "@/lib/scoring";
import { DailyStats, ScanPayload, ScanRecord, SkillRecord } from "@/lib/types";

const memStore = {
  scans: new Map<string, ScanRecord>([[sampleReport.reportId, sampleReport]]),
  skills: [...sampleSkillDb] as SkillRecord[],
  stats: [...statsTimeline] as DailyStats[],
};

export function generateId(length = 7) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function getReport(reportId: string) {
  return memStore.scans.get(reportId) ?? sampleReport;
}

export function createReport(payload: ScanPayload) {
  const reportId = generateId();
  const record: ScanRecord = {
    ...payload,
    reportId,
    createdAt: Date.now(),
  };
  memStore.scans.set(reportId, record);

  let previousScore: number | null = null;
  for (const scan of Array.from(memStore.scans.values()).reverse()) {
    if (scan.machineId === payload.machineId && scan.reportId !== reportId) {
      previousScore = scan.totalScore;
      break;
    }
  }

  return {
    id: reportId,
    reportUrl: `https://clawscore.setupmyclaw.in/r/${reportId}`,
    badgeUrl: `https://clawscore.setupmyclaw.in/api/badge/${reportId}.svg`,
    percentile: percentileFromScore(payload.totalScore),
    previousScore,
  };
}

export function getStatsSummary() {
  const latest = memStore.stats[memStore.stats.length - 1];
  const todayScans = 437;
  return {
    totalScans: latest.totalScans,
    scansToday: todayScans,
    averageScore: latest.averageScore,
    cvePatched: latest.cvePatched,
    scoreDistribution: latest.scoreDistribution,
    issueBreakdown: latest.issueBreakdown,
    trend: memStore.stats.map((d) => ({ date: d.date, score: d.averageScore })),
    versions: [
      { label: "2026.1.29", value: 71 },
      { label: "2026.1.18", value: 18 },
      { label: "< 2026.1.18", value: 11 },
    ],
    recentActivity: [
      { message: "Score improved: 45 -> 89", time: "34s ago" },
      { message: "Critical fixed: 0.0.0.0 binding removed", time: "2m ago" },
      { message: "Upload: OpenClaw 2026.1.29 / 77", time: "4m ago" },
      { message: "Skill purge completed on 13 hosts", time: "8m ago" },
    ],
  };
}

export function getSkills() {
  return memStore.skills;
}
