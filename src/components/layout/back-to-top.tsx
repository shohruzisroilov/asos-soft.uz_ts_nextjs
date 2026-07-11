"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Smoothly scrolls to the top of the page. Honors prefers-reduced-motion.
 */
export function BackToTop({ className }: { className?: string }) {
  const handleClick = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-xs",
        "transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      Back to top
      <span className="flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5">
        <ArrowUp className="size-3" strokeWidth={2.5} />
      </span>
    </button>
  );
}
