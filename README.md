# Apache Logistics

Marketing landing page for **Apache Logistics**, a freight and cargo transport company operating in northwest Mexico. Single-page site in Spanish with smooth scroll navigation, GSAP animations, interactive fleet maps, and an industrial editorial design.

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

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | Run ESLint             |
| `npm run clean` | Remove `.next` cache   |

If the dev server behaves oddly after upgrades, run `npm run clean && npm run dev`.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) — scroll reveals, counters, accordion layout, parallax
- [Phosphor Icons](https://phosphoricons.com/)
- **Pretendard**, **Archivo Black**, **Stretch Pro** — body, macro headings, display type

## Page structure

Sections render top to bottom in `app/page.tsx`:

| Order | Section            | Nav anchor   | Notes |
| ----- | ------------------ | ------------ | ----- |
| —     | **Nav**            | —            | Sticky header; glass state after hero. **Cotizar** opens quote modal. |
| 1     | **Hero**           | `#home`      | Full-viewport video background |
| 2     | **StatsBar**       | —            | Animated company metrics |
| 3     | **About**          | `#nosotros`  | Company story carousel |
| 4     | **Services**       | `#servicios` | Accordion + truck image; capped at one viewport on desktop |
| 5     | **SectionDivider** | —            | Parallax visual break (`crossing-paths.jpg`) |
| 6     | **Fleet**          | `#flota`     | Fleet specs with clickable GPS map overlay |
| 7     | **Routes**         | `#rutas`     | Route coverage copy + `back-trucks.jpg` |
| 8     | **Units**          | `#unidades`  | Unit types with interactive map overlay |
| 9     | **Clients**        | `#clientes`  | Logo carousel |
| —     | **FloatingTruck**  | —            | Decorative truck between Clients and Footer |
| —     | **Footer**         | —            | Contact info, social links, legal modals |

**Not on the page:** Blog section removed. Contact lives in a modal (`QuoteModalProvider`), opened from Nav, Hero CTA, and Footer — not as a standalone section.

## Design tokens

Defined in `tailwind.config.ts` and `app/globals.css`:

| Token       | Value     | Usage |
| ----------- | --------- | ----- |
| `nav`       | `#164775` | Nav blue, Services, Clients |
| `hero`      | `#E11F26` | Hero accent |
| `highlight` | `#FBD70E` | CTAs, accents |
| `base`      | `#FDFDFD` | Light backgrounds, body on dark sections |

**Tailwind note:** `base` is a **color**, not font size. On light sections use `md:text-[1rem]` for body copy — `md:text-base` resolves to the white color token.

## Project layout

```
app/
  layout.tsx          # Fonts, metadata, Providers wrapper
  page.tsx            # Home page — composes all sections
  globals.css         # CSS variables, nav shell, utilities
  fonts/              # Stretch Pro (local)

components/
  Nav.tsx             # Anchor links + Cotizar button
  Hero.tsx, About.tsx, Services.tsx, Fleet.tsx, Routes.tsx, Units.tsx, Clients.tsx
  ServicesAccordion.tsx, ServiceAccordionRow.tsx
  FleetMap.tsx, UnitsMap.tsx
  SectionDivider.tsx, FloatingTruck.tsx, Footer.tsx
  Contact.tsx         # Form used inside quote modal
  QuoteModalProvider.tsx, QuoteOpenButton.tsx, Providers.tsx
  LegalModal.tsx, FooterSocial.tsx
  gsap/               # Reveal, Stagger, HeroEnter, NavEnter, hooks

lib/
  data.ts             # Stats, services, fleet specs
  content.ts          # About blocks, client list
  fleetMarkers.ts     # Fleet map GPS points
  unitMarkers.ts      # Units map GPS points
  serviceIcons.tsx    # Phosphor icon map for services
  legalContent.ts     # Terms & privacy copy for modals
  scrollTo.ts         # Smooth scroll with nav offset
  gsapCore.ts         # Shared GSAP init

public/
  images/             # Section photography and illustrations
  videos/             # Hero background (`apache-optimized.mp4`)
  logo/               # Brand SVG assets
```

## Editing content

| What | Where |
| ---- | ----- |
| Stats, services, fleet specs | `lib/data.ts` |
| About copy, client carousel | `lib/content.ts` |
| Fleet / unit map markers | `lib/fleetMarkers.ts`, `lib/unitMarkers.ts` |
| Legal modal text | `lib/legalContent.ts` |
| Section layout and styling | `components/<SectionName>.tsx` |
| Colors and fonts | `tailwind.config.ts`, `app/globals.css` |
| Nav links | `components/Nav.tsx` — `href` values must match section `id`s |

Replace or add images under `public/images/`. Remote `picsum.photos` is allowed in `next.config.ts` but the site currently uses local assets.

## Deployment

Configured for [Netlify](https://www.netlify.com/) via `netlify.toml` (`npm run build`, Node 20). Any platform that supports Next.js works the same way: build, then serve.
