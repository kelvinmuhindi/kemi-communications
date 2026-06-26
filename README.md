# Kemi Communications — Website (Next.js)

This is the homepage build for Kemi Communications Ltd, a road freight and
logistics company operating in Kenya with cross-border ambitions across
Africa. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**,
and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx        Root layout, metadata, html/body shell
    page.tsx           Homepage — assembles all sections
    globals.css         Tailwind import + brand color tokens (@theme)
  components/
    layout/
      Header.tsx       Sticky nav with mobile menu
      Footer.tsx       Site footer
    sections/
      Hero.tsx
      TruckIllustration.tsx   Inline SVG illustration (no stock imagery)
      SneakPeek.tsx     Homepage "glimpse of the whole site" strip
      Services.tsx
      Fleet.tsx
      Coverage.tsx
      Testimonial.tsx
      CtaBand.tsx
    ui/
      Button.tsx       Shared button variants (primary/ghost/dark/outline-light)
      Eyebrow.tsx       Small section label with dash
  lib/
    content.ts          ALL site copy, services, fleet specs, contact info.
                         Edit here first — most content changes never need
                         to touch a component file.
public/
  images/
    logo.jpeg            Client-provided logo
```

## Brand tokens

Defined in `src/app/globals.css` under `@theme inline`, available as
Tailwind utility classes:

| Token | Hex | Tailwind class |
|---|---|---|
| Orange (primary) | `#FF9700` | `bg-brand-orange`, `text-brand-orange` |
| Orange deep (hover) | `#E08300` | `bg-brand-orange-deep` |
| Ink (near-black) | `#181614` | `bg-brand-ink`, `text-brand-ink` |
| Ink soft | `#3A3633` | `text-brand-ink-soft` |
| Steel (muted text) | `#5B6670` | `text-brand-steel` |
| Paper (white bg) | `#FFFFFF` | `bg-brand-paper` |
| Paper warm (section bg) | `#FAF7F3` | `bg-brand-paper-warm` |
| Line (borders) | `#ECE7E0` | `border-brand-line` |

## Fonts — action needed

This project was scaffolded in a sandboxed environment without access to
`fonts.googleapis.com`, so it currently falls back to system fonts
(`Arial Black` / system sans). The intended typefaces are **Archivo
Black** (display/headings) and **Inter** (body). To restore them, in
`src/app/layout.tsx`:

```tsx
import { Archivo_Black, Inter } from "next/font/google";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

And add `${archivoBlack.variable} ${inter.variable}` to the `<html>`
`className`. No other changes needed — `globals.css` already references
these CSS variables with system-font fallbacks.

## What's built vs. pending

**Built (this draft):**
- Homepage: hero, sneak-peek strip, services, fleet, coverage/routes,
  testimonial, CTA band, footer
- Fully responsive (mobile menu, responsive grids)
- All copy centralized in `lib/content.ts`

**Pending client input (see questionnaire answers):**
- Real photography (vehicles, team, office) — currently using illustrated
  SVG placeholders
- Additional pages: About, full Services detail, Fleet detail, Blog, FAQ,
  Contact/enquiry form
- M-Pesa payment integration (Daraja API)
- Forex calculator widget
- WhatsApp Business API (currently a basic `wa.me` deep link)
- Google Analytics 4
- Backend (Node.js) for enquiry form submission and storage

## Useful commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npx eslint src   # lint
npx tsc --noEmit # type-check only
```

## Analytics

[Vercel Speed Insights](https://vercel.com/docs/speed-insights) is wired up
in `src/app/layout.tsx` (`@vercel/speed-insights/next`). It activates
automatically on Vercel deployments — no extra setup needed. Locally or on
other hosts it simply does nothing.

Google Analytics 4 is not yet added — see "Pending client input" above.
