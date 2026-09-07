"use client";
import { useSyncExternalStore } from "react";
import geometry from "@/lib/map-geometry.json";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => true;

export function WorldMap({ lineColor = "#D7A53E" }: { lineColor?: string }) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  return (
    <div className="world-map" aria-hidden="true">
      <svg viewBox={`0 0 ${geometry.width} ${geometry.height}`} fill="none">
        <image
          href="/world-dots.svg"
          width={geometry.width}
          height={geometry.height}
        />
        {geometry.routes.map((route, i) => (
          <g key={route.name}>
            <path
              d={route.path}
              stroke={lineColor}
              strokeWidth="0.14"
              opacity="0.5"
            />
            <circle
              cx={route.x}
              cy={route.y}
              r="0.34"
              fill={lineColor}
              opacity="0.8"
            />
            {reduced === false && (
              <circle
                className="route-particle"
                r="0.32"
                fill={lineColor}
                opacity="0"
              >
                <animateMotion
                  path={route.path}
                  dur={`${3.8 + i * 0.38}s`}
                  begin={`${i * 0.65}s`}
                  repeatCount="indefinite"
                  calcMode="paced"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.88;1"
                  dur={`${3.8 + i * 0.38}s`}
                  begin={`${i * 0.65}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}
        <circle
          cx={geometry.origin.x}
          cy={geometry.origin.y}
          r="1.2"
          stroke={lineColor}
          strokeWidth="0.16"
        />
        <circle
          cx={geometry.origin.x}
          cy={geometry.origin.y}
          r="0.5"
          fill={lineColor}
        />
        <text
          x={geometry.origin.x + 2}
          y={geometry.origin.y + 2.5}
          fill="#EDE9E4"
          fontSize="1.5"
          fontFamily="Arial"
          direction="ltr"
        >
          RIYADH
        </text>
      </svg>
    </div>
  );
}
