import Link from "next/link";
import { Container, Badge, Accordion, buttonVariants } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container size="md">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              FAQ
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="faq-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              Everything you need to know about working with AsosSoft. Can&rsquo;t
              find an answer? We&rsquo;re one message away.
            </p>
          </Reveal>
        </div>

        {/* Accordion */}
        <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl">
          <Accordion items={faqs} type="single" defaultOpenIndex={0} />
        </Reveal>

        {/* Footer CTA */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm text-foreground-muted">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
