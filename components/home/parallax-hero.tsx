"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[700px] items-center overflow-hidden pt-24"
    >
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-[8%] top-[8%] h-[28rem] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[8%] h-[24rem] w-[24rem] rounded-full bg-accent/18 blur-[120px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass inline-flex mb-8 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            <span>A Digital Sanctuary for Artists</span>
          </motion.div>

          <div className="space-y-2 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-foreground"
            >
              A Frame
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-primary tracking-tight leading-none"
            >
              Of Mind
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl"
          >
            Transforming mental health through the power of human expression.
            A curated space where artists and writers share their journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href="/gallery"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-14 rounded-full px-10 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              )}
            >
              Explore Gallery
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/submit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "glass h-14 rounded-full px-10 text-lg transition-all duration-300 hover:bg-background/70"
              )}
            >
              Submit Your Work
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/60">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>
    </div>
  );
}
