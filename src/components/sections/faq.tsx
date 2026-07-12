import { Container, Badge, Accordion, buttonVariants } from "@/components/ui";
import { Reveal } from "@/components/shared";
import type { Dictionary } from "@/i18n";
import { withLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function Faq({
  dict,
  locale,
}: {
  dict: Dictionary["faq"];
  locale: Locale;
}) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-8 border-t border-border py-24 sm:py-32"
    >
      <Container size="md">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {dict.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="faq-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {dict.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {dict.subheading}
            </p>
          </Reveal>
        </div>

        {/* Accordion */}
        <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl">
          <Accordion items={dict.items} type="single" defaultOpenIndex={0} />
        </Reveal>

        {/* Footer CTA */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm text-foreground-muted">{dict.still}</p>
            <a
              href={withLocale(locale, "#contact")}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {dict.getInTouch}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
