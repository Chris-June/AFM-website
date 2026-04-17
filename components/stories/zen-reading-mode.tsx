"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Sparkles } from "lucide-react";
import SoftAurora from "@/components/background/soft-aurora";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ZenReadingModeProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    title: string;
    author: string;
    content: string;
    type: string;
  } | null;
}

export function ZenReadingMode({ isOpen, onClose, story }: ZenReadingModeProps) {
  const [fontSerif, setFontSerif] = useState(true);

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

  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 isolate flex flex-col overflow-hidden bg-black text-zinc-100 transition-colors duration-700"
        >
          <div className="absolute inset-0 bg-black" />

          <div className="absolute inset-0 opacity-45">
            <SoftAurora
              speed={0.28}
              scale={1.2}
              brightness={0.95}
              color1="#f4efe6"
              color2="#d4af37"
              noiseFrequency={2.1}
              noiseAmplitude={0.9}
              bandHeight={0.5}
              bandSpread={0.95}
              octaveDecay={0.24}
              layerOffset={0.18}
              colorSpeed={0.6}
              enableMouseInteraction={false}
              mouseInfluence={0}
            />
          </div>

          <div className="absolute inset-0 bg-black/56" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_16%,rgba(0,0,0,0.72)_100%)]" />

          <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-18">
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 rotate: [0, 45, 0],
                 opacity: [0.3, 0.5, 0.3]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px]" 
            />
            <motion.div 
               animate={{ 
                 scale: [1.2, 1, 1.2],
                 rotate: [45, 0, 45],
                 opacity: [0.2, 0.4, 0.2]
               }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[150px]" 
            />
          </div>

          <header className="relative z-10 flex items-center justify-between border-b border-white/5 p-6 md:p-12">
             <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                   <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">{story.type}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Zen Reading Mode</p>
                </div>
             </div>

             <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setFontSerif(!fontSerif)}
                    className="rounded-full bg-white/5"
                >
                    <Type className="h-4 w-4" />
                </Button>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="rounded-full hover:rotate-90 transition-transform duration-300"
                >
                    <X className="h-5 w-5" />
                </Button>
             </div>
          </header>

          <main className="flex-1 overflow-y-auto relative z-10 px-6 py-12 md:py-24">
            <article className={cn(
                "max-w-2xl mx-auto space-y-12",
                fontSerif ? "font-serif" : "font-sans"
            )}>
              <div className="space-y-6 text-center md:text-left">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight italic"
                >
                  {story.title}
                </motion.h1>
                <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="flex items-center justify-center md:justify-start gap-3 opacity-60"
                >
                   <span className="text-lg">by {story.author}</span>
                   <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                   <span className="text-sm uppercase tracking-widest">{story.type}</span>
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="prose prose-xl dark:prose-invert prose-p:leading-[1.8] prose-p:opacity-90 max-w-none"
              >
                {story.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() && <p key={i} className="mb-8">{paragraph}</p>
                ))}
              </motion.div>

              <motion.footer 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="border-t border-white/5 pt-12 text-center text-sm italic opacity-40"
              >
                End of Fragment
              </motion.footer>
            </article>
          </main>

          {/* Reading Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[101]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
