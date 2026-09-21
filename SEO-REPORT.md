# Masbak brand/entity SEO implementation

Verified: 2026-09-21 (Asia/Riyadh).
Canonical homepage: https://www.masbak.co/
Scope: non-visible SEO signals and technical consistency only. No commit, push, deployment, hosting change, new page, or approved visible copy/design change.

## Current production versus local implementation

The user reports that Search Console confirms the homepage is indexed and available on Google. Search Console was not accessed independently. Live requests confirm HTTP 200, exactly one www canonical, index/follow, and no restrictive X-Robots-Tag. Production robots.txt allows crawling and references the www sitemap. Production sitemap.xml contains only the canonical www homepage. These are already correct in production.

Production still has the previous title/description and schema without alternateName. The new identity metadata, aliases, footer href correction and route isolation below are implemented and verified in the local production export, NOT deployed. Production error pages retain the old inherited homepage metadata until deployment.

Indexing and ranking for the ambiguous query "مسبك" are separate issues. This work explicitly connects مَسبَك, مسبك and Masbak as names of the same entity; it does not guarantee rankings, a knowledge panel or Google's preferred site name. Approved visible copy remains unchanged, including the absence of standalone plain مسبك and English Masbak in body copy. That limits visible on-page reinforcement under the current scope.

## Files changed

| File | Exact change |
| --- | --- |
| app/layout.tsx | Retains fonts, Arabic/RTL document, icons and metadataBase. Removes homepage-specific metadata and JSON-LD from the shared layout. |
| lib/seo.ts | New typed homepage metadata and single connected JSON-LD graph; adds aliases to the existing Organization and WebSite nodes. |
| app/page.tsx | Exports homepage metadata and renders its JSON-LD in initial HTML. Changes footer href to www; visible label remains masbak.co ↗. |
| scripts/check-seo.mjs | Checks exact unique metadata, social tags, aliases, entities, initial content, headings, canonical/crawl files/assets and isolated error-page metadata. |
| scripts/check-interactions.mjs | Corrects a stale disclosure assertion to test toggle/restoration from the actual initial open state. No application behavior changed. |
| SEO-REPORT.md | Replaces obsolete production/deployment statements with verified current findings. |

## Exact metadata and schema changes

Title (also Open Graph, Twitter and WebPage name):

> مَسبَك | Masbak — بناء الكيانات والتحويل التشغيلي

Description (also Open Graph, Twitter and WebPage description):

> مَسبَك (Masbak) شركة سعودية متخصصة في بناء الكيانات والتحويل التشغيلي والتطوير التنظيمي، وتصميم نماذج التشغيل وبناء الفرق والعمليات وتمكين الكيانات من النمو والاستقلال.

Organization and WebSite retain name مَسبَك and receive alternateName: ["مسبك", "Masbak"]. Organization description remains its original text as explicitly requested. All three stable @ids, canonical URLs, logo, email, LinkedIn sameAs, language, publisher, isPartOf and about relationships are preserved. No duplicate entities or fabricated details were introduced.

Homepage metadata and the complete homepage graph now belong to app/page.tsx via lib/seo.ts. The shared layout no longer leaks homepage canonical, title, social URL, index/follow or WebPage identity into other routes. Native JSON-LD is rendered at build time; hydration is not required.

Generated 404.html and _not-found/index.html retain framework noindex without inherited index/follow, homepage canonical, homepage schema or og:url. No error-page UI or framework noindex was changed.

No /about or /services was created. Future pages must define their own metadata, self-canonical, social URL and WebPage identity, and be added to the sitemap. Do not reuse homepageMetadata or the homepage WebPage node on sibling routes. Organization identity may retain its stable @id.

## Live redirects and crawl files

| Request | Observed result |
| --- | --- |
| http://masbak.co | 308 to https://masbak.co/, then 308 to https://www.masbak.co/, then 200 |
| https://masbak.co | 308 to https://www.masbak.co/, then 200 |
| http://www.masbak.co | 308 to https://www.masbak.co/, then 200 |
| https://www.masbak.co/ | 200; one www canonical; index, follow; no restrictive X-Robots-Tag |
| https://www.masbak.co/robots.txt | 200; User-agent: *, Allow: /, Sitemap: https://www.masbak.co/sitemap.xml |
| https://www.masbak.co/sitemap.xml | 200; valid XML with sole location https://www.masbak.co/ |

Hosting redirects remain unchanged. Static export and trailingSlash remain unchanged; no runtime redirects or headers were added. No robots.txt or sitemap.xml edits were necessary. Historical apex mentions in archive files and planning documentation are not rendered application links and were not rewritten.

## Verification

| Check | Result |
| --- | --- |
| npm run build | PASS; static homepage, error routes, robots.txt and sitemap.xml generated |
| npm run lint | PASS |
| npm run typecheck | PASS, including after restoring unchanged tracked next-env.d.ts |
| node scripts/check-seo.mjs | PASS against newly built export |
| npm run test:ui | PASS at 10 widths; no overflow, broken anchors, page errors or axe violations; menu and keyboard checks pass |
| node scripts/check-hero.mjs | PASS at 9 viewport combinations; text fits, CTAs visible, animated map and reduced-motion checks pass |
| node scripts/check-interactions.mjs | PASS after correcting the pre-existing stale expectation |
| Initial HTML comparison | PASS: body markup identical to baseline after excluding non-visible metadata/scripts and normalizing the authorized footer href |
| Visual comparison | PASS: exact visible body text and content-element rectangles at widths 320, 360, 390, 430, 768, 1024, 1440 and 1920 |
| Screenshots | PASS: full-page 390px mobile and 1440px desktop PNGs byte-identical before/after with reduced motion enabled |
| No-JavaScript check | PASS: visible heading/content and native disclosure open-close-reopen |
| Hydrated DOM review | PASS: requested metadata, one canonical, one index/follow tag, one H1, one graph with exactly one of each entity |

SEO regression checks first failed against the old title, demonstrating detection. The old interaction test expected the case-study disclosure to become visible after one click although it was already open. The same failure was reproduced against baseline HTML before correcting only the assertion. Visual geometry comparisons exclude the zero-sized asynchronous NEXT-ROUTE-ANNOUNCER framework element; all content elements and visible text match.

Ignored local evidence is under test-results/brand-seo/: before.html, before/after.json, before/after-390.png, before/after-1440.png and generated-metadata.json. Build-generated next-env.d.ts changes were restored. Generated evidence is not intended for commit.

## Schema validation scope

JSON-LD parses successfully. Automated checks verify entity uniqueness, aliases, preserved IDs/data, canonical URLs and graph references. Initial HTML and hydrated output were reviewed. This is local structural/semantic verification, not a claimed external Schema Markup Validator or Google Rich Results Test pass.

Google supports WebSite alternateName and notes that site names are not supported in the Rich Results Test. Use Schema Markup Validator for generic schema checks, and Search Console URL Inspection after deployment.

Reference: https://developers.google.com/search/docs/appearance/site-names
Next.js references: installed node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md and 01-app/02-guides/json-ld.md.

## Intentionally unchanged

H1, hero eyebrow, paragraphs, section headings, footer labels, buttons, navigation labels, images, fonts, CSS, layout, spacing, animations and responsive behavior. Headings remain 1 H1, 8 H2 and 25 H3. No hidden SEO prose, invisible spans, meta keywords, fake reviews, SearchAction or invented business facts. No dependencies changed.

The social image is still a reachable HTTP 200 PNG at 420 x 161 with correct metadata references. It remains a valid image resource, but large-card rendering/cropping on every platform is not guaranteed. Recommend a future dedicated 1200 x 630 Open Graph image, optionally a 1200 x 600 variant for a 2:1 card. Do not replace the visible logo. No assets were changed.

## Deployment recommendation and remaining work

Recommend deploying this version when authorized: build, lint, typecheck, SEO and UI checks pass, and approved visible content/design is preserved. Nothing was committed, pushed or deployed.

After deployment, verify actual served metadata/aliases, canonical, headers, robots, sitemap and error pages; request a homepage recrawl once in Search Console. Monitor impressions, clicks and position for مسبك, مَسبَك and Masbak, with Saudi/device segmentation. Aliases alone do not guarantee ranking for the ambiguous query.

Future separately approved work: substantive About/Services pages, evidence-rich case studies, genuine external brand references and a dedicated social image. Visible copy should remain untouched unless the client explicitly authorizes an editorial update.
