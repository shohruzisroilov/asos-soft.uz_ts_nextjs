"use client";

import { m, type Variants } from "framer-motion";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { technologyGroups, type Technology } from "@/data/technologies";
import { useI18n } from "@/providers/i18n-provider";
import { viewportOnce } from "@/lib/motion";

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

const allTechnologies: Technology[] = Array.from(
  technologyGroups
    .flatMap((group) => group.technologies)
    .reduce((map, tech) => {
      if (!map.has(tech.name)) map.set(tech.name, tech);
      return map;
    }, new Map<string, Technology>())
    .values()
);

export function Technologies() {
  const { t } = useI18n();

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

        {/* Tech grid */}
        <m.ul
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4"
        >
          {allTechnologies.map(({ name, Icon }) => (
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
      </Container>
    </section>
  );
}
