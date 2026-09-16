# SEO indexing investigation and fixes

Audit date: 2026-09-17 (Asia/Riyadh).
Preferred production URL: https://www.masbak.co/
Scope: technical indexing only. No deployment, push, DNS or hosting setting changes. No visible content, design, layout, styling, images or unrelated functionality changed.

## Root cause and evidence

The original source was `app/layout.tsx`: `robots: { index: false, follow: false }`. Git commit `5473860` introduced it; it remained in `a551686`. Next.js renders those values as `<meta name="robots" content="noindex, nofollow">`.

An earlier commit, `70688b5` (Add technical SEO setup), already changed the source to `index: true, follow: true`. At the start of this investigation the working tree was clean. Direct live HTTP requests and a Chromium browser check now confirm that the production homepage also returns `index, follow`, with no X-Robots-Tag response header. Therefore the reported noindex exclusion is not reproducible on today's homepage. A historical crawl is a possible explanation; the Search Console crawl date and URL Inspection details were not available and this is not asserted as a confirmed Google-side diagnosis.

The remaining verified defect was inconsistent canonicalization: Vercel redirects the apex to www, but the live canonical, local metadata, robots sitemap declaration and sitemap entries pointed to the apex. This mismatch was corrected in the local codebase.

## Files inspected

- All tracked project paths and top-level hidden configuration were inventoried. Project source, scripts, archived HTML, content data and public text assets were searched for robots directives, noindex/nofollow, X-Robots-Tag, disallow rules, canonical URLs and dynamic head manipulation.
- `app/layout.tsx`, `app/page.tsx`, `app/robots.txt`, `app/sitemap.xml`; page/component metadata and client effects.
- `components/navigation.tsx`, `components/bot-sequence.tsx`, `components/ui/reveal.tsx`, `components/ui/world-map.tsx`.
- `next.config.ts`, `package.json`, `scripts/preview.mjs`, other project scripts, `.gitignore`, `eslint.config.mjs`, TypeScript configuration and Git history for the root layout.
- `README.md`, previous `SEO-REPORT.md`, `SEO-KEYWORDS.md`, project instructions and archive HTML references.
- Installed Next.js guides and metadata resolvers, plus generated `out/index.html`, error-page HTML, `out/robots.txt`, `out/sitemap.xml` and referenced CSS/JS assets.
- No project `vercel.json`, middleware, proxy, custom response-header configuration or local `.vercel` directory was present. Hosting dashboard settings were not accessible through this repository; actual Vercel behavior was inspected over HTTP.

## Files modified and exact changes

| File | Change |
| --- | --- |
| `app/layout.tsx` | Changed site URL to `https://www.masbak.co/`; derived the existing brand image URL from it. Aligns metadata base, canonical, Open Graph, Twitter image and Organization/WebSite/WebPage JSON-LD URLs and identifiers. Retained explicit index/follow. |
| `app/robots.txt` | Sitemap declaration now uses `https://www.masbak.co/sitemap.xml`; unrestricted crawling retained. |
| `app/sitemap.xml` | The sole homepage location now uses `https://www.masbak.co/`. |
| `next.config.ts` | Added `trailingSlash: true` so Next.js emits the requested root canonical with its trailing slash. Static file URLs remain unchanged; static export retained. |
| `scripts/check-seo.mjs` | Added export regression checks for robots directives, canonical, social/schema URLs, XML validity/namespace, unique sitemap homepage and existence of referenced CSS/JS. |
| `README.md` | Removed stale claim that the preview has noindex/nofollow; documented the canonical and SEO verification command. |
| `SEO-REPORT.md` | Replaced the outdated report and its contradictory apex-domain deployment instructions with this audit. |

The build-generated `next-env.d.ts` change was restored to its original tracked contents. Generated output remains ignored. No dependencies changed.

## Current status: local production export

- Homepage returns HTTP 200 through the static preview.
- Exactly one robots tag: `<meta name="robots" content="index, follow">`.
- Exactly one canonical: `<link rel="canonical" href="https://www.masbak.co/">`.
- Both tags are present without JavaScript and remain correct after hydration.
- No homepage X-Robots-Tag header, no injected restrictive robots metadata, and no source-level indexing block found.
- `robots.txt` returns 200 as text/plain and contains:

```text
User-agent: *
Allow: /

Sitemap: https://www.masbak.co/sitemap.xml
```

This permits the homepage, CSS, JavaScript, fonts, images and all intended public content. There is only one public content route, `/`.

- `sitemap.xml` returns 200 as XML, parses successfully, uses the sitemap namespace and contains exactly one HTTPS www URL: `https://www.masbak.co/`. No duplicate, apex, HTTP, fragment or error-page entries.
- Social metadata and JSON-LD consistently use the www origin. The existing image itself is unchanged.
- Generated Next.js 404/not-found pages correctly retain noindex. These are error pages, not homepage indexing blockers; removing their noindex would be inappropriate.

## Live status and redirects observed during this audit

| Request | Response |
| --- | --- |
| `http://masbak.co/` | 308 to `https://masbak.co/` |
| `https://masbak.co/` | 308 to `https://www.masbak.co/` |
| `https://www.masbak.co/` | 200, robots index/follow, no X-Robots-Tag; canonical still `https://masbak.co` |
| `https://www.masbak.co/robots.txt` | 200; allows crawling, but sitemap declaration still uses apex |
| `https://www.masbak.co/sitemap.xml` | 200; valid-looking XML with the old apex homepage entry |

Both requested alternate URLs already reach the canonical destination permanently; HTTP uses two hops. Existing Vercel redirects were preserved. This is a static export: Next.js runtime redirect/header/proxy rules are unsupported, so none were added. Retain the current apex-to-www hosting redirect on deployment. If hosting changes, that host must provide the same domain redirects; the exported files cannot perform server-side redirects themselves.

## Verification results

- Regression check first failed against the old export on the non-www canonical, demonstrating detection of the existing mismatch.
- Final `npm run build`: passed; `/`, robots.txt, sitemap.xml and framework error pages exported.
- `node scripts/check-seo.mjs`: passed against the fresh export.
- `npm run lint`: passed.
- `npm run typecheck`: passed after the build.
- `git diff --check`: passed (only normal Windows line-ending notices).
- Chromium loaded both local and live homepages, executed JavaScript, and confirmed one index/follow tag with no restrictive response header. Local canonical exactly matches the requested URL; live canonical remains apex as described above.
- Local and live robots, sitemap and brand image requests returned 200 with suitable content types. Export checks confirmed referenced CSS/JS files exist.
- Final source scan found no restrictive production indexing directive or dynamic robots injection. Restrictive terms remain only in explanatory documentation, regression-test assertions and intentional framework error-page output.

## Remaining issues and Search Console readiness

The local project is ready for an authorized deployment. Nothing was deployed or pushed. Production will retain its existing canonical/sitemap mismatch until these changes are deployed.

After deployment, verify that the www homepage returns 200 with index/follow, the exact www canonical and no restrictive X-Robots-Tag; recheck both redirects and the two crawl files. Then submit `https://www.masbak.co/sitemap.xml`, run Search Console's live URL test on `https://www.masbak.co/`, request indexing for that canonical URL and use Validate Fix for the historical noindex issue where available. The apex/HTTP URLs are supposed to remain excluded as redirects; do not try to index them separately.

Today's live page no longer reproduces the historical noindex block, so a live URL Inspection test can already confirm that condition. Full readiness for the requested canonical configuration remains conditional on deployment and post-deployment verification. Search Console history and Google's selected canonical were not inspected; indexing acceptance and timing cannot be guaranteed.

`SEO-KEYWORDS.md` is a historical planning document with apex targets; it is not served or used to generate metadata. Archived HTML and the visible footer's apex link were preserved as requested and do not emit canonical or noindex directives. The footer destination follows the existing permanent redirect.
