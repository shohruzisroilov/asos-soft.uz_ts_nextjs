import type { Dictionary } from "@/i18n";

export interface ContactFormValues {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

/** Localized validation messages — sourced from dict.contact.errors. */
export type ContactErrorMessages = Dictionary["contact"]["errors"];

export const emptyContactForm: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,}$/;

/** Client-side validation. Returns a map of field → localized error message. */
export function validateContactForm(
  v: ContactFormValues,
  messages: ContactErrorMessages
): ContactErrors {
  const e: ContactErrors = {};

  if (!v.fullName.trim()) e.fullName = messages.fullNameRequired;
  else if (v.fullName.trim().length < 2) e.fullName = messages.fullNameShort;

  if (!v.phone.trim()) e.phone = messages.phoneRequired;
  else if (!PHONE_RE.test(v.phone.trim())) e.phone = messages.phoneInvalid;

  if (!v.email.trim()) e.email = messages.emailRequired;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = messages.emailInvalid;

  if (!v.service) e.service = messages.serviceRequired;

  if (!v.message.trim()) e.message = messages.messageRequired;
  else if (v.message.trim().length < 10) e.message = messages.messageShort;

  return e;
}

/**
 * Submits the contact form to the secure API route.
 */
export async function submitContactForm(
  values: ContactFormValues
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Xabar yuborishda xatolik yuz berdi");
  }
}
