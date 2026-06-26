# Kemi Communications — Website (Next.js)

This is the multi-page website for Kemi Communications Ltd, a road freight
and logistics company operating in Kenya with cross-border ambitions
across Africa. Built with **Next.js 16 (App Router)**, **React 19**,
**TypeScript**, and **Tailwind CSS v4**.

Site structure modeled after Siginon Group's navigation pattern: Home,
About Us, Services, Media, Resources, Contact Us, and a dedicated Get a
Quote page.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Site map

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Full-bleed dark hero with stat strip, "Why Choose Us" feature grid, services teaser (one-liners only), testimonial, CTA. Modeled on the homepage patterns of siginon.com and freightforwarders.co.ke. No duplicated detail — full content lives only on its own page. |
| `/about` | About Us | Story, mission/vision, values, "why choose us" |
| `/services` | Services | Full service list, fleet, coverage routes |
| `/media` | Media | News/announcements + blog placeholder |
| `/resources` | Resources | Brochure/FAQ/rate guide placeholders |
| `/contact` | Contact Us | Contact details + general enquiry form |
| `/get-a-quote` | Get a Quote | Dedicated freight quote request form |

The top navigation (`src/components/layout/Header.tsx`) is a flat list —
no "Home" link, no dropdowns. Every item is a real page navigation (an
actual route change, not an anchor scroll on a single page). Edit the menu
in `src/lib/content.ts` under `navLinks`.

## Project structure

```
src/
  app/
    layout.tsx              Root layout, metadata, html/body shell
    page.tsx                  Homepage
    globals.css                Tailwind import + brand color tokens (@theme)
    about/page.tsx
    services/page.tsx
    media/page.tsx
    resources/page.tsx
    contact/page.tsx
    get-a-quote/page.tsx
  components/
    layout/
      Header.tsx             Sticky nav with mobile menu
      Footer.tsx               Site footer
    sections/
      PageHero.tsx            Shared dark banner used at the top of every sub-page
      Hero.tsx                  Homepage-only full-bleed hero with stat strip
      WhyChooseUs.tsx           Homepage feature grid (Siginon/FFK pattern)
      ServicesTeaser.tsx        Homepage service one-liners, links out to /services
      Services.tsx              Full service grid, used on /services only
      Fleet.tsx
      Coverage.tsx
      Testimonial.tsx
      CtaBand.tsx               Reusable CTA band, used at the bottom of most pages
    ui/
      Button.tsx               Shared button variants (primary/ghost/dark/outline-light)
      Eyebrow.tsx               Small section label with dash
  lib/
    content.ts                  ALL site copy, nav structure, services, fleet specs,
                                 about/media/resources content, contact info, and
                                 quote-form dropdown options. Edit here first — most
                                 content changes never need to touch a component file.
public/
  images/
    logo.jpeg                    Client-provided logo
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
- 7 pages: Home, About Us, Services, Media, Resources, Contact Us, Get a Quote
- Dropdown navigation matching the requested site structure
- Contact form and Get a Quote form (frontend only — see below)
- Fully responsive (mobile menu, responsive grids)
- All copy centralized in `lib/content.ts`

**Pending client input (see questionnaire answers):**
- Real photography (vehicles, team, office) — currently using illustrated
  SVG placeholders
- Blog content, press coverage, full FAQ list, brochure PDF, rate guide
- M-Pesa payment integration (Daraja API)
- Forex calculator widget
- WhatsApp Business API (currently a basic `wa.me` deep link)
- Google Analytics 4

**Pending developer work:**
- Both forms (`/contact` and `/get-a-quote`) are frontend-only right now —
  submitting them does nothing yet. A developer needs to wire them to an
  email service (e.g. Resend, SendGrid) or a Node.js API route that stores
  submissions and notifies the team.

## Useful commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npx eslint src   # lint
npx tsc --noEmit # type-check only
```

## Analytics

[Vercel Speed Insights](https://vercel.com/docs/speed-insights) and
[Vercel Analytics](https://vercel.com/docs/analytics) are both wired up in
`src/app/layout.tsx` (`@vercel/speed-insights/next` and
`@vercel/analytics/next`). Both activate automatically on Vercel
deployments — no extra setup needed. Locally or on other hosts they
simply do nothing. Speed Insights tracks page performance; Analytics
tracks visitor/pageview data, viewable under the Analytics tab in your
Vercel project dashboard.

Google Analytics 4 is not yet added — see "Pending client input" above.

## Favicon & app icons

`src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png`
are cropped from the client's logo (just the truck graphic, since the
full logo with wordmark is illegible at favicon sizes). Next.js App
Router auto-detects these filenames — no manual `<link>` tags or metadata
config needed. To change them, just replace the files with new images of
the same name (any reasonable square image works; Next.js handles
resizing for different contexts).
