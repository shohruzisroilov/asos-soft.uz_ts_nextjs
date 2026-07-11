"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import {
  projects,
  projectCategories,
  type Project,
} from "@/data/projects";
import { cn } from "@/lib/utils";

/** Deterministic monochrome cover art — no external images required. */
function ProjectCover({ project, index }: { project: Project; index: number }) {
  const { icon: Icon, category } = project;
  const gradients = [
    "radial-gradient(120% 120% at 0% 0%, var(--surface-elevated), var(--background-subtle))",
    "radial-gradient(120% 120% at 100% 0%, var(--surface-elevated), var(--background-subtle))",
    "radial-gradient(120% 120% at 50% 120%, var(--surface-elevated), var(--background-subtle))",
  ];

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: gradients[index % gradients.length] }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />
      {/* Faded monogram icon */}
      <Icon
        className="absolute -right-6 -bottom-6 size-44 text-foreground/[0.05]"
        strokeWidth={1}
        aria-hidden
      />
      {/* Fake browser chrome for a product feel */}
      <div className="absolute left-5 top-5 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
      </div>
      {/* Category badge */}
      <div className="absolute right-4 top-4">
        <Badge variant="glass" size="sm">
          {category}
        </Badge>
      </div>
      {/* Centered mark that scales on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-2xl border border-border bg-surface/70 text-foreground shadow-md backdrop-blur-sm transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110">
          <Icon className="size-7" strokeWidth={1.75} aria-hidden />
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
      <ProjectCover project={project} index={index} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {project.description}
        </p>

        {/* Technologies */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge variant="muted" size="sm">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2.5 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground shadow-sm transition-all duration-200 ease-[var(--ease-out-expo)] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Visit Website
            <ExternalLink className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-background-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="size-[1.15rem]" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative scroll-mt-24 border-t border-border bg-background-subtle py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              Our work
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="portfolio-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Selected projects we&rsquo;re proud of
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              Real products shipped for real businesses — from storefronts and
              CRMs to AI tools and mobile apps.
            </p>
          </Reveal>
        </div>

        {/* Category filters */}
        <Reveal delay={0.2}>
          <div
            role="tablist"
            aria-label="Filter projects by category"
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
                  <span className="relative z-10">{category}</span>
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
            {filtered.map((project, index) => (
              <m.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </Container>
    </section>
  );
}
