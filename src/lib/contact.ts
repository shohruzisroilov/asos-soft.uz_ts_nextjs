export interface ContactFormValues {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export const emptyContactForm: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,}$/;

/** Client-side validation. Returns a map of field → error message. */
export function validateContactForm(v: ContactFormValues): ContactErrors {
  const e: ContactErrors = {};

  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  else if (v.fullName.trim().length < 2) e.fullName = "That name looks too short.";

  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(v.phone.trim()))
    e.phone = "Please enter a valid phone number.";

  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim()))
    e.email = "Please enter a valid email address.";

  if (!v.service) e.service = "Please select a service.";
  if (!v.budget) e.budget = "Please select a budget range.";

  if (!v.message.trim()) e.message = "Please tell us about your project.";
  else if (v.message.trim().length < 10)
    e.message = "Please add a little more detail (at least 10 characters).";

  return e;
}

/**
 * Submits the contact form.
 *
 * TODO(telegram): Wire this to the Telegram Bot API. The recommended shape is
 * a POST to a server route (e.g. `/api/contact`) that keeps the bot token
 * secret and calls `sendMessage`:
 *
 *   await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(values),
 *   });
 *
 * For now this is frontend-only and simulates a successful send.
 */
export async function submitContactForm(
  values: ContactFormValues
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  // Placeholder until the Telegram integration is connected.
  void values;
}
