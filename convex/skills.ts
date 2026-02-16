import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listSkills = query({
  args: {
    status: v.optional(v.union(v.literal("verified"), v.literal("unverified"), v.literal("malicious"))),
  },
  handler: async (ctx, { status }) => {
    if (!status) return await ctx.db.query("skills").collect();
    return await ctx.db
      .query("skills")
      .withIndex("by_status", (q) => q.eq("status", status))
      .collect();
  },
});

export const upsertSkill = mutation({
  args: {
    name: v.string(),
    status: v.union(v.literal("verified"), v.literal("unverified"), v.literal("malicious")),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    lastChecked: v.number(),
    reports: v.number(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("skills")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("skills", args);
  },
});
