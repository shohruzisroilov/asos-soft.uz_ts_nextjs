"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, viewportOnce } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const directionVariants = (distance: number): Record<Direction, Variants> => ({
  up: {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: distance },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -distance },
    visible: { opacity: 1, x: 0 },
  },
  none: fadeInUp,
});

export interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  /** Re-run the animation every time it enters the viewport. */
  repeat?: boolean;
  as?: "div" | "section" | "span" | "li";
}

/**
 * Scroll-triggered reveal. Wrap any block to fade + slide it into view
 * when it enters the viewport. Honors prefers-reduced-motion globally.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  className,
  repeat = false,
  as = "div",
}: RevealProps) {
  const MotionTag = m[as];
  const variants = directionVariants(distance)[direction];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { margin: "-80px" } : viewportOnce}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
