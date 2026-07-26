"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import {
  projects,
  projectCategories,
  type ProjectMeta,
} from "@/data/projects";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

/** Visual cover showing the product mockup image. */
function ProjectCover({
  project,
  categoryLabel,
  title,
}: {
  project: ProjectMeta;
  categoryLabel: string;
  title: string;
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-background-subtle">
      {/* Real product image. The translated title is the alt text — the slug
          it used to carry is an identifier, not a description. */}
      <Image
        src={project.image}
        alt={`${title} — ${categoryLabel}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
      />
      {/* Semi-transparent dark overlay on hover to keep controls/badge readable */}
      <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/20" />

      {/* Fake browser chrome for a product feel */}
      <div className="absolute left-5 top-5 flex items-center gap-1.5 z-10">
        <span className="size-2.5 rounded-full bg-white/40 shadow-xs" />
        <span className="size-2.5 rounded-full bg-white/40 shadow-xs" />
        <span className="size-2.5 rounded-full bg-white/40 shadow-xs" />
      </div>

      {/* Category badge */}
      <div className="absolute right-4 top-4 z-10">
        <Badge variant="glass" size="sm">
          {categoryLabel}
        </Badge>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  title,
  description,
  categoryLabel,
  buttonLabels,
}: {
  project: ProjectMeta;
  title: string;
  description: string;
  categoryLabel: string;
  buttonLabels: {
    web: string;
    app: string;
    bot: string;
    private: string;
  };
}) {
  const hasLink = !!project.liveUrl;
  const projectType = project.type || "web";

  let label = buttonLabels.web;
  if (!hasLink) {
    label = buttonLabels.private;
  } else if (projectType === "app") {
    label = buttonLabels.app;
  } else if (projectType === "bot") {
    label = buttonLabels.bot;
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
      <ProjectCover project={project} categoryLabel={categoryLabel} title={title} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted flex-1">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2.5 pt-1">
          {hasLink ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground shadow-sm transition-all duration-200 ease-[var(--ease-out-expo)] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {label}
              <ExternalLink className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          ) : (
            <button
              disabled
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-background-subtle border border-border px-4 text-sm font-medium text-foreground-muted cursor-not-allowed shadow-none"
            >
              {label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const { t } = useI18n();
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");

  // Keep each project's original index so we can look up its translation,
  // even after filtering reorders the visible list.
  const filtered = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => active === "All" || project.category === active);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative scroll-mt-8 border-t border-border bg-background-subtle py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {t.portfolio.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="portfolio-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t.portfolio.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {t.portfolio.subheading}
            </p>
          </Reveal>
        </div>

        {/* Category filters */}
        <Reveal delay={0.2}>
          <div
            role="tablist"
            aria-label={t.portfolio.filterLabel}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {projectCategories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(category)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "text-accent-foreground"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="portfolio-filter-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-accent shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t.portfolio.categories[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Animated project grid */}
        <m.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(({ project, index }) => (
              <m.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  title={t.portfolio.items[index].title}
                  description={t.portfolio.items[index].description}
                  categoryLabel={t.portfolio.categories[project.category]}
                  buttonLabels={t.portfolio.buttonLabels}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </Container>
    </section>
  );
}
