"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState, MouseEvent } from "react";

interface StoryItemProps {
  title: string;
  author: string;
  excerpt: string;
  type: string;
  className?: string;
  onClick?: () => void;
}

export function StoryItem({ title, author, excerpt, type, className, onClick }: StoryItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "group flex flex-col justify-between p-8 rounded-sm cursor-pointer shadow-xl",
        "relative overflow-hidden border border-white/10 bg-[rgba(17,17,19,0.88)] text-[#F5EFE6] backdrop-blur-xl",
        // Adding a subtle torn-edge / texture feel using inset shadows and noise
        "before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-[0.025] before:pointer-events-none before:mix-blend-overlay",
        className
      )}
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-serif tracking-tight uppercase leading-snug text-[#F5EFE6] transition-colors group-hover:text-primary">{title}</h3>
          <p className="text-sm font-medium text-[#C3B8AA]">{author}</p>
          <div className="mt-2 inline-flex rounded-full border border-primary/15 bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-primary/80">
            {type}
          </div>
        </div>
        
        {/* Drop cap for the excerpt */}
        <p className={cn(
          "text-base leading-relaxed font-serif text-[#D7CFC4] line-clamp-6 md:line-clamp-none",
          "first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:pr-3 first-letter:pt-2 first-letter:font-serif first-letter:text-[#F5EFE6] first-line:uppercase first-line:tracking-widest first-line:text-[#E3D7C6]"
        )}>
          {excerpt}
        </p>
      </div>

      <div className="relative z-10 pt-8 flex justify-end items-center">
         <button 
           onClick={handleLike}
           className="relative group/btn flex items-center gap-2 text-sm font-serif italic text-[#B6A890] transition-colors hover:text-[#D4AF37]"
         >
            {isLiked ? 'Loved' : 'Heart'}
            <div className="relative">
              <Heart 
                className={cn(
                  "h-5 w-5 transition-all duration-300", 
                  isLiked ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-transparent text-[#B6A890] group-hover/btn:text-[#D4AF37]"
                )} 
              />
              {/* Glowing effect behind the heart when liked or hovered */}
              <div className={cn(
                "absolute inset-0 bg-[#D4AF37] blur-md rounded-full -z-10 transition-opacity duration-300",
                isLiked ? "opacity-60 scale-150" : "opacity-0 group-hover/btn:opacity-40 scale-125"
              )} />
            </div>
         </button>
      </div>
    </motion.div>
  );
}
