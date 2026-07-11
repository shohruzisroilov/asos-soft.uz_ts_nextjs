# AsosSoft

Premium IT company website — a modern, minimal, trustworthy marketing site.

Design language inspired by **Apple · Vercel · Linear · Stripe**: monochrome
(black / white / gray), generous whitespace, rounded corners, smooth motion,
and glassmorphism used sparingly.

## Tech Stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | Next.js 15 (App Router)         |
| Language       | TypeScript (strict)             |
| Styling        | Tailwind CSS v4 (CSS-first)     |
| Animation      | Framer Motion                   |
| Icons          | Lucide React                    |
| Theming        | next-themes (light / dark)      |
| Fonts          | Geist Sans + Geist Mono         |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run type-check` — TypeScript, no emit

## Project Structure

```
src/
├── app/                  # App Router: routes, layout, SEO (robots, sitemap)
│   ├── layout.tsx        # Root layout — fonts, metadata, ThemeProvider
│   ├── page.tsx          # Home (scaffold — sections composed here)
│   ├── globals.css       # Design tokens + Tailwind v4 theme
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/               # Primitives: Button, Card, Badge, Container…
│   ├── layout/           # Header, Footer, MobileNav, ThemeToggle
│   ├── sections/         # Page sections: Hero, Services, Work, CTA…
│   └── shared/           # Cross-cutting composite components
├── config/
│   ├── site.ts           # Brand, metadata, contact, social
│   └── navigation.ts     # Header / footer navigation
├── data/                 # Static content (services, projects, testimonials)
├── hooks/                # Custom React hooks
├── lib/
│   ├── utils.ts          # cn() class merger
│   └── motion.ts         # Shared Framer Motion presets
├── providers/            # Context providers (theme)
├── types/                # Shared TypeScript types
└── styles/               # Additional style modules
```

## Design Tokens

All colors, radii, and easings live as CSS variables in
[`src/app/globals.css`](src/app/globals.css) and are exposed to Tailwind via
`@theme`. Dark mode flips the `:root` variables under the `.dark` class.

## Status

🏗️ **Architecture initialized.** Pages and sections are scaffolded but not yet
built — the next step composes UI primitives and sections into full pages.
