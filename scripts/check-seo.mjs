import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

// Validate the actual export, including metadata without JavaScript execution.
// Run after npm run build. Uses the existing Playwright Chromium installation.
const canonical = "https://www.masbak.co/";
const html = await fs.readFile("out/index.html", "utf8");
const robots = await fs.readFile("out/robots.txt", "utf8");
const sitemap = await fs.readFile("out/sitemap.xml", "utf8");
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const result = await page.evaluate(({ html, sitemap }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const xml = parser.parseFromString(sitemap, "application/xml");
    return {
      robots: [...doc.querySelectorAll('meta[name="robots"], meta[name="googlebot"]')]
        .map((node) => node.content),
      canonical: [...doc.querySelectorAll('link[rel="canonical"]')]
        .map((node) => node.getAttribute("href")),
      ogUrl: doc.querySelector('meta[property="og:url"]')?.content,
      schema: [...doc.querySelectorAll('script[type="application/ld+json"]')]
        .map((node) => JSON.parse(node.textContent)),
      xmlError: xml.querySelector("parsererror")?.textContent,
      namespace: xml.documentElement.namespaceURI,
      urls: [...xml.querySelectorAll("urlset > url > loc")].map((node) => node.textContent),
      assets: [...doc.querySelectorAll('script[src], link[rel="stylesheet"]')]
        .map((node) => node.getAttribute("src") || node.getAttribute("href")),
    };
  }, { html, sitemap });
  assert.deepEqual(result.canonical, [canonical], "Exactly one www canonical required");
  assert.ok(result.robots.includes("index, follow"), "Explicit index/follow required");
  assert.ok(result.robots.every((value) => !/noindex|nofollow|\bnone\b/i.test(value)));
  assert.equal(new URL(result.ogUrl).href, canonical);
  assert.equal(result.schema.length, 1);
  for (const entity of result.schema[0]["@graph"]) {
    assert.equal(entity.url, canonical);
    assert.ok(entity["@id"].startsWith(canonical));
    if (entity.logo) assert.ok(entity.logo.startsWith(canonical));
  }
  assert.match(robots, /^User-agent: \*\s*\nAllow: \/\s*\n/m);
  assert.doesNotMatch(robots, /^(?:Disallow:\s*\S|Noindex:)/im);
  assert.match(robots, /^Sitemap: https:\/\/www\.masbak\.co\/sitemap\.xml\s*$/m);
  assert.equal(result.xmlError, undefined, "Sitemap must parse as XML");
  assert.equal(result.namespace, "http://www.sitemaps.org/schemas/sitemap/0.9");
  assert.deepEqual(result.urls, [canonical], "Only the canonical homepage belongs in the sitemap");
  assert.ok(result.assets.length > 0);
  for (const asset of result.assets) {
    await fs.access(`out${new URL(asset, canonical).pathname}`);
  }
  console.log("SEO export checks passed: robots, canonical, social/schema URLs, sitemap XML and CSS/JS assets.");
} finally {
  await browser.close();
}
