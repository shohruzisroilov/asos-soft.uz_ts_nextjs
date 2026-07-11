"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { m, useScroll, useSpring } from "framer-motion";
import { mainNav, ctaConfig, isActivePath } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Scroll-linked progress bar (smoothed with a spring)
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full transition-[background,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)]",
          scrolled
            ? "glass border-b border-border/70 shadow-sm"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-[height] duration-300 ease-[var(--ease-out-expo)]",
              scrolled ? "h-16" : "h-20"
            )}
          >
            <Logo />

            {/* Desktop nav — animated hover pill + sliding active indicator */}
            <nav
              className="relative hidden items-center lg:flex"
              aria-label="Primary"
              onMouseLeave={() => setHovered(null)}
            >
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {/* Hover pill slides between items */}
                    {hovered === item.href && (
                      <m.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 -z-0 rounded-lg bg-foreground/[0.06]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {/* Active underline slides between items */}
                    {active && (
                      <m.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-foreground"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Get Quote — group hover animation on the arrow */}
              <Link
                href={ctaConfig.href}
                className={cn(
                  "group relative hidden items-center gap-1.5 overflow-hidden rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-sm sm:inline-flex",
                  "transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                )}
              >
                {/* Sheen sweep on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-full"
                />
                <span className="relative">{ctaConfig.label}</span>
                <ArrowUpRight className="relative size-4 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Mobile trigger */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-xs transition-all duration-200 hover:bg-background-subtle hover:border-foreground/20 active:scale-95 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </Container>

        {/* Scroll progress bar */}
        <m.div
          aria-hidden
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left bg-foreground/40 transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
      </m.header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
