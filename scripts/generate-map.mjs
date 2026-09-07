import fs from "node:fs";
import DottedMap from "dotted-map";
const map = new DottedMap({ height: 80, grid: "diagonal" });
const svg = map.getSVG({
  radius: 0.19,
  color: "#c5d0c738",
  backgroundColor: "transparent",
});
fs.writeFileSync("public/world-dots.svg", svg);
const origin = map.getPin({ lat: 24.7136, lng: 46.6753 });
const cities = [
  ["London", 51.5074, -0.1278],
  ["New York", 40.7128, -74.006],
  ["Singapore", 1.3521, 103.8198],
  ["Dubai", 25.2048, 55.2708],
  ["Paris", 48.8566, 2.3522],
  ["Johannesburg", -26.2041, 28.0473],
];
const routes = cities.map(([name, lat, lng]) => {
  const p = map.getPin({ lat, lng });
  return {
    name,
    x: p.x,
    y: p.y,
    path: `M ${origin.x} ${origin.y} Q ${(origin.x + p.x) / 2} ${Math.min(origin.y, p.y) - Math.max(3, Math.abs(origin.x - p.x) * 0.22)} ${p.x} ${p.y}`,
  };
});
const view = svg
  .match(/viewBox="([^"]+)"/)[1]
  .split(" ")
  .map(Number);
fs.writeFileSync(
  "lib/map-geometry.json",
  JSON.stringify(
    {
      width: view[2],
      height: view[3],
      origin: { x: origin.x, y: origin.y },
      routes,
    },
    null,
    2,
  ),
);
console.log({ view, origin, routes: routes.length });
