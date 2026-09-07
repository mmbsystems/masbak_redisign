import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:3101", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
fs.mkdirSync("test-results", { recursive: true });
const results = [];
for (const width of [320, 360, 375, 390, 412, 430, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
  await page.waitForTimeout(150);
  results.push(
    await page.evaluate(() => ({
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      headline:
        document.querySelector("h1").getBoundingClientRect().bottom <
        innerHeight,
      cta:
        document.querySelector(".hero-actions").getBoundingClientRect().bottom <
        innerHeight,
    })),
  );
  if ([390, 1440].includes(width))
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "فتح القائمة" }).click();
const menuOpen = await page.locator("#mobile-navigation").isVisible();
await page.keyboard.press("Escape");
const menuClosed = await page.locator("#mobile-navigation").isHidden();
const a11y = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
const reduced = await page.evaluate(
  () => getComputedStyle(document.documentElement).scrollBehavior,
);
await page.setViewportSize({ width: 1440, height: 1000 });
const desktopA11y = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const anchors = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="#"]')]
    .filter((a) => !document.getElementById(a.getAttribute("href").slice(1)))
    .map((a) => a.getAttribute("href")),
);
const report = {
  results,
  menuOpen,
  menuClosed,
  reduced,
  anchors,
  errors,
  violations: [...a11y.violations, ...desktopA11y.violations].map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  })),
};
fs.writeFileSync("test-results/report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (
  results.some((r) => r.overflow || !r.headline || !r.cta) ||
  report.violations.length ||
  errors.length ||
  anchors.length ||
  !menuOpen ||
  !menuClosed
)
  process.exitCode = 1;


