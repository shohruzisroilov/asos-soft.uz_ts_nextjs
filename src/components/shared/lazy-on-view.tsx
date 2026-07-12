"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface LazyOnViewProps {
  children: ReactNode;
  /**
   * Anchor id placed on the always-present wrapper, so same-page links (e.g.
   * "#contact") can scroll here even before the heavy children have mounted —
   * the scroll then brings the wrapper into view and triggers the load.
   */
  id?: string;
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
  id,
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

    // If the page loads already anchored to this section (or the browser is
    // restoring a hash), mount immediately so the target exists to scroll to.
    if (id && typeof window !== "undefined" && window.location.hash === `#${id}`) {
      setVisible(true);
      io.disconnect();
    }

    return () => io.disconnect();
  }, [rootMargin, visible, id]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
