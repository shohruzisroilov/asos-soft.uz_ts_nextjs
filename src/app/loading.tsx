import { siteConfig } from "@/config/site";

/**
 * Route-level loading UI — a branded, CSS-only loader (no JS, no layout shift).
 * Shown by Next during navigation/streaming while a route's data loads.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Brand mark with a pulsing ring */}
        <div className="relative flex size-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-2xl bg-foreground/10" />
          <span className="absolute inset-0 rounded-2xl border border-border" />
          <span className="relative flex size-14 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-accent-foreground shadow-md">
            A
          </span>
        </div>

        {/* Shimmering wordmark */}
        <span
          className="bg-clip-text text-sm font-medium tracking-wide text-transparent skeleton-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--foreground-subtle) 0%, var(--foreground) 50%, var(--foreground-subtle) 100%)",
            backgroundSize: "200% 100%",
          }}
        >
          Loading {siteConfig.name}…
        </span>
      </div>
    </div>
  );
}
