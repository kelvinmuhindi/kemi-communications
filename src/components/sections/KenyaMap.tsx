"use client";

import { useState } from "react";

// Kenya's national border, traced from real lat/lon landmarks (the
// Kenya/Ethiopia/Somalia tripoint in the NE, the Indian Ocean coastline
// down to Mombasa, the Tanzania border, and the Lake Victoria area in
// the west) and normalized to this 100x100 viewBox.
const KENYA_PATH =
  "M 1.3,0 L 13.8,1.6 L 26.3,0 L 37.5,4.3 L 48.7,2.2 L 57.5,7.5 " +
  "L 67.5,10.8 L 76.3,7 L 86.2,11.8 L 92.5,12.9 L 88.8,22.6 L 88.8,33.3 " +
  "L 91.3,44.1 L 93.8,54.8 L 95.6,64.5 L 88.8,71 L 83.8,76.3 L 78.8,81.7 " +
  "L 73.7,86 L 71.3,91.4 L 70,95.7 L 67.5,98.9 L 66.3,99.8 L 60,95.7 " +
  "L 52.5,89.2 L 46.3,82.8 L 38.8,80.6 L 26.3,71 L 17.5,65.6 L 8.8,60.2 " +
  "L 1.3,60.2 L 1.3,57 L 0.6,51.6 L 1.3,46.2 L 2.5,39.8 L 3.8,33.3 " +
  "L 7.5,28 L 5,20.4 L 2.5,14 L 1.3,7.5 L 1.3,0 Z";

type CityPoint = {
  name: string;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "end";
};

const cityPositions: Record<string, CityPoint> = {
  Nairobi: { name: "Nairobi", x: 36.5, y: 63.3, labelDx: 4.5, labelDy: 1, anchor: "start" },
  Mombasa: { name: "Mombasa", x: 72.1, y: 92.9, labelDx: -4.5, labelDy: -2, anchor: "end" },
  Nakuru: { name: "Nakuru", x: 27.2, y: 52.7, labelDx: 4.5, labelDy: -1.5, anchor: "start" },
  Eldoret: { name: "Eldoret", x: 17.1, y: 43.9, labelDx: 0, labelDy: -4, anchor: "start" },
  Kisumu: { name: "Kisumu", x: 10.9, y: 50.4, labelDx: -4.5, labelDy: 1, anchor: "end" },
  Kisii: { name: "Kisii", x: 10.8, y: 56.8, labelDx: -4.5, labelDy: 3, anchor: "end" },
};

export function KenyaMap({ cities }: { cities: string[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hub = cityPositions["Nairobi"];
  const spokes = cities.filter((c) => c !== "Nairobi");

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <svg
        viewBox="-30 -8 138 118"
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
