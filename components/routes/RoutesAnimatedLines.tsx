"use client";

import { routeDots, routeLabels, routePaths } from "@/lib/routesMap";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";
import { useRouteLinesAnim } from "./useRouteLinesAnim";

type Props = { className?: string };

export function RoutesAnimatedLines({ className = "" }: Props) {
  const reduce = useReducedMotion();
  const svgRef = useRouteLinesAnim(reduce);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1451.45 596.8"
      preserveAspectRatio="xMinYMax meet"
      aria-label="Mapa de rutas Apache Logistics"
      className={className}
    >
      {routePaths.map((path) => (
        <path
          key={path.d}
          data-route-line
          data-route-group={path.group}
          d={path.d}
          className="routes-map__line"
        />
      ))}
      {routeDots.map((dot) => (
        <circle key={`${dot.cx}-${dot.cy}`} data-route-dot className="routes-map__dot" {...dot} r={6.24} />
      ))}
      {routeLabels.map((label) => (
        <text
          key={label.text}
          data-route-label
          x={label.x}
          y={label.y}
          className="routes-map__label"
        >
          {label.text}
        </text>
      ))}
    </svg>
  );
}
