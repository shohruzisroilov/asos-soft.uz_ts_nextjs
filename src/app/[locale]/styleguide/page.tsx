import type { Metadata } from "next";
import {
  ArrowRight,
  Cloud,
  Code2,
  Smartphone,
  Sparkles,
  Palette,
  Mail,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { Reveal } from "@/components/shared";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import {
  Container,
  Button,
  Badge,
  Icon,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  Field,
  Label,
  Separator,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  Spinner,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Design System",
  description: "The AsosSoft component library and design language.",
};

/** Section wrapper with a consistent heading treatment. */
function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 py-14 first:pt-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-foreground-muted">{description}</p>
        )}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const swatches = [
  { name: "background", var: "bg-background" },
  { name: "surface", var: "bg-surface" },
  { name: "surface-elevated", var: "bg-surface-elevated" },
  { name: "foreground", var: "bg-foreground" },
  { name: "muted", var: "bg-foreground-muted" },
  { name: "border", var: "bg-border" },
];

export default async function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <Container className="pt-16 pb-4">
          <Reveal>
            <Badge variant="subtle" dot>
              <Sparkles className="size-3" /> Design System v1
            </Badge>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              The AsosSoft design language
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground-muted">
              A scalable, monochrome component library — built on tokens for
              effortless theming across light and dark.
            </p>
          </Reveal>
        </Container>

        <Container>
          {/* Colors */}
          <Section
            id="colors"
            eyebrow="Foundations"
            title="Color & Surfaces"
            description="Semantic tokens driven by CSS variables. They invert automatically in dark mode."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {swatches.map((s) => (
                <div key={s.name} className="space-y-2">
                  <div
                    className={`h-20 rounded-xl border border-border ${s.var}`}
                  />
                  <p className="text-xs font-medium text-foreground-muted">
                    {s.name}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section
            id="typography"
            eyebrow="Foundations"
            title="Typography"
            description="Geist Sans with tight tracking on display sizes for a premium feel."
          >
            <div className="space-y-4">
              <p className="text-5xl font-semibold tracking-tight">
                Display · 48px
              </p>
              <p className="text-3xl font-semibold tracking-tight">
                Heading · 30px
              </p>
              <p className="text-xl font-medium">Subheading · 20px</p>
              <p className="text-base text-foreground">Body · 16px regular</p>
              <p className="text-sm text-foreground-muted">
                Muted · 14px — supporting copy and captions
              </p>
              <p className="font-mono text-sm text-foreground-muted">
                Mono · Geist Mono for code
              </p>
            </div>
          </Section>

          {/* Buttons */}
          <Section
            id="buttons"
            eyebrow="Components"
            title="Buttons"
            description="Six variants and four sizes, with loading and icon support."
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                  Large
                </Button>
                <Button size="icon" aria-label="Sparkles">
                  <Sparkles className="size-4" />
                </Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Section>

          {/* Badges */}
          <Section id="badges" eyebrow="Components" title="Badges">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solid">Solid</Badge>
              <Badge variant="subtle">Subtle</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="muted">Muted</Badge>
              <Badge variant="glass">Glass</Badge>
              <Badge dot>With dot</Badge>
            </div>
          </Section>

          {/* Icons */}
          <Section
            id="icons"
            eyebrow="Components"
            title="Icon Framing"
            description="Lucide icons in consistent, themeable containers."
          >
            <div className="flex flex-wrap items-center gap-4">
              <Icon icon={Code2} variant="solid" />
              <Icon icon={Smartphone} variant="subtle" />
              <Icon icon={Cloud} variant="outline" size="lg" />
              <Icon icon={Palette} variant="glass" size="xl" />
            </div>
          </Section>

          {/* Cards */}
          <Section
            id="cards"
            eyebrow="Components"
            title="Cards"
            description="Composable surfaces with hover treatments."
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card hover="lift">
                <CardHeader>
                  <Icon icon={Code2} className="mb-2" />
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>
                    High-performance apps built on Next.js and modern tooling.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" rightIcon={<ArrowRight className="size-4" />}>
                    Learn more
                  </Button>
                </CardFooter>
              </Card>
              <Card variant="glass" hover="glow">
                <CardHeader>
                  <Icon icon={Cloud} variant="glass" className="mb-2" />
                  <CardTitle>Cloud & DevOps</CardTitle>
                  <CardDescription>
                    Scalable infrastructure with automated delivery pipelines.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card variant="elevated" hover="border">
                <CardHeader>
                  <CardTitle>Elevated</CardTitle>
                  <CardDescription>
                    A raised surface using the shadow scale.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground-muted">
                    Cards accept variant, hover, and padding props.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Forms */}
          <Section
            id="forms"
            eyebrow="Components"
            title="Forms & Inputs"
            description="Accessible fields with labels, hints, and error states."
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <Card padding="lg" className="space-y-5">
                <Field label="Full name" htmlFor="sg-name" required>
                  <Input id="sg-name" placeholder="Jane Doe" />
                </Field>
                <Field
                  label="Email"
                  htmlFor="sg-email"
                  hint="We'll never share your email."
                >
                  <Input
                    id="sg-email"
                    type="email"
                    placeholder="jane@company.com"
                    leftIcon={<Mail />}
                  />
                </Field>
                <Field
                  label="Budget"
                  htmlFor="sg-budget"
                  error="Please select a budget range."
                >
                  <Select id="sg-budget" invalid defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option>$5k – $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k+</option>
                  </Select>
                </Field>
              </Card>

              <Card padding="lg" className="space-y-5">
                <Field label="Message" htmlFor="sg-msg">
                  <Textarea
                    id="sg-msg"
                    placeholder="Tell us about your project…"
                  />
                </Field>
                <div className="flex items-start gap-3">
                  <Checkbox id="sg-terms" defaultChecked />
                  <Label htmlFor="sg-terms" className="font-normal text-foreground-muted">
                    I agree to the terms of service and privacy policy.
                  </Label>
                </div>
                <Separator />
                <Button className="w-full" rightIcon={<ArrowRight className="size-4" />}>
                  Send message
                </Button>
              </Card>
            </div>
          </Section>

          {/* Loading */}
          <Section
            id="loading"
            eyebrow="Components"
            title="Loading States"
            description="Shimmer skeletons and spinners for graceful loading."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <SkeletonCard />
              <Card padding="lg">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="mt-4">
                  <SkeletonText lines={4} />
                </div>
              </Card>
              <Card
                padding="lg"
                className="flex items-center justify-center gap-4"
              >
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </Card>
            </div>
          </Section>

          {/* Shadows & Radius */}
          <Section
            id="elevation"
            eyebrow="Foundations"
            title="Shadows & Radius"
            description="A soft, low-contrast elevation scale and consistent corner radii."
          >
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <div key={s} className="space-y-2">
                  <div
                    className="grid h-24 place-items-center rounded-2xl bg-surface"
                    style={{ boxShadow: `var(--shadow-${s})` }}
                  >
                    <span className="text-xs font-medium text-foreground-muted">
                      shadow-{s}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-end gap-6">
              {(
                [
                  ["rounded-lg", "1rem"],
                  ["rounded-xl", "1.5rem"],
                  ["rounded-2xl", "2rem"],
                ] as const
              ).map(([cls]) => (
                <div key={cls} className="space-y-2">
                  <div className={`size-24 border border-border bg-surface ${cls}`} />
                  <p className="text-xs text-foreground-muted">{cls}</p>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </main>
      <Footer dict={dict} locale={raw} />
    </>
  );
}
