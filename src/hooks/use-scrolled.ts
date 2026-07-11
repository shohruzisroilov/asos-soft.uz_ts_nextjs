"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the window has scrolled past `threshold` pixels.
 * Used to condense/blur the navbar on scroll.
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
