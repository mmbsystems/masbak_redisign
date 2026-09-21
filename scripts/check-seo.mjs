import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

// Validate the actual export, including metadata without JavaScript execution.
// Run after npm run build. Uses the existing Playwright Chromium installation.
const canonical = "https://www.masbak.co/";
const expectedTitle = "مَسبَك | Masbak — بناء الكيانات والتحويل التشغيلي";
const expectedDescription = "مَسبَك (Masbak) شركة سعودية متخصصة في بناء الكيانات والتحويل التشغيلي والتطوير التنظيمي، وتصميم نماذج التشغيل وبناء الفرق والعمليات وتمكين الكيانات من النمو والاستقلال.";
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
      titles: [...doc.querySelectorAll('title')].map((node) => node.textContent),
      descriptions: [...doc.querySelectorAll('meta[name="description"]')].map((node) => node.content),
      social: Object.fromEntries(['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:locale', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:card', 'twitter:image'].map((key) => [key, [...doc.querySelectorAll(`meta[property="${key}"], meta[name="${key}"]`)].map((node) => node.content)])),
      headings: [1, 2, 3].map((level) => doc.querySelectorAll(`h${level}`).length),
      h1: doc.querySelector('h1')?.textContent,
      sections: Object.fromEntries(['about', 'bot', 'services', 'method', 'work', 'team', 'contact'].map((id) => [id, doc.getElementById(id)?.textContent.trim()])),
      caseCount: doc.querySelectorAll('.case-list article').length,
      peopleCount: doc.querySelectorAll('.people-list article').length,
      stepCount: doc.querySelectorAll('.step-story').length,
      apexLinks: [...doc.querySelectorAll('a[href]')].filter((node) => { try { return new URL(node.getAttribute('href')).hostname === 'masbak.co'; } catch { return false; } }).length,
      keywords: doc.querySelectorAll('meta[name="keywords"]').length,
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
  assert.deepEqual(result.titles, [expectedTitle]);
  assert.deepEqual(result.descriptions, [expectedDescription]);
  for (const prefix of ['og', 'twitter']) {
    assert.deepEqual(result.social[`${prefix}:title`], [expectedTitle]);
    assert.deepEqual(result.social[`${prefix}:description`], [expectedDescription]);
    assert.deepEqual(result.social[`${prefix}:image`], [`${canonical}brand/asset-0.png`]);
  }
  for (const [key, value] of Object.entries({ 'og:url': canonical, 'og:type': 'website', 'og:site_name': 'مَسبَك', 'og:locale': 'ar_SA', 'og:image:alt': 'مَسبَك', 'twitter:card': 'summary_large_image' })) assert.deepEqual(result.social[key], [value]);
  assert.deepEqual(result.headings, [1, 8, 25]);
  assert.equal(result.h1, 'نُهندس الكياناتونُشغّلها.');
  for (const [id, text] of Object.entries(result.sections)) assert.ok(text?.length > 30, `Initial HTML must contain substantive ${id} content`);
  assert.equal(result.caseCount, 6);
  assert.equal(result.peopleCount, 5);
  assert.equal(result.stepCount, 3);
  assert.equal(result.apexLinks, 0);
  assert.equal(result.keywords, 0);
  assert.deepEqual(result.canonical, [canonical], "Exactly one www canonical required");
  assert.deepEqual(result.robots, ["index, follow"], "Exactly one explicit index/follow required");
  assert.ok(result.robots.every((value) => !/noindex|nofollow|\bnone\b/i.test(value)));
  assert.equal(new URL(result.ogUrl).href, canonical);
  assert.equal(result.schema.length, 1);
  const graph = result.schema[0]['@graph'];
  assert.equal(result.schema[0]['@context'], 'https://schema.org');
  assert.deepEqual(graph.map((entity) => entity['@type']).sort(), ['Organization', 'WebPage', 'WebSite']);
  const org = graph.find((entity) => entity['@type'] === 'Organization');
  const website = graph.find((entity) => entity['@type'] === 'WebSite');
  const webpage = graph.find((entity) => entity['@type'] === 'WebPage');
  for (const entity of [org, website]) {
    assert.equal(entity.name, 'مَسبَك');
    assert.deepEqual(entity.alternateName, ['مسبك', 'Masbak']);
  }
  assert.equal(org['@id'], `${canonical}#organization`);
  assert.equal(website['@id'], `${canonical}#website`);
  assert.equal(webpage['@id'], `${canonical}#webpage`);
  assert.equal(org.description, 'مَسبَك شركة بناء وتحويل تشغيلي سعودية. نصمم نموذج العمل، نبني الفريق والأنظمة والعمليات، ونطلق التشغيل ثم ننقل كيانًا قادرًا على الاستمرار والنمو.');
  assert.equal(org.email, 'm.alhamed@masbak.sa');
  assert.deepEqual(org.sameAs, ['https://www.linkedin.com/company/masbak/']);
  assert.equal(website.publisher['@id'], org['@id']);
  assert.equal(webpage.isPartOf['@id'], website['@id']);
  assert.equal(webpage.about['@id'], org['@id']);
  assert.equal(website.inLanguage, 'ar');
  assert.equal(webpage.inLanguage, 'ar');
  assert.equal(webpage.name, expectedTitle);
  assert.equal(webpage.description, expectedDescription);
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
  for (const errorPath of ['out/404.html', 'out/_not-found/index.html']) {
    const errorHtml = await fs.readFile(errorPath, 'utf8');
    const error = await page.evaluate((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return { robots: [...doc.querySelectorAll('meta[name="robots"]')].map((node) => node.content), canonicalCount: doc.querySelectorAll('link[rel="canonical"]').length, schemaCount: doc.querySelectorAll('script[type="application/ld+json"]').length, socialCount: doc.querySelectorAll('meta[property="og:url"]').length };
    }, errorHtml);
    assert.deepEqual(error.robots, ['noindex'], `${errorPath} retains only framework noindex`);
    assert.equal(error.canonicalCount, 0);
    assert.equal(error.schemaCount, 0);
    assert.equal(error.socialCount, 0);
  }
  console.log("SEO export checks passed: unique metadata, aliases and connected entities, unchanged headings and initial content, www URLs, crawl files, assets and isolated 404 metadata.");
} finally {
  await browser.close();
}
