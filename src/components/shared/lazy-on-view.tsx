"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface LazyOnViewProps {
  children: ReactNode;
  /** Reserved height before load — prevents layout shift (CLS). */
  minHeight?: number;
  /** How early to start loading before the block scrolls into view. */
  rootMargin?: string;
  className?: string;
}

/**
 * Mounts its children only once they scroll near the viewport. Combined with
 * a `ssr: false` dynamic import, this defers a heavy section's JS out of the
 * initial page load. A reserved min-height avoids layout shift.
 */
export function LazyOnView({
  children,
  minHeight = 480,
  rootMargin = "800px",
  className,
}: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
