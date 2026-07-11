"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

/**
 * Staggers direct <StaggerItem> children into view in sequence.
 * Use for grids, lists, and feature rows.
 */
export function Stagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <m.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { margin: "-80px" }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={fadeInUp}>
      {children}
    </m.div>
  );
}
