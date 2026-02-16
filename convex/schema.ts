import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const checkResult = v.object({
  score: v.number(),
  max: v.number(),
  status: v.union(v.literal("pass"), v.literal("warn"), v.literal("fail")),
  details: v.string(),
});

export default defineSchema({
  scans: defineTable({
    reportId: v.string(),
    machineId: v.string(),
    version: v.string(),
    totalScore: v.number(),
    checks: v.object({
      version: checkResult,
      auth: checkResult,
      network: checkResult,
      skills: checkResult,
      permissions: checkResult,
      process: checkResult,
      ssl: checkResult,
    }),
    skills: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_reportId", ["reportId"])
    .index("by_machineId", ["machineId"])
    .index("by_createdAt", ["createdAt"]),

  skills: defineTable({
    name: v.string(),
    status: v.union(v.literal("verified"), v.literal("unverified"), v.literal("malicious")),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    lastChecked: v.number(),
    reports: v.number(),
    notes: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_status", ["status"]),

  stats: defineTable({
    date: v.string(),
    totalScans: v.number(),
    averageScore: v.number(),
    scoreDistribution: v.array(v.number()),
    issueBreakdown: v.object({
      version: v.number(),
      auth: v.number(),
      network: v.number(),
      skills: v.number(),
      permissions: v.number(),
      process: v.number(),
      ssl: v.number(),
    }),
    cvePatched: v.number(),
  }).index("by_date", ["date"]),
});
