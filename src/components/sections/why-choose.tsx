"use client";

import { m, type Variants } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { reasons } from "@/data/why-choose";
import { useI18n } from "@/providers/i18n-provider";
import { viewportOnce } from "@/lib/motion";

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function ReasonCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <m.div variants={cardVariant}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
        {/* Top accent line grows in on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />

        {/* Icon with an expanding ring on hover */}
        <span className="relative flex size-12 items-center justify-center rounded-xl border border-border bg-background-subtle text-foreground transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon
            className="size-6 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-6"
            strokeWidth={1.75}
            aria-hidden
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-100 rounded-xl ring-1 ring-foreground/20 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.4] group-hover:opacity-100"
          />
        </span>

        <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
          {description}
        </p>
      </div>
    </m.div>
  );
}

export function WhyChoose() {
  const { t } = useI18n();

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="relative scroll-mt-8 border-t border-border bg-background-subtle py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {t.whyChoose.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="why-choose-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t.whyChoose.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {t.whyChoose.subheading}
            </p>
          </Reveal>
        </div>

        {/* Reasons grid */}
        <m.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason, i) => (
            <ReasonCard
              key={i}
              icon={reason.icon}
              title={t.whyChoose.items[i].title}
              description={t.whyChoose.items[i].description}
            />
          ))}
        </m.div>
      </Container>
    </section>
  );
}
