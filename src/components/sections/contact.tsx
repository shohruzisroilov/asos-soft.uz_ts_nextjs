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
import { siteConfig } from "@/config/site";
import { useI18n } from "@/providers/i18n-provider";
import {
  emptyContactForm,
  validateContactForm,
  submitContactForm,
  type ContactFormValues,
  type ContactErrors,
} from "@/lib/contact";

/** Visual top-to-bottom order of the form fields, used for error focus. */
const FIELD_ORDER: (keyof ContactFormValues)[] = [
  "fullName",
  "phone",
  "email",
  "service",
  "message",
];

function SuccessToast({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();

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
              {t.contact.success.title}
            </p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              {t.contact.success.body}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.contact.errors.dismiss}
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
  const { t } = useI18n();
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactDetails = [
    {
      icon: Mail,
      label: t.contact.details.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: t.contact.details.phone,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t.contact.details.location,
      value: siteConfig.contact.address,
      href: undefined,
    },
  ];

  // Options are derived from the translated services.
  const serviceOptions = [
    ...t.services.items.map((s) => s.title),
    t.contact.serviceOther,
  ];

  const setField = (name: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors = validateContactForm(values, t.contact.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Send the user straight to the problem instead of leaving them to
      // hunt for it — matters most for keyboard and screen-reader users.
      // Walked in visual order so focus lands on the topmost error, not
      // whichever key the validator happened to write first.
      const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    try {
      setSubmitting(true);
      await submitContactForm(values);
      setValues(emptyContactForm);
      setErrors({});
      setToastOpen(true);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : t.contact.errors.submitFailed;
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative scroll-mt-8 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Left — intro + details */}
          <div>
            <Reveal>
              <Badge variant="subtle" dot>
                {t.contact.badge}
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="contact-heading"
                className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {t.contact.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-balance text-lg text-foreground-muted">
                {t.contact.subheading}
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
                <Field label={t.contact.form.fullName} htmlFor="fullName" required error={errors.fullName}>
                  <Input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    placeholder={t.contact.form.fullNamePlaceholder}
                    value={values.fullName}
                    invalid={!!errors.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                  />
                </Field>

                <Field label={t.contact.form.phone} htmlFor="phone" required error={errors.phone}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.contact.form.phonePlaceholder}
                    value={values.phone}
                    invalid={!!errors.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                </Field>

                <Field label={t.contact.form.email} htmlFor="email" required error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    value={values.email}
                    invalid={!!errors.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </Field>

                <Field label={t.contact.form.service} htmlFor="service" required error={errors.service}>
                  <Select
                    id="service"
                    name="service"
                    value={values.service}
                    invalid={!!errors.service}
                    onChange={(e) => setField("service", e.target.value)}
                  >
                    <option value="" disabled>
                      {t.contact.form.selectService}
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  label={t.contact.form.message}
                  htmlFor="message"
                  required
                  error={errors.message}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    value={values.message}
                    invalid={!!errors.message}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                </Field>
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="mt-4 text-center text-sm font-medium text-danger"
                >
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                isLoading={submitting}
                rightIcon={<Send className="size-4" />}
              >
                {submitting ? t.contact.form.submitting : t.contact.form.submit}
              </Button>

              <p className="mt-4 text-center text-xs text-foreground-subtle">
                {t.contact.form.privacy}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>

      <SuccessToast open={toastOpen} onClose={() => setToastOpen(false)} />
    </section>
  );
}
