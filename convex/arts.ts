import { query } from "./_generated/server";
import { v } from "convex/values";

export const getArt = query({
  args: { paginationOpts: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("artworks")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getFeaturedArt = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("artworks")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getArtworkCount = query({
  handler: async (ctx) => {
    const artworks = await ctx.db.query("artworks").collect();
    return artworks.length;
  },
});

export const getArtistCount = query({
  handler: async (ctx) => {
    const artworks = await ctx.db.query("artworks").collect();
    const uniqueArtists = new Set(artworks.map(a => a.artist));
    return uniqueArtists.size;
  },
});
