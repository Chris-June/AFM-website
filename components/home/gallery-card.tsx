"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";

interface GalleryCardProps {
  title: string;
  artist: string;
  imageUrl?: string;
  storageId?: Id<"_storage">;
  type: "art" | "story";
  href: string;
  size?: "large" | "medium" | "small" | "wide";
}

export function GalleryCard({
  title,
  artist,
  imageUrl,
  storageId,
  type,
  href,
  size = "medium",
}: GalleryCardProps) {
  // Get URL from Convex storage if storageId is provided
  const convexImageUrl = useQuery(api.storage.getImageUrl, storageId ? { storageId } : "skip");
  const finalImageUrl = storageId && convexImageUrl ? convexImageUrl : imageUrl;
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto",
    medium: "md:col-span-1 md:row-span-2 aspect-[3/4]",
    small: "md:col-span-1 md:row-span-1 aspect-square",
    wide: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl ${sizeClasses[size]}`}
    >
      <Link href={href} className="block w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          {finalImageUrl ? (
            <Image
              src={finalImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <p className="text-foreground/60 font-serif italic">Image coming soon</p>
            </div>
          )}
          {/* Gradient Overlay - Always visible but intensifies on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        </div>

        {/* Type Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-background/20 backdrop-blur-md text-background text-xs font-bold tracking-wider uppercase rounded-full">
            {type}
          </span>
        </div>

        {/* View Icon - Center (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center">
            <Eye className="w-6 h-6 text-background" />
          </div>
        </div>

        {/* Content - Bottom (slides up on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-background/70 text-sm font-medium mb-1">{artist}</p>
            <h3 className="text-background text-xl md:text-2xl font-serif font-bold leading-tight">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-3 text-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span className="text-sm font-medium">View Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Border Accent */}
        <div className="absolute inset-0 rounded-3xl border border-background/10 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
