# Technical SEO report — Masbak

Audit date: 2026-09-09. Scope: invisible technical SEO only. No deployment was performed.

## Initial status

The project is a static-export Next.js site with one public content route, `/`. Existing Arabic title and description, `lang="ar" dir="rtl"`, favicon references, and descriptive image attributes were present. Homepage robots metadata explicitly blocked indexing and link following. Canonical, social metadata, JSON-LD, robots.txt and sitemap.xml were absent.

Production checks: https://masbak.co/ returned 308 to https://www.masbak.co/, which returned 200. The live homepage had `noindex, nofollow`. Both production /robots.txt and /sitemap.xml returned 404 after following redirects. No X-Robots-Tag was present on the homepage response chain. HTTPS and HSTS were present. These observations describe the pre-deployment site, not the revised local build.

## Files and exact changes

Modified:
- `app/layout.tsx`: production metadata base, canonical, index/follow, title/description, Open Graph, Twitter/X and JSON-LD in the head. Existing font setup, body, language/direction and favicon references retained.
- `scripts/preview.mjs`: added application/xml MIME type for local sitemap preview only.

Created:
- `app/robots.txt`: static robots document, exported to /robots.txt.
- `app/sitemap.xml`: static XML sitemap, exported to /sitemap.xml.
- `SEO-KEYWORDS.md`: qualitative keyword and intent map.
- `SEO-REPORT.md`: this report.

Generated verification evidence is stored in ignored `test-results/`, and production artifacts in ignored `out/`. The build-generated next-env.d.ts change was reverted to avoid unrelated changes.

## Metadata

Title: مَسبَك | بناء الكيانات والتحويل التشغيلي في السعودية

Meta description: مَسبَك شركة بناء وتحويل تشغيلي سعودية. نصمم نموذج العمل، نبني الفريق والأنظمة والعمليات، ونطلق التشغيل ثم ننقل كيانًا قادرًا على الاستمرار والنمو.

Canonical: https://masbak.co/

Robots meta: `index, follow`.

Language: existing `<html lang="ar" dir="rtl">`, Open Graph locale ar_SA, and schema inLanguage ar. No nonexistent language alternatives were added.

Open Graph includes title, description, website type, production URL, site name مَسبَك, ar_SA locale and existing brand image https://masbak.co/brand/asset-0.png. Next.js serializes og:url as https://masbak.co; the canonical link retains its trailing slash. Both represent the root URL.

Twitter/X includes summary_large_image, the same title/description and existing brand image. No unconfirmed Twitter account was supplied. The existing transparent logo is 435 × 173; platform cropping and large-card presentation may vary. No new image was created or resized.

Existing /brand/FAV_ICON.png icon, shortcut icon and Apple icon references were retained. Both icon and logo return 200 locally. Existing image alt text, dimensions and loading behavior were retained unchanged.

## Crawling and schema

robots.txt:

```text
User-agent: *
Allow: /

Sitemap: https://masbak.co/sitemap.xml
```

Sitemap: https://masbak.co/sitemap.xml. Valid XML with exactly one loc, https://masbak.co/. No hash sections, test routes, archive files or error pages included. No fabricated last-modified date.

JSON-LD uses linked Organization, WebSite and WebPage nodes with stable IDs. Organization uses only the visible name, business description, logo, email m.alhamed@masbak.sa and LinkedIn URL already in the footer. No LocalBusiness, address, phone, ratings or reviews were invented. JSON-LD is parsed successfully and safely escapes less-than characters. Generic schema validation in the hosted Schema.org validator remains a recommended post-deployment check; no external validator certification or rich-result eligibility is claimed.

The local homepage has no noindex/nofollow or X-Robots-Tag block, and metadata contains no localhost, preview or staging URLs. Next.js error pages may intentionally remain noindex. robots.txt is not an access-control mechanism; deploy the export output, not the repository/archive/test folders.

## Verification and design freeze

- Baseline build and revised `npm run build`: passed; homepage, robots.txt and sitemap.xml exported.
- `npm run typecheck`: passed against generated production types.
- `npm run lint`: passed with zero warnings in final run.
- `npm run test:ui`: passed at 320, 360, 375, 390, 412, 430, 768, 1024, 1440 and 1920 pixels. No overflow, broken anchors, page errors or automated accessibility violations. Mobile menu open/close checks passed.
- Full-page before/after PNGs at 390 and 1440 pixels were byte-identical with reduced motion enabled for deterministic comparison.
- Exported body HTML was identical after excluding Next.js scripts. Page/component sources, CSS, fonts, assets and animation code were unchanged.
- Local homepage, robots, sitemap, logo and icon returned HTTP 200. XML parsed without errors and contained only the expected URL. Required head tags and the three schema types passed assertions.
- Evidence: test-results/seo-check.json, test-results/report.json, seo-before/after-390.png and seo-before/after-1440.png.

DESIGN CHANGED: NO
VISIBLE CONTENT CHANGED: NO
LAYOUT CHANGED: NO
CSS VISUAL CHANGES: NO
ANIMATIONS CHANGED: NO
SEO METADATA ADDED: YES
ROBOTS.TXT READY: YES — local export
SITEMAP.XML READY: YES — local export
SCHEMA READY: YES — local validation
GOOGLE INDEXING READY: local implementation ready; production deployment and domain alignment pending. Indexing itself is Google's decision.

## Keyword research summary

SEO-KEYWORDS.md covers primary, secondary, long-tail, Arabic, English, Saudi, commercial and brand terms, with intent, priority and the existing homepage for every keyword. Priorities are qualitative judgments based on service relevance. No live volume, difficulty, ranking or competitor data was available or invented. The industrial-foundry meaning of مسبك and infrastructure meaning of BOT require care. No meta keywords, hidden keywords or keyword stuffing were added.

## Recommendations intentionally not implemented

- Visible service landing pages and an English version could be considered only under a separate content scope; none were added.
- No heading changes: the current page uses one H1 and H2/H3 sections; no skipped-level issue was found in the rendered sequence.
- Team PNGs are approximately 1.47–2.03 MB each. Future image delivery optimization would require a separately approved scope; no compression, resizing, loading changes or source changes were made.
- Consider a dedicated social sharing asset in a future branding scope. Existing logo preserved exactly.
- No performance scores or Core Web Vitals improvement is claimed. No animation, JavaScript behavior, CSS or layout optimization was performed.

## Production deployment and Search Console handoff

1. Deploy the revised static export using the existing production deployment process. No deployment/account changes were made in this task.
2. In hosting domain settings, serve https://masbak.co/ directly with HTTP 200 and redirect www to the apex, preserving paths. Remove the current apex-to-www redirect first to avoid a loop. This aligns hosting with the user's preferred canonical. Do not add an opposing application redirect while the hosting redirect remains active.
3. After deployment, verify https://masbak.co/, https://masbak.co/robots.txt and https://masbak.co/sitemap.xml return 200 with HTML, text and XML content types respectively. Verify logo/icon access, no hosting X-Robots-Tag block, no authentication gate, and the new head tags. These live post-deployment checks are pending.
4. Use the separately verified Search Console property for masbak.co. Submit https://masbak.co/sitemap.xml. Inspect https://masbak.co/ with the live URL test, then request indexing. No Google verification code was added.
5. Review Google-selected canonical, sitemap processing and indexing reports after Google recrawls. Submission does not guarantee indexing or rankings.

Google reference: [canonical consolidation guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) explains alignment of redirects, canonical links and sitemaps. [Sitemap submission guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) documents sitemap preparation. [Request a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) covers Search Console submission.
