import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWritings = query({
  args: { paginationOpts: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("writings")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getFeaturedWritings = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("writings")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getWritingsCount = query({
  handler: async (ctx) => {
    const writings = await ctx.db.query("writings").collect();
    return writings.length;
  },
});

export const submitArtworkOrWriting = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    type: v.union(v.literal("artwork"), v.literal("writing")),
    title: v.string(),
    contentOrUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("submissions", {
      ...args,
      status: "pending",
    });
  },
});
