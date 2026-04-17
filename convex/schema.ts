import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  artworks: defineTable({
    title: v.string(),
    artist: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    type: v.union(v.literal("illustration"), v.literal("drawing"), v.literal("animation")),
    attribution: v.string(),
    featured: v.optional(v.boolean()),
  }).index("by_featured", ["featured"]),

  writings: defineTable({
    title: v.string(),
    author: v.string(),
    content: v.string(),
    type: v.union(v.literal("poem"), v.literal("blog"), v.literal("creative_writing")),
    attribution: v.string(),
    featured: v.optional(v.boolean()),
  }).index("by_featured", ["featured"]),

  articles: defineTable({
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    author: v.string(),
    category: v.string(),
    publishedAt: v.string(),
  }),

  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    type: v.union(v.literal("artwork"), v.literal("writing")),
    title: v.string(),
    contentOrUrl: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  }).index("by_status", ["status"]),
});
