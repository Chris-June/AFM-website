"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type JSX } from "react";
import { GalleryItem } from "@/components/gallery/gallery-item";
import type { Doc } from "@/convex/_generated/dataModel";

type LayeredArtwork = Doc<"artworks">;

type LayeredStackCardConfig = {
  top: string;
  left: string;
  width: string;
  zIndex: number;
  speed: number;
  rotate: number;
};

const layeredStackPattern: LayeredStackCardConfig[] = [
  { top: "2%", left: "6%", width: "28%", zIndex: 5, speed: -90, rotate: -6 },
  { top: "12%", left: "32%", width: "22%", zIndex: 3, speed: 110, rotate: 5 },
  { top: "0%", left: "54%", width: "30%", zIndex: 6, speed: -70, rotate: -3 },
  { top: "18%", left: "74%", width: "20%", zIndex: 2, speed: 95, rotate: 7 },
  { top: "42%", left: "14%", width: "24%", zIndex: 4, speed: 120, rotate: -8 },
  { top: "48%", left: "40%", width: "30%", zIndex: 7, speed: -105, rotate: 4 },
  { top: "58%", left: "68%", width: "22%", zIndex: 3, speed: 90, rotate: -5 },
  { top: "76%", left: "28%", width: "26%", zIndex: 5, speed: -80, rotate: 6 },
  { top: "82%", left: "58%", width: "24%", zIndex: 4, speed: 100, rotate: -4 }
];

type GalleryLayeredStackProps = {
  artworks: LayeredArtwork[];
  onItemClick: (artwork: LayeredArtwork) => void;
};

function LayeredStackCard({
  artwork,
  config,
  scrollProgress,
  onItemClick
}: {
  artwork: LayeredArtwork;
  config: LayeredStackCardConfig;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  onItemClick: (artwork: LayeredArtwork) => void;
}): JSX.Element {
  const y = useTransform(scrollProgress, [0, 1], [0, config.speed]);
  const rotate = useTransform(scrollProgress, [0, 1], [config.rotate, config.rotate * 0.45]);

  return (
    <motion.div
      style={{
        top: config.top,
        left: config.left,
        width: config.width,
        y,
        rotate,
        zIndex: config.zIndex
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, y: -18, zIndex: 30 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute transform-gpu"
    >
      <GalleryItem
        title={artwork.title}
        artist={artwork.artist}
        imageUrl={artwork.imageUrl}
        storageId={artwork.storageId}
        type={artwork.type}
        onClick={() => onItemClick(artwork)}
        className="aspect-[4/5] bg-card/70 backdrop-blur-sm"
      />
    </motion.div>
  );
}

export function GalleryLayeredStack({ artworks, onItemClick }: GalleryLayeredStackProps): JSX.Element {
  const { scrollYProgress } = useScroll();

  if (artworks.length === 0) {
    return <div className="h-full w-full" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:hidden">
        {artworks.map((artwork) => (
          <GalleryItem
            key={artwork._id}
            title={artwork.title}
            artist={artwork.artist}
            imageUrl={artwork.imageUrl}
            storageId={artwork.storageId}
            type={artwork.type}
            onClick={() => onItemClick(artwork)}
          />
        ))}
      </div>
      <div className="relative hidden min-h-[1700px] w-full md:block">
        {artworks.map((artwork, index) => (
          <LayeredStackCard
            key={artwork._id}
            artwork={artwork}
            config={layeredStackPattern[index % layeredStackPattern.length]}
            scrollProgress={scrollYProgress}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </>
  );
}
