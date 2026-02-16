import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const checkResult = v.object({
  score: v.number(),
  max: v.number(),
  status: v.union(v.literal("pass"), v.literal("warn"), v.literal("fail")),
  details: v.string(),
});

export const createScan = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scans", args);
  },
});

export const getScanByReportId = query({
  args: { reportId: v.string() },
  handler: async (ctx, { reportId }) => {
    return await ctx.db
      .query("scans")
      .withIndex("by_reportId", (q) => q.eq("reportId", reportId))
      .first();
  },
});

export const getRecentScans = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    return await ctx.db
      .query("scans")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit ?? 20);
  },
});
