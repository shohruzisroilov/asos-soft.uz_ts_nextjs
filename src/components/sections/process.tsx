"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { processSteps } from "@/data/process";
import { useI18n } from "@/providers/i18n-provider";

function TimelineStep({
  icon: Icon,
  step,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <li className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
      {/* Node on the track */}
      <m.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="group relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors duration-300 hover:border-foreground/30"
      >
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </m.div>

      {/* Content card */}
      <m.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.12 + index * 0.02,
        }}
        className="flex-1 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-medium text-foreground-subtle">
            {step}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {description}
        </p>
      </m.div>
    </li>
  );
}

export function Process() {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLOListElement>(null);

  // Fill the progress line as the timeline scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.5"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative scroll-mt-8 py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {t.process.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="process-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t.process.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {t.process.subheading}
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <ol ref={timelineRef} className="relative mx-auto mt-16 max-w-3xl">
          {/* Static track (behind nodes; node center sits at 1.5rem) */}
          <div
            aria-hidden
            className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-border"
          />
          {/* Scroll-linked progress fill */}
          <m.div
            aria-hidden
            style={{ scaleY: progressScale }}
            className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 origin-top bg-foreground"
          />

          {processSteps.map((item, index) => (
            <TimelineStep
              key={item.step}
              icon={item.icon}
              step={item.step}
              title={t.process.items[index].title}
              description={t.process.items[index].description}
              index={index}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
