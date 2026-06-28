"use client";

import { useState } from "react";

// Simplified, stylized Kenya outline (not survey-accurate, but recognizable).
// Coordinates below are roughly proportional to each city's real-world
// position within Kenya, normalized to this viewBox.
const KENYA_OUTLINE =
  "M 30,8 L 55,5 L 78,12 L 90,22 L 94,38 L 92,55 L 88,72 L 82,86 L 70,94 L 55,92 L 42,86 L 32,78 L 22,68 L 14,54 L 10,38 L 14,22 L 22,12 Z";

type CityPoint = {
  name: string;
  x: number;
  y: number;
};

const cityPositions: Record<string, CityPoint> = {
  Nairobi: { name: "Nairobi", x: 44, y: 43 },
  Mombasa: { name: "Mombasa", x: 80, y: 82 },
  Nakuru: { name: "Nakuru", x: 35, y: 30 },
  Eldoret: { name: "Eldoret", x: 25, y: 18 },
  Kisumu: { name: "Kisumu", x: 18, y: 27 },
  Kisii: { name: "Kisii", x: 18, y: 35 },
};

export function KenyaMap({ cities }: { cities: string[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hub = cityPositions["Nairobi"];
  const spokes = cities.filter((c) => c !== "Nairobi");

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        role="img"
        aria-label="Map of Kenya showing routes from Nairobi to Mombasa, Nakuru, Eldoret, Kisumu and Kisii"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="4.5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#FF9700" />
          </marker>
        </defs>

        {/* Kenya outline */}
        <path
          d={KENYA_OUTLINE}
          fill="#1F1C19"
          stroke="#3A3633"
          strokeWidth="0.6"
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
              strokeWidth={hovered === cityName ? 1 : 0.6}
              strokeDasharray="2.2 2"
              opacity={isActive ? 1 : 0.25}
              markerEnd="url(#arrowhead)"
              style={{ transition: "opacity 150ms, stroke-width 150ms" }}
            />
          );
        })}

        {/* City dots + labels */}
        {cities.map((cityName) => {
          const point = cityPositions[cityName];
          if (!point) return null;
          const isHub = cityName === "Nairobi";
          const isActive = hovered === null || hovered === cityName;

          // Label offset direction varies per point to avoid overlapping the map edge
          const labelOffsets: Record<
            string,
            { dx: number; dy: number; anchor: "start" | "end" }
          > = {
            Nairobi: { dx: 3.5, dy: 1, anchor: "start" },
            Mombasa: { dx: -3.5, dy: 1, anchor: "end" },
            Nakuru: { dx: 3.5, dy: -1.5, anchor: "start" },
            Eldoret: { dx: -3.5, dy: -1.5, anchor: "end" },
            Kisumu: { dx: -3.5, dy: 1, anchor: "end" },
            Kisii: { dx: -3.5, dy: 3, anchor: "end" },
          };
          const offset = labelOffsets[cityName] || { dx: 3, dy: 0, anchor: "start" };

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
                r={isHub ? 2.4 : 1.6}
                fill={isHub ? "#FF9700" : "#FFFFFF"}
                stroke={isHub ? "#FFFFFF" : "#FF9700"}
                strokeWidth="0.5"
              />
              <text
                x={point.x + offset.dx}
                y={point.y + offset.dy}
                fontSize={isHub ? 4.4 : 3.6}
                fontWeight={isHub ? 800 : 700}
                fill="#FFFFFF"
                textAnchor={offset.anchor}
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
