"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Badge, buttonVariants } from "@/components/ui";
import { CountUp } from "@/components/shared/count-up";
import { Parallax } from "@/components/shared/parallax";
import { AnimatedBackground } from "./animated-background";
import { heroStats, floatingIcons } from "@/data/hero";
import { useI18n, useLocalizedHref } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

/**
 * The hero's primary content uses CSS entrance animations (not JS) so the
 * LCP heading paints on first paint and is never gated behind hydration.
 * The global prefers-reduced-motion rule disables these automatically.
 * Only the decorative floating icons + parallax are JS-driven.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const localizedHref = useLocalizedHref();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <AnimatedBackground />

      {/* Floating technology icons (decorative) — scroll parallax */}
      <Parallax
        speed={0.4}
        className="pointer-events-none absolute inset-0 -z-[5] hidden lg:block"
      >
        <div aria-hidden className="relative size-full">
          {floatingIcons.map(({ src, alt, className, delay, duration }, i) => (
            <m.div
              key={i}
              className={cn("absolute", className)}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <m.div
                title={t.hero.floating[i]}
                animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  className="size-14 drop-shadow-md"
                  loading="lazy"
                  draggable={false}
                />
              </m.div>
            </m.div>
          ))}
        </div>
      </Parallax>

      <Container className="relative flex min-h-[92vh] flex-col items-center justify-center py-28 text-center">
        <div className="flex flex-col items-center">
          {/* Eyebrow */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <Badge variant="glass" size="lg" className="shadow-sm">
              <Sparkles className="size-3.5" />
              {t.hero.eyebrow}
            </Badge>
          </div>

          {/* Headline — single semantic <h1>, painted immediately for LCP */}
          <h1
            id="hero-heading"
            className="mt-7 max-w-4xl animate-fade-in-up text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.12s" }}
          >
            {t.hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 max-w-2xl animate-fade-in-up text-balance text-lg leading-relaxed text-foreground-muted"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.subheadlineBefore}
            <span className="text-foreground">{t.hero.subheadlineHighlight}</span>
            {t.hero.subheadlineAfter}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex w-full animate-fade-in-up flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "0.28s" }}
          >
            <a
              href={localizedHref("#contact")}
              className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={localizedHref("#portfolio")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto"
              )}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Statistics cards */}
          <dl
            className="mt-16 grid w-full max-w-3xl animate-fade-in-up grid-cols-2 gap-4 sm:grid-cols-4"
            style={{ animationDelay: "0.36s" }}
          >
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-foreground/20"
              >
                <dd className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1.5 text-xs text-foreground-muted sm:text-sm">
                  {t.hero.stats[i]}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
