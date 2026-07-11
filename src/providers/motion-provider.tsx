"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads Framer Motion's DOM feature set (animations, gestures, layout,
 * AnimatePresence) as a separate async chunk. Combined with using the
 * lightweight `m` components everywhere, this keeps the synchronous
 * framer-motion payload minimal and defers the heavy animation drivers.
 */
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domMax);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
