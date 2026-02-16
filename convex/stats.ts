import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const latestStats = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("stats").withIndex("by_date").order("desc").first();
  },
});

export const upsertDailyStats = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("stats")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("stats", args);
  },
});
