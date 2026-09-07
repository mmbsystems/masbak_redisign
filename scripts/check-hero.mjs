import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
const b = await chromium.launch();
const c = await b.newContext();
const p = await c.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
const results = [];
for (const [width, height] of [
  [1440, 900],
  [1366, 768],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [360, 800],
  [320, 740],
]) {
  await p.setViewportSize({ width, height });
  await p.goto("http://127.0.0.1:3101", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const h = document.querySelector(".hero").getBoundingClientRect(),
      a = document.querySelector(".hero-heading").getBoundingClientRect(),
      s = document.querySelector(".hero-support").getBoundingClientRect(),
      cta = document.querySelector(".hero-actions").getBoundingClientRect();
    return {
      width: innerWidth,
      height: innerHeight,
      heroHeight: h.height,
      overflow: document.documentElement.scrollWidth > innerWidth,
      ctaVisible: cta.bottom < innerHeight,
      columns: innerWidth >= 768 ? a.left >= s.right : s.top >= a.bottom,
      headingFits: document.querySelector("h1").scrollWidth <= a.width + 1,
    };
  });
  results.push(r);
  await p.screenshot({ path: `test-results/refined-hero-${width}.png` });
  assert(
    !r.overflow && r.ctaVisible && r.columns && r.headingFits,
    JSON.stringify(r),
  );
}
await p.setViewportSize({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:3101", { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
const moved = await p.evaluate(() => {
  const svg = document.querySelector(".world-map svg");
  svg.pauseAnimations();
  svg.setCurrentTime(4);
  const dots = [...document.querySelectorAll(".route-particle")];
  const before = dots.map((d) => {
    const m = d.getCTM();
    return [m.e, m.f];
  });
  svg.setCurrentTime(5);
  return dots.map((d, i) => {
    const m = d.getCTM();
    return Math.hypot(m.e - before[i][0], m.f - before[i][1]) > 1;
  });
});
assert.equal(moved.length, 6);
assert(moved.every(Boolean));
const violations = (
  await new AxeBuilder({ page: p })
    .include(".hero")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze()
).violations;
assert.equal(violations.length, 0);
await p.emulateMedia({ reducedMotion: "reduce" });
await p.waitForTimeout(100);
assert.equal(await p.locator(".route-particle").count(), 0);
assert.equal(await p.locator(".world-map path").count(), 6);
assert.deepEqual(errors, []);
console.log(
  JSON.stringify(
    {
      results,
      moved,
      reducedMotion: "PASS",
      axeViolations: violations.length,
      errors,
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  "test-results/hero-refinement-report.json",
  JSON.stringify({ results, moved, violations, errors }, null, 2),
);
await b.close();
