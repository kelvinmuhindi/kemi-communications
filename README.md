# My Kemi Communication website

This is my Next.js project for the Kemi Communication Ltd website. I'm
keeping notes here for myself so I remember how everything fits together
and what's still outstanding. Built with Next.js 16 (App Router), React 19,
TypeScript and Tailwind CSS v4.

I modeled the site structure after Siginon Group's navigation: About Us,
Services, Media, Resources, Contact Us and a dedicated Get a Quote page.
No "Home" link in the nav since I removed it on purpose.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## My site map

| Route | Page | What's there |
|---|---|---|
| `/` | Home | Dark hero with the stat strip, "Why Choose Us" grid, a short services teaser (one-liners, not full detail), testimonial, CTA. I modeled this on siginon.com and freightforwarders.co.ke. No duplicated content, the full detail only lives on its own page. |
| `/about` | About Us | My story, mission/vision, values, "why choose us" |
| `/services` | Services | Full service list, fleet, coverage routes |
| `/media` | Media | News/announcements and a blog placeholder |
| `/resources` | Resources | Brochure/FAQ/rate guide placeholders |
| `/contact` | Contact Us | Contact details and a general enquiry form |
| `/get-a-quote` | Get a Quote | Dedicated freight quote request form |

The top nav (`src/components/layout/Header.tsx`) is a flat list, no
dropdowns. Every click is a real page change, not a scroll on one long
page. I edit the menu itself in `src/lib/content.ts` under `navLinks`.

## How the project is organized

```
src/
  app/
    layout.tsx              Root layout, metadata, html/body shell
    page.tsx                  Homepage
    globals.css                Tailwind import and brand color tokens (@theme)
    about/page.tsx
    services/page.tsx
    media/page.tsx
    resources/page.tsx
    contact/page.tsx
    get-a-quote/page.tsx
    api/
      contact/route.ts          POST endpoint for the contact form
      get-a-quote/route.ts      POST endpoint for the quote request form
  components/
    layout/
      Header.tsx             Sticky nav with mobile menu
      Footer.tsx               Site footer
    sections/
      PageHero.tsx            Shared dark banner at the top of every sub-page
      Hero.tsx                  Homepage-only full-bleed hero with stat strip
      WhyChooseUs.tsx           Homepage feature grid
      ServicesTeaser.tsx        Homepage service one-liners, links out to /services
      Services.tsx              Full service grid, used on /services only
      Fleet.tsx
      Coverage.tsx              Just the stats and the Kenya map now, no duplicate text list
      KenyaMap.tsx              Custom SVG map, real Kenya outline built from actual
                                 constituency-level boundary data (union of all
                                 constituency polygons, simplified to ~50 points).
                                 White border stroke, Nairobi hub with routes to
                                 each city.
      Testimonial.tsx
      CtaBand.tsx               Reusable CTA band at the bottom of most pages
      ContactForm.tsx           Client component, handles /contact form state and submit
      QuoteForm.tsx             Client component, handles /get-a-quote form state and submit
    ui/
      Button.tsx               Shared button variants (primary/ghost/dark/outline-light)
      Eyebrow.tsx               Small section label with the dash
  lib/
    content.ts                  All my site copy lives here: nav structure, services,
                                 fleet specs, about/media/resources content, contact
                                 info, quote-form dropdown options. I edit here first,
                                 most content changes never need me to touch a
                                 component file.
    email.ts                    Resend email-sending helper, used by both API routes
    whatsapp.ts                 WhatsApp Business Cloud API helper, used by both API routes
    validation.ts                Shared email and Kenyan phone number validation
public/
  images/
    logo.png                      My logo, transparent background
```

## My brand colors

Defined in `src/app/globals.css` under `@theme inline`, available as
Tailwind classes:

| Token | Hex | Tailwind class |
|---|---|---|
| Orange (primary) | `#FF9700` | `bg-brand-orange`, `text-brand-orange` |
| Orange deep (hover) | `#E08300` | `bg-brand-orange-deep` |
| Ink (near-black) | `#181614` | `bg-brand-ink`, `text-brand-ink` |
| Ink soft | `#3A3633` | `text-brand-ink-soft` |
| Steel (muted text) | `#5B6670` | `text-brand-steel` |
| Paper (white background) | `#FFFFFF` | `bg-brand-paper` |
| Paper warm (section background) | `#FAF7F3` | `bg-brand-paper-warm` |
| Line (borders) | `#ECE7E0` | `border-brand-line` |

## Fonts, still need to fix this

I built this project in a sandboxed environment that couldn't reach
`fonts.googleapis.com`, so right now it's falling back to system fonts
(Arial Black / system sans). The fonts I actually want are Archivo Black
for headings and Inter for body text. To turn them on, in
`src/app/layout.tsx` I need to add:

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

Then add `${archivoBlack.variable} ${inter.variable}` to the `<html>`
className. Nothing else needs to change, `globals.css` already points at
these CSS variables with system-font fallbacks in place.

## Where things stand

**Done:**
- 7 pages: Home, About Us, Services, Media, Resources, Contact Us, Get a Quote
- Flat navigation, no dropdowns
- Contact form and Get a Quote form, wired to real API routes
- Fully responsive, mobile menu, responsive grids
- All copy centralized in `lib/content.ts`

**Still waiting on me (content/assets I need to provide):**
- Real photos: vehicles, team, office. Using illustrated SVG placeholders for now.
- Blog content, press coverage, full FAQ list, brochure PDF, rate guide
- M-Pesa payment integration (Daraja API)
- Forex calculator widget
- WhatsApp Business API setup (right now it's just a basic `wa.me` link)
- Google Analytics 4

**Still waiting on setup (not content, just configuration):**
- WhatsApp notifications are coded and ready, but inactive until I finish
  Meta's WhatsApp Business API setup (steps below). Email notifications
  are already working, Resend API key is added in Vercel.

## Setting up form notifications

Both `/contact` and `/get-a-quote` submit to real API routes
(`src/app/api/contact/route.ts` and `src/app/api/get-a-quote/route.ts`)
that validate the input then try to send an email and a WhatsApp message.
The two channels are independent: if one isn't set up yet the other still
works and the form still succeeds for whoever's filling it out either way.

### Email (Resend), already done

I've already signed up at [resend.com](https://resend.com), grabbed an API
key and added `RESEND_API_KEY` in Vercel under Project Settings →
Environment Variables. Email notifications are live.

Two related variables I can optionally set in the same place:
- `NOTIFY_EMAIL_TO`, the inbox that should receive form notifications
  (defaults to the address in `siteConfig.email` if I don't set this)
- `NOTIFY_EMAIL_FROM`, the "from" address. Right now this is using
  Resend's sandbox address `onboarding@resend.dev`. To send from my own
  domain (e.g. `notifications@kemicommunication.com`), I need to verify
  that domain under Domains in the Resend dashboard first, this means
  adding a few DNS records, similar to the Vercel domain setup I already
  did.

### WhatsApp (Meta WhatsApp Business Cloud API)

This one needs a Meta developer account and business verification. It's
free but has more steps than email:

1. Go to [developers.facebook.com](https://developers.facebook.com) and
   create a Meta Developer account if I don't have one yet.
2. Create a new App, select Business as the app type.
3. Add the WhatsApp product to the app.
4. Meta gives a free test phone number I can use right away, or I can
   register my own business number.
5. From the WhatsApp dashboard I copy:
   - The temporary access token for testing, or a permanent token under
     System Users for production
   - The Phone Number ID (not the actual phone number, an internal
     numeric ID Meta assigns)
6. In Vercel, under Project Settings → Environment Variables, I add:
   - `WHATSAPP_ACCESS_TOKEN`, the token from step 5
   - `WHATSAPP_PHONE_NUMBER_ID`, the phone number ID from step 5
   - `WHATSAPP_NOTIFY_TO`, the phone number that should receive
     notifications, country code, no `+` or spaces (e.g. `254704881748`)
7. Important: Meta's test numbers can only message numbers I've added to
   an approved recipient list while the app is still in development mode.
   For unrestricted sending the app needs to go through Meta's app review.
8. Redeploy for the new environment variables to kick in.

Until I set the WhatsApp variables, the API routes just log a warning and
skip sending, they never break the form submission because of it.

### Testing this locally

I create a `.env.local` file in the project root (it's git-ignored, never
commit it) with the same variables listed above, then run `npm run dev`.
Submitting either form will attempt real sends using whatever keys are
present.

## Commands I actually use

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npx eslint src   # lint
npx tsc --noEmit # type-check only
```

## Analytics

Vercel Speed Insights and Vercel Analytics are both wired up in
`src/app/layout.tsx` (`@vercel/speed-insights/next` and
`@vercel/analytics/next`). Both turn on automatically once deployed on
Vercel, nothing else for me to do. Locally or on other hosts they just do
nothing. Speed Insights tracks page performance, Analytics tracks
visitor/pageview data, I can see both under their respective tabs in my
Vercel project dashboard.

Google Analytics 4 isn't added yet, it's in my "still waiting on me" list above.

## Favicon and app icons

`src/app/favicon.ico`, `src/app/icon.png` and `src/app/apple-icon.png` are
cropped from my logo (just the truck graphic, since the full logo with the
wordmark turns illegible at favicon sizes). Next.js auto-detects these
filenames, I don't need any manual `<link>` tags or metadata config. To
change them I just replace the files with new images of the same name,
any reasonable square image works and Next.js handles resizing.
