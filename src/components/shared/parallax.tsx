"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export interface ParallaxProps {
  children: ReactNode;
  /**
   * Parallax strength. Positive drifts the element down as you scroll past it,
   * negative drifts it up. ~0.15–0.4 reads as subtle depth.
   */
  speed?: number;
  className?: string;
}

/**
 * Scroll-linked vertical parallax. Uses a single transform (GPU-friendly),
 * batched via rAF by Framer Motion, and disabled for reduced-motion users.
 */
export function Parallax({ children, speed = 0.25, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </m.div>
  );
}
