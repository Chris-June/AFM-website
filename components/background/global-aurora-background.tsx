/* Global app background layer that renders the SoftAurora effect with a readability scrim. */
"use client";

import type { JSX } from "react";

import SoftAurora from "@/components/background/soft-aurora";

export function GlobalAuroraBackground(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <SoftAurora />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_18%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
