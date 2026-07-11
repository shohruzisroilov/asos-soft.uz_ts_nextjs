import { services } from "./services";

/** Service dropdown options — derived from our services, plus a catch-all. */
export const serviceOptions: string[] = [
  ...services.map((s) => s.title),
  "Other / Not sure",
];

export const budgetOptions: string[] = [
  "Less than $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];
