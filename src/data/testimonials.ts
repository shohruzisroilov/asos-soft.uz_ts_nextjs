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
  { name: "Otabek Madaminov", company: "", rating: 5 },
  { name: "Dilnoza Solihova", company: "", rating: 5 },
  { name: "Sardor Rahmonov", company: "", rating: 5 },
  { name: "Nodira To‘rayeva", company: "", rating: 5 },
  { name: "Jasur Tursunov", company: "", rating: 5 },
  { name: "Lola Karimova", company: "", rating: 5 },
];
