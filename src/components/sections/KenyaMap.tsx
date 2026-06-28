"use client";

import { useState } from "react";

// Simplified Kenya border outline, traced from real lat/lon coordinates
// and normalized to this 100x100 viewBox. Not survey-precision, but
// proportionally accurate and recognizable as Kenya's actual shape.
const KENYA_BORDER = [
  [8, 8],
  [34.6, 9.5],
  [45, 18.1],
  [72, 17.2],
  [72, 31.6],
  [77.4, 65],
  [72, 72.2],
  [59.4, 92],
  [55.8, 91.8],
  [45, 80.3],
  [42.2, 76.7],
  [35.9, 63.2],
  [26, 58.7],
  [8.9, 58.7],
  [8.9, 50.5],
  [8.9, 45.1],
  [8.9, 40.6],
  [13.4, 31.6],
  [8.9, 18.1],
  [8, 8],
];

const KENYA_PATH =
  "M " + KENYA_BORDER.map(([x, y]) => `${x},${y}`).join(" L ") + " Z";

type CityPoint = {
  name: string;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "end";
};

const cityPositions: Record<string, CityPoint> = {
  Nairobi: { name: "Nairobi", x: 34.3, y: 61.2, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Mombasa: { name: "Mombasa", x: 60, y: 86.1, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Nakuru: { name: "Nakuru", x: 27.6, y: 52.4, labelDx: 4.5, labelDy: -1.5, anchor: "start" },
  Eldoret: { name: "Eldoret", x: 20.3, y: 41, labelDx: 0, labelDy: -4, anchor: "start" },
  Kisumu: { name: "Kisumu", x: 13, y: 50.5, labelDx: -4.5, labelDy: 1, anchor: "end" },
  Kisii: { name: "Kisii", x: 14, y: 60, labelDx: -4.5, labelDy: 1, anchor: "end" },
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

        {/* Kenya border outline */}
        <path
          d={KENYA_PATH}
          fill="#1F1C19"
          stroke="#4A453F"
          strokeWidth="0.7"
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
