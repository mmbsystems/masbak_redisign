import fs from "node:fs";
const html = fs.readFileSync("archive/index.html", "utf8");
fs.writeFileSync(
  "archive/original.html",
  html.replaceAll("hello@masbak.co", "m.alhamed@masbak.sa"),
);
const images = [
  ...html.matchAll(
    /<img[^>]+src="data:image\/(\w+);base64,([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g,
  ),
];
const assets = images.map((m, i) => {
  const file = `/brand/asset-${i}.${m[1] === "jpeg" ? "jpg" : m[1]}`;
  fs.writeFileSync(`public${file}`, Buffer.from(m[2], "base64"));
  return { src: file, alt: m[3] };
});
fs.writeFileSync("lib/original-assets.json", JSON.stringify(assets, null, 2));
const sections = [
  ...html.matchAll(/<section[^>]*id="(work|team)"[\s\S]*?<\/section>/g),
];
const strip = (s) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const work = sections.find((m) => m[1] === "work")?.[0] || "";
const cases = [
  ...work.matchAll(/<div class="case">([\s\S]*?)(?=<div class="case">|$)/g),
].map((m) => ({
  title: strip(m[1].match(/<h3>(.*?)<\/h3>/)?.[1] || ""),
  description: strip(m[1].match(/<p>([\s\S]*?)<\/p>/)?.[1] || ""),
}));
const team = sections.find((m) => m[1] === "team")?.[0] || "";
const people = [
  ...team.matchAll(/<div class="member">([\s\S]*?)(?=<div class="member">|$)/g),
].map((m) => ({
  name: strip(m[1].match(/<h3>(.*?)<\/h3>/)?.[1] || ""),
  role: strip(m[1].match(/<div class="role">(.*?)<\/div>/)?.[1] || ""),
  bio: strip(m[1].match(/<p>([\s\S]*?)<\/p>/)?.[1] || ""),
}));
fs.writeFileSync(
  "lib/source-content.json",
  JSON.stringify({ cases, people }, null, 2),
);
console.log(assets.map((a) => ({ alt: a.alt, src: a.src })));
console.log({ cases: cases.length, people: people.length });
