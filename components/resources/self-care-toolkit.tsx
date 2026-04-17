"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Zap, Coffee, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const modes = [
  { 
    id: "anxious", 
    label: "Feeling Anxious", 
    icon: Wind, 
    color: "text-blue-500", 
    bg: "bg-blue-500/10",
    prompt: "Grab a single piece of paper and fill it entirely with overlapping circles. Don't lift the pen.",
    recommendation: "The Creative Outlet: Art as Therapy"
  },
  { 
    id: "tired", 
    label: "Feeling Tired", 
    icon: Coffee, 
    color: "text-orange-500", 
    bg: "bg-orange-500/10",
    prompt: "Use only one color today. Paint or draw something that represents how 'rest' feels to you.",
    recommendation: "Building a Creative Routine"
  },
  { 
    id: "uninspired", 
    label: "Feeling Uninspired", 
    icon: Zap, 
    color: "text-yellow-500", 
    bg: "bg-yellow-500/10",
    prompt: "Go to a window, look out for 2 minutes, and draw the first thing that moves.",
    recommendation: "Flow State and Resilience"
  },
  { 
    id: "need_calm", 
    label: "Need Calm", 
    icon: Heart, 
    color: "text-pink-500", 
    bg: "bg-pink-500/10",
    prompt: "Draw a slow, continuous line while breathing deeply. Let the line follow your breath.",
    recommendation: "The Creative Outlet: Art as Therapy"
  },
];

export function SelfCareToolkit() {
  const [selectedMode, setSelectedMode] = useState<typeof modes[0] | null>(null);

  return (
    <section className="glass rounded-[40px] p-8 md:p-12 border border-primary/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="h-32 w-32 text-primary" />
      </div>

      <div className="relative z-10 space-y-12">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic font-serif leading-tight">
            How are you <span className="text-primary">arriving</span> today?
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a state of mind, and we&apos;ll provide a gentle creative prompt and a curated read.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode)}
              className={cn(
                "flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all duration-500 text-center group",
                selectedMode?.id === mode.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                  : "bg-background/50 border-primary/5 hover:border-primary/20 hover:bg-primary/2"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors duration-500",
                selectedMode?.id === mode.id ? "bg-white/20" : mode.bg
              )}>
                <mode.icon className={cn("h-6 w-6", selectedMode?.id === mode.id ? "text-white" : mode.color)} />
              </div>
              <span className="font-bold tracking-tight">{mode.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedMode && (
            <motion.div
              key={selectedMode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8 pt-8 border-t border-primary/10"
            >
              <div className="space-y-4 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Creative Prompt</span>
                </div>
                <p className="text-2xl font-serif italic text-foreground/90 leading-relaxed">
                  &quot;{selectedMode.prompt}&quot;
                </p>
              </div>

              <div className="space-y-4 p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Recommended Read</span>
                  <h3 className="text-xl font-bold">{selectedMode.recommendation}</h3>
                </div>
                <Button 
                  variant="link" 
                  onClick={() => toast.info("Article coming soon!", { description: "We're working on detailed resource articles." })}
                  className="p-0 h-auto gap-2 justify-start group text-primary italic font-serif text-lg"
                >
                  Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
