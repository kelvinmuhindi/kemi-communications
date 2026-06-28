"use client";

import { useState } from "react";

// Kenya's national border, built from real constituency-level boundary
// data (union of all constituency polygons, simplified to ~50 points).
// Normalized to this 100x100 viewBox. North is up.
const KENYA_PATH =
  "M 12.26,65.18 L 5.21,61.75 L 5,51.96 L 10.41,43.16 L 13.12,41.68 " +
  "L 12.67,40.56 L 14.89,35.89 L 14.06,30.64 L 9.82,24.73 L 9.9,20.43 " +
  "L 6.57,18.72 L 5.72,15.53 L 16.99,5 L 22.02,5.62 L 22.03,9.19 " +
  "L 23.93,13.51 L 32.62,14.1 L 42.33,20.97 L 45.95,20.55 L 54.41,22.23 " +
  "L 54.93,22.82 L 57.69,18.68 L 65.6,15.01 L 69.47,18.06 L 75.73,17.69 " +
  "L 67.68,27.9 L 67.67,60.24 L 72.7,67.03 L 72.73,69.25 L 66.01,75.87 " +
  "L 65.54,74.63 L 65.45,74.63 L 65.16,74.67 L 60.47,76.94 L 61,79.34 " +
  "L 59.93,82.01 L 58.32,82.54 L 57.72,85.05 L 57.26,84.8 L 56.97,84.85 " +
  "L 57.73,85.62 L 55.7,89.63 L 56.57,90.03 L 53.4,95 L 37.7,84.05 " +
  "L 38.63,82.19 L 38.18,79.9 L 36.59,78.86 L 29.7,75.03 L 16.07,67.34 " +
  "L 12.26,65.18 Z";

type CityPoint = {
  name: string;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "end";
};

const cityPositions: Record<string, CityPoint> = {
  Nairobi: { name: "Nairobi", x: 30.7, y: 64.3, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Mombasa: { name: "Mombasa", x: 55.9, y: 88.7, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Nakuru: { name: "Nakuru", x: 24.2, y: 55.6, labelDx: 4.5, labelDy: -1.5, anchor: "start" },
  Eldoret: { name: "Eldoret", x: 17, y: 48.3, labelDx: 0, labelDy: -4, anchor: "start" },
  Kisumu: { name: "Kisumu", x: 12.6, y: 53.7, labelDx: -4.5, labelDy: 1, anchor: "end" },
  Kisii: { name: "Kisii", x: 12.6, y: 58.9, labelDx: -4.5, labelDy: 3, anchor: "end" },
};

export function KenyaMap({ cities }: { cities: string[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hub = cityPositions["Nairobi"];
  const spokes = cities.filter((c) => c !== "Nairobi");

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <svg
        viewBox="-32 -5 130 110"
        className="w-full"
        role="img"
        aria-label="Map of Kenya showing routes from Nairobi to Mombasa, Nakuru, Eldoret, Kisumu and Kisii"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#FF9700" />
          </marker>
        </defs>

        {/* Kenya border outline */}
        <path
          d={KENYA_PATH}
          fill="#1F1C19"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Route lines from Nairobi to each city */}
        {spokes.map((cityName) => {
          const point = cityPositions[cityName];
          if (!point) return null;
          const isActive = hovered === null || hovered === cityName;
          return (
            <line
              key={cityName}
              x1={hub.x}
              y1={hub.y}
              x2={point.x}
              y2={point.y}
              stroke="#FF9700"
              strokeWidth={hovered === cityName ? 1.1 : 0.7}
              strokeDasharray="2.4 2.2"
              opacity={isActive ? 1 : 0.25}
              markerEnd="url(#arrowhead)"
              style={{ transition: "opacity 150ms, stroke-width 150ms" }}
            />
          );
        })}

        {/* City dots and labels */}
        {cities.map((cityName) => {
          const point = cityPositions[cityName];
          if (!point) return null;
          const isHub = cityName === "Nairobi";
          const isActive = hovered === null || hovered === cityName;

          return (
            <g
              key={cityName}
              onMouseEnter={() => setHovered(cityName)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
              opacity={isActive ? 1 : 0.4}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r={isHub ? 2.6 : 1.8}
                fill={isHub ? "#FF9700" : "#FFFFFF"}
                stroke={isHub ? "#FFFFFF" : "#FF9700"}
                strokeWidth="0.5"
              />
              <text
                x={point.x + point.labelDx}
                y={point.y + point.labelDy}
                fontSize={isHub ? 5 : 4.2}
                fontWeight={isHub ? 800 : 700}
                fill="#FFFFFF"
                textAnchor={point.anchor}
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {cityName.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
