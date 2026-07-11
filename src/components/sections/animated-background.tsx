"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Decorative animated backdrop — a masked grid plus slow-drifting
 * monochrome glows. Purely presentational (aria-hidden) and disables
 * motion for reduced-motion users.
 */
export function AnimatedBackground({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Grid, faded toward the edges with a radial mask */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top-center glow */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-foreground/[0.05] blur-[120px]" />

      {/* Drifting glow — left */}
      <m.div
        className="absolute left-[8%] top-[30%] h-72 w-72 rounded-full bg-foreground/[0.06] blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting glow — right */}
      <m.div
        className="absolute right-[10%] top-[45%] h-80 w-80 rounded-full bg-foreground/[0.05] blur-[110px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -50, 0], y: [0, 24, 0], scale: [1.05, 1, 1.05] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fade the whole scene into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
