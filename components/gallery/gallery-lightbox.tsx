"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, User, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  art: {
    title: string;
    artist: string;
    description: string;
    imageUrl: string;
    type: string;
  } | null;
}

export function GalleryLightbox({ isOpen, onClose, art }: GalleryLightboxProps) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!art) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl h-full max-h-[90vh] glass rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-primary/10 overflow-hidden"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-6 right-6 z-10 rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image Canvas */}
            <div className="relative flex-1 bg-zinc-950/20 flex items-center justify-center p-4 md:p-12">
               <div className="relative w-full h-full">
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="object-contain"
                    priority
                />
               </div>
            </div>

            {/* Content Sidebar */}
            <div className="w-full md:w-[450px] bg-background/50 backdrop-blur-2xl p-8 md:p-12 overflow-y-auto border-l border-primary/5 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{art.type}</p>
                  <h2 className="text-4xl font-bold tracking-tight italic font-serif leading-tight">{art.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground pt-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/5">
                        <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium tracking-tight">by {art.artist}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 text-primary/60">
                        <Quote className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Artist Reflection</span>
                    </div>
                    <p className="text-xl leading-relaxed text-muted-foreground/90 font-serif italic max-w-sm">
                         &quot;{art.description}&quot;
                    </p>
                </div>
              </div>

              <div className="pt-12">
                <div className="pt-8 border-t border-primary/10">
                    <Button className="w-full rounded-full h-14 gap-2 group shadow-xl shadow-primary/10 text-base">
                        Support this Artist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
