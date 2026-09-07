# Masbak experimental redesign

Local redesign copy only. No deployment, DNS, Vercel, email infrastructure or production changes were made. The preview includes `noindex, nofollow` metadata.

## Run

- `npm ci`
- `npm run dev -- --port 3100` for development.
- `npm run build` produces the static site in `out/`.
- `npm start` serves that build locally at http://127.0.0.1:3101.
- `npm run lint` and `npm run typecheck`.
- `npm run test:ui` with the static preview running; first install the browser with `npx playwright install chromium`.
- `node scripts/check-interactions.mjs` for BOT, keyboard, disclosures and no-JavaScript checks.

## Component structure

- `app/layout.tsx`: Arabic RTL document, locally hosted IBM Plex Sans Arabic, metadata.
- `app/page.tsx`: static narrative sections and original reference content.
- `app/globals.css`: brand tokens, responsive layout and reduced-motion rules.
- `components/navigation.tsx`: sticky navigation, accessible mobile menu and Escape handling.
- `components/bot-sequence.tsx`: sticky desktop step indicator, vertical mobile sequence.
- `components/ui/world-map.tsx`: isolated, shadcn-compatible React visual component.
- `components/ui/reveal.tsx`: restrained, once-only section entrance.
- `lib/map-geometry.json`: precomputed route geometry.
- `lib/source-content.json`, `lib/original-assets.json`: content and asset inventory extracted from the existing page.
- `public/brand/`: original logo, partner logos and team photos.
- `public/world-dots.svg`: precomputed map; no geography library shipped to browsers.
- `archive/`: original HTML retained for comparison and content recovery.

## Visual system

Original green #123B35 and gold #D7A53E, warm white #F6F4F1, original IBM Plex Sans Arabic. Large Arabic headlines, controlled line lengths, generous spacing, editorial service rows and alternating dark/light surfaces. No UI kit or theme-switching infrastructure.

Map: six gold connections originate at Riyadh (24.7136, 46.6753) toward London, New York, Singapore, Dubai, Paris and Johannesburg. The dotted-map projection snaps locations to its dot grid. Routes and dots share the same projection. Connections draw once, without endless loops; reduced-motion users see static paths. Destinations express capability, not offices or historical projects. The supplied request did not include a WorldMap implementation, so the component was authored to its specification.

Mobile: compact first screen, scaled map behind text, collapsible navigation, smaller spacing and normal vertical BOT sections below 768px. RTL is native; English process labels remain LTR. Desktop BOT uses IntersectionObserver with a sticky visual. Core content remains visible without JavaScript.

## Sections

Hero, positioning, Build/Operate/Transfer, six areas of work, operating philosophy, global capability, engagement journey, original work/partners/team disclosures, final contact and footer.

## Added dependencies

Runtime: Next.js, React, React DOM, Framer Motion.
Build/development: TypeScript and types, Tailwind CSS and PostCSS plugin, ESLint and Next rules, dotted-map, locally hosted font package, Playwright and axe.

## Verification

Production static build, lint and TypeScript pass. Browser checks cover 320, 360, 375, 390, 412, 430, 768, 1024, 1440 and 1920px: no horizontal overflow; hero headline and CTAs visible in the tested first viewports. Automated axe WCAG A/AA checks pass on desktop and mobile. Additional interaction checks cover BOT progression, native disclosures, keyboard skip link, reduced motion and no-JavaScript readability. These are automated/lab checks, not field Core Web Vitals or a full manual screen-reader audit. Reports/screenshots are generated under `test-results/`.

## Content decisions for client review

- Approve the refined hero and final CTA wording before any future publication.
- Original work, partners and team copy remains available in disclosures. Existing numeric outcomes are omitted from the redesigned narrative and preserved in the archive; confirm current evidence and publication permissions before promoting them.
- Global locations are illustrative capability destinations, never claimed offices.
- Existing LinkedIn and website links are retained. All contact CTAs use m.alhamed@masbak.sa.
- Commercial registration and national address remain absent because no verified values were provided.

No publishing action is included in this project workflow.
