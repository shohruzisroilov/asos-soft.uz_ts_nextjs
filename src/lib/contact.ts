import type { Dictionary } from "@/i18n";

/** How the visitor wants us to reach them back, in the order shown. */
export const contactMethods = ["phone", "telegram", "email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export interface ContactFormValues {
  fullName: string;
  contactMethod: ContactMethod;
  /** Interpreted according to `contactMethod` — an address, number, or handle. */
  contactValue: string;
  service: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

/** Localized validation messages — sourced from dict.contact.errors. */
export type ContactErrorMessages = Dictionary["contact"]["errors"];

export const emptyContactForm: ContactFormValues = {
  fullName: "",
  contactMethod: "phone",
  contactValue: "",
  service: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,}$/;
/** Telegram handles: 5–32 chars, letters/digits/underscore, optional @. */
const TELEGRAM_RE = /^@?[a-zA-Z0-9_]{5,32}$/;

export function isContactMethod(value: unknown): value is ContactMethod {
  return contactMethods.includes(value as ContactMethod);
}

/** Validates `contactValue` against whichever method the visitor picked. */
function validateContactValue(
  method: ContactMethod,
  value: string,
  messages: ContactErrorMessages
): string | undefined {
  if (!value) {
    if (method === "email") return messages.emailRequired;
    if (method === "phone") return messages.phoneRequired;
    return messages.telegramRequired;
  }
  if (method === "email" && !EMAIL_RE.test(value)) return messages.emailInvalid;
  if (method === "phone" && !PHONE_RE.test(value)) return messages.phoneInvalid;
  if (method === "telegram" && !TELEGRAM_RE.test(value))
    return messages.telegramInvalid;
  return undefined;
}

/** Client-side validation. Returns a map of field → localized error message. */
export function validateContactForm(
  v: ContactFormValues,
  messages: ContactErrorMessages
): ContactErrors {
  const e: ContactErrors = {};

  if (!v.fullName.trim()) e.fullName = messages.fullNameRequired;
  else if (v.fullName.trim().length < 2) e.fullName = messages.fullNameShort;

  const contactError = validateContactValue(
    v.contactMethod,
    v.contactValue.trim(),
    messages
  );
  if (contactError) e.contactValue = contactError;

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
