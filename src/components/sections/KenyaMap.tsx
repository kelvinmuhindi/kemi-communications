"use client";

import { useState } from "react";

// Kenya's national border, traced as a ~57-point set of real-world
// lat/lon boundary coordinates and normalized to this 100x100 viewBox.
// Independently sourced from Kenya's actual international borders
// (Ethiopia, Somalia, Tanzania, Uganda, South Sudan) and Indian Ocean
// coastline, not copied from any single copyrighted map.
const KENYA_PATH =
  "M 10,10 L 15.16,11.46 L 22.04,11.03 L 27.63,10 L 31.51,11.89 " +
  "L 35.38,11.46 L 39.25,13.18 L 41.83,15.76 L 45.27,18.77 L 50.43,18.34 " +
  "L 54.3,15.76 L 58.6,18.77 L 63.33,19.2 L 67.2,16.19 L 70.65,19.2 " +
  "L 70.65,25.23 L 71.08,31.68 L 70.65,38.13 L 72.8,45.01 L 74.09,51.46 " +
  "L 74.52,57.91 L 75.81,63.94 L 71.94,67.81 L 69.78,71.25 L 66.34,74.69 " +
  "L 63.33,78.13 L 60.32,81.14 L 58.6,82.86 L 57.74,84.58 L 58.6,86.3 " +
  "L 59.03,88.02 L 56.45,84.58 L 55.59,86.73 L 54.3,88.45 L 55.59,90 " +
  "L 51.29,87.59 L 46.99,83.72 L 43.12,78.99 L 41.4,75.98 L 38.39,74.26 " +
  "L 35.38,75.12 L 28.92,68.67 L 24.19,63.08 L 19.89,58.77 L 15.59,58.34 " +
  "L 11.72,58.34 L 10.86,53.61 L 10.86,48.88 L 11.29,44.58 L 10.86,40.71 " +
  "L 12.15,36.41 L 14.3,32.54 L 12.58,28.24 L 10.86,23.94 L 10.43,19.2 " +
  "L 10.86,14.47 L 10,10 Z";

type CityPoint = {
  name: string;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "end";
};

const cityPositions: Record<string, CityPoint> = {
  Nairobi: { name: "Nairobi", x: 35.1, y: 60.8, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Mombasa: { name: "Mombasa", x: 59.6, y: 84.5, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Nakuru: { name: "Nakuru", x: 28.8, y: 52.4, labelDx: 4.5, labelDy: -1.5, anchor: "start" },
  Eldoret: { name: "Eldoret", x: 21.8, y: 45.3, labelDx: 0, labelDy: -4, anchor: "start" },
  Kisumu: { name: "Kisumu", x: 14, y: 50.5, labelDx: -4.5, labelDy: 1, anchor: "end" },
  Kisii: { name: "Kisii", x: 15, y: 60, labelDx: -4.5, labelDy: 1, anchor: "end" },
};

export function KenyaMap({ cities }: { cities: string[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hub = cityPositions["Nairobi"];
  const spokes = cities.filter((c) => c !== "Nairobi");

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <svg
        viewBox="-25 0 125 100"
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

        {/* Kenya border outline, white stroke as requested */}
        <path
          d={KENYA_PATH}
          fill="#1F1C19"
          stroke="#FFFFFF"
          strokeWidth="0.9"
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
