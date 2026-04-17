"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

// Hydration-safe client detection
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;
const subscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

interface Logo {
  name: string;
  src: string;
  href?: string;
}

interface LogoBannerProps {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function LogoBanner({
  logos,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: LogoBannerProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling container wrapper with hover pause */}
      <div 
        className={cn("logo-banner-wrapper", pauseOnHover && "logo-banner-pause")}
      >
        <div
          className="logo-banner-scroll flex items-center gap-20 py-8"
          style={{
            animation: `scroll ${speed}s linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="shrink-0"
          >
            {logo.href ? (
              <Link
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <LogoImage logo={logo} />
              </Link>
            ) : (
              <div className="transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                <LogoImage logo={logo} />
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </motion.div>
  );
}

function LogoImage({ logo }: { logo: Logo }) {
  const isClient = useIsClient();

  // Check if src is a URL or a local image
  const isExternalUrl = logo.src.startsWith("http") || logo.src.startsWith("//");

  // During SSR/hydration, render a consistent placeholder to avoid mismatch
  if (!isClient) {
    return (
      <div className="h-12 w-40 flex items-center justify-center" suppressHydrationWarning>
        <span className="text-lg font-bold text-foreground/80 tracking-wide">
          {logo.name}
        </span>
      </div>
    );
  }

  if (isExternalUrl) {
    return (
      <div className="relative h-12 w-40 flex items-center justify-center">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          className="object-contain"
          sizes="160px"
        />
      </div>
    );
  }

  // For local images or text fallback
  return (
    <div className="h-12 w-40 flex items-center justify-center">
      <span className="text-lg font-bold text-foreground/80 tracking-wide">
        {logo.name}
      </span>
    </div>
  );
}
