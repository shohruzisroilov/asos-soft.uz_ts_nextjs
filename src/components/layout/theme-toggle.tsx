"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-xl",
        "border border-border bg-surface text-foreground shadow-xs",
        "transition-all duration-200 ease-[var(--ease-out-expo)]",
        "hover:bg-background-subtle hover:border-foreground/20 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* Both icons are always mounted; opacity/rotate crossfade avoids layout shift + hydration flash */}
      <Sun
        className={cn(
          "absolute size-[1.15rem] transition-all duration-300 ease-[var(--ease-out-expo)]",
          mounted && isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-[1.15rem] transition-all duration-300 ease-[var(--ease-out-expo)]",
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
