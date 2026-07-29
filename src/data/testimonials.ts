/**
 * Non-translatable testimonial metadata (name, company, rating, avatar).
 * The translatable role + review live in the dictionary
 * (dict.testimonials.items) in the SAME order.
 */
export interface TestimonialMeta {
  name: string;
  company: string;
  rating: number; // 1–5
  /** Optional real image; falls back to a monogram avatar when absent. */
  avatar?: string;
}

export const testimonials: TestimonialMeta[] = [
  { name: "Abror Musayev", company: "Surxondaryo viloyati", rating: 5 },
];
