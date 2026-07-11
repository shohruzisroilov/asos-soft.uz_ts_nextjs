import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  /** Fade the left/right edges into the background. */
  fade?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal scroller — ideal for logo walls / marquees.
 * Content is duplicated so the loop is seamless (animation translates -50%).
 */
export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  fade = true,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-12 pr-12",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {/* duplicate for a seamless loop */}
        <div className="flex items-center gap-12 pr-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
