"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

interface GalleryItemProps {
  title: string;
  artist: string;
  imageUrl: string;
  type: string;
  className?: string;
  onClick?: () => void;
}

export function GalleryItem({ title, artist, imageUrl, type, className, onClick }: GalleryItemProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-[32px] cursor-pointer",
        "bg-[#111] border border-white/5 shadow-2xl p-2",
        className
      )}
    >
      {/* Interactive Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 175, 55, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-[24px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="text-xl font-bold text-white mb-2 font-serif tracking-wide">{title}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] opacity-80 mb-1">
             By {artist}
          </p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {type}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
