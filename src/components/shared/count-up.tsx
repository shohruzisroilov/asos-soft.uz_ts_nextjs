"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** useLayoutEffect warns during SSR, where there is no layout to read. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Animates a number from 0 → value when it scrolls into view.
 * Falls back to the final value immediately for reduced-motion users.
 *
 * The initial state is the *final* value, so the server-rendered HTML — what
 * crawlers and no-JS visitors get — carries the real number instead of "0".
 * The countdown to zero happens in a layout effect, before the browser paints,
 * so animating clients still see the count-up with no visible flash.
 */
export function CountUp({
  value,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    setDisplay(0);
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
