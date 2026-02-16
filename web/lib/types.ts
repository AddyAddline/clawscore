export type CheckKey =
  | "version"
  | "auth"
  | "network"
  | "skills"
  | "permissions"
  | "process"
  | "ssl";

export type CheckStatus = "pass" | "warn" | "fail";

export type CheckResult = {
  score: number;
  max: number;
  status: CheckStatus;
  details: string;
};

export type ScanChecks = Record<CheckKey, CheckResult>;

export type ScanPayload = {
  version: string;
  checks: ScanChecks;
  skills: string[];
  totalScore: number;
  machineId: string;
  timestamp: string;
};

export type ScanRecord = ScanPayload & {
  reportId: string;
  createdAt: number;
};

export type SkillStatus = "verified" | "unverified" | "malicious";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export type SkillRecord = {
  name: string;
  status: SkillStatus;
  riskLevel: RiskLevel;
  lastChecked: number;
  reports: number;
  notes: string;
};

export type DailyStats = {
  date: string;
  totalScans: number;
  averageScore: number;
  scoreDistribution: number[];
  issueBreakdown: Record<CheckKey, number>;
  cvePatched: number;
};

export type FixItem = {
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  risk: string;
  fixCommands: string[];
  verify: string[];
};
