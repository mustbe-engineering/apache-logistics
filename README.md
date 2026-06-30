# Apache Logistics

Marketing landing page for **Apache Logistics**, a freight and cargo transport company operating in northwest Mexico. Single-page site in Spanish with smooth scroll navigation, GSAP animations, and an industrial editorial design.

## Requirements

- **Node.js 20+** (used in Netlify builds)
- **npm**

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |
| `npm run clean` | Remove `.next` cache     |

If the dev server behaves oddly after upgrades, run `npm run clean && npm run dev`.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) — scroll reveals and counters
- [Phosphor Icons](https://phosphoricons.com/)

## Page structure

Sections render top to bottom in `app/page.tsx`:

1. **Nav** — sticky header with anchor links
2. **Hero** — full-viewport video background
3. **StatsBar** — animated company metrics
4. **About** — company story carousel
5. **Services** — service grid
6. **SectionDivider** — visual separator (not in nav)
7. **Fleet** — fleet specs and monitoring
8. **Clients** — client logos and testimonials
9. **Blog** — news cards
10. **Contact** — quote / contact form
11. **Footer**

## Project layout

```
app/
  layout.tsx      # Fonts, metadata, global shell
  page.tsx        # Home page — composes all sections
  globals.css     # CSS variables, base styles

components/       # One component per section (+ gsap/, ui helpers)
lib/
  data.ts         # Stats, services, fleet specs
  content.ts      # About, clients, quotes, blog posts
  scrollTo.ts     # Smooth scroll with nav offset

public/
  images/         # Local images (logo, about, worker)
  videos/         # Hero background video
  logo/           # Brand SVG
```

## Editing content

- **Copy and lists** — `lib/data.ts` and `lib/content.ts`
- **Section layout and styling** — `components/<SectionName>.tsx`
- **Colors and fonts** — `tailwind.config.ts` and `app/globals.css`
- **Nav links** — `components/Nav.tsx` (`#servicios`, `#flota`, etc. must match section `id`s in `components/ui.tsx` `Shell`)

Placeholder photos use [picsum.photos](https://picsum.photos) (allowed in `next.config.ts`). Replace with files under `public/images/` when you have final assets.

## Deployment

Configured for [Netlify](https://www.netlify.com/) via `netlify.toml` (`npm run build`, Node 20). Any platform that supports Next.js static/server output works the same way: build, then serve.
