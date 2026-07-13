"use client";

import { useState } from "react";
import { m, AnimatePresence, type Variants } from "framer-motion";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { technologyGroups } from "@/data/technologies";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const tileVariant: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const panelVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

export function Technologies() {
  const { t } = useI18n();
  const [activeKey, setActiveKey] = useState(technologyGroups[0].key);

  const activeGroup = technologyGroups.find((g) => g.key === activeKey)!;

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="relative scroll-mt-8 py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {t.technologies.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="technologies-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t.technologies.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {t.technologies.subheading}
            </p>
          </Reveal>
        </div>

        {/* Tab bar */}
        <Reveal delay={0.2}>
          <div
            role="tablist"
            aria-label="Technology categories"
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {technologyGroups.map((group) => {
              const label = t.technologies.groups[group.key as keyof typeof t.technologies.groups];
              const isActive = group.key === activeKey;
              return (
                <button
                  key={group.key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="tech-panel"
                  onClick={() => setActiveKey(group.key)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-accent-foreground"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="tech-tab-bg"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tech grid panel */}
        <div
          id="tech-panel"
          role="tabpanel"
          aria-label={t.technologies.groups[activeKey as keyof typeof t.technologies.groups]}
          className="mt-10 min-h-[200px]"
        >
          <AnimatePresence mode="wait">
            <m.ul
              key={activeKey}
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4"
            >
              {activeGroup.technologies.map(({ name, Icon }) => (
                <m.li key={name} variants={tileVariant}>
                  <div className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface px-4 py-8 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
                    <Icon
                      className="size-9 text-foreground-muted transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:text-foreground"
                      aria-hidden
                    />
                    <span className="text-center text-xs font-medium text-foreground-muted transition-colors duration-300 group-hover:text-foreground">
                      {name}
                    </span>
                  </div>
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
