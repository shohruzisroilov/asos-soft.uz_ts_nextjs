"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from "lucide-react";
import {
  Container,
  Badge,
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { Reveal } from "@/components/shared";
import { serviceOptions, budgetOptions } from "@/data/contact";
import { siteConfig } from "@/config/site";
import {
  emptyContactForm,
  validateContactForm,
  submitContactForm,
  type ContactFormValues,
  type ContactErrors,
} from "@/lib/contact";

const contactDetails = [
  { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: siteConfig.contact.address, href: undefined },
];

function SuccessToast({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, 5000);
    return () => clearTimeout(id);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xl"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Message sent successfully
            </p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              Thanks for reaching out — we&rsquo;ll reply within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="text-foreground-subtle transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const setField = (name: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      await submitContactForm(values);
      setValues(emptyContactForm);
      setErrors({});
      setToastOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Left — intro + details */}
          <div>
            <Reveal>
              <Badge variant="subtle" dot>
                Contact
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="contact-heading"
                className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Let&rsquo;s build something great
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-balance text-lg text-foreground-muted">
                Tell us about your project and we&rsquo;ll get back to you within
                24 hours with next steps.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors group-hover:border-foreground/25">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-xs text-foreground-subtle">
                          {label}
                        </span>
                        <span className="block text-sm font-medium text-foreground">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="group flex items-center gap-4 rounded-xl transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.2}>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
                  <Input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={values.fullName}
                    invalid={!!errors.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                  />
                </Field>

                <Field label="Phone" htmlFor="phone" required error={errors.phone}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    value={values.phone}
                    invalid={!!errors.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                </Field>

                <Field label="Email" htmlFor="email" required error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={values.email}
                    invalid={!!errors.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </Field>

                <Field label="Company" htmlFor="company" hint="Optional">
                  <Input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company Inc."
                    value={values.company}
                    onChange={(e) => setField("company", e.target.value)}
                  />
                </Field>

                <Field label="Service" htmlFor="service" required error={errors.service}>
                  <Select
                    id="service"
                    name="service"
                    value={values.service}
                    invalid={!!errors.service}
                    onChange={(e) => setField("service", e.target.value)}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Budget" htmlFor="budget" required error={errors.budget}>
                  <Select
                    id="budget"
                    name="budget"
                    value={values.budget}
                    invalid={!!errors.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  label="Message"
                  htmlFor="message"
                  required
                  error={errors.message}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline…"
                    value={values.message}
                    invalid={!!errors.message}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                </Field>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                isLoading={submitting}
                rightIcon={<Send className="size-4" />}
              >
                {submitting ? "Sending…" : "Send message"}
              </Button>

              <p className="mt-4 text-center text-xs text-foreground-subtle">
                We&rsquo;ll never share your details. By submitting you agree to
                our privacy policy.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>

      <SuccessToast open={toastOpen} onClose={() => setToastOpen(false)} />
    </section>
  );
}
