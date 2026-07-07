"use client";

import { routeDots, routeLabels, routePaths } from "@/lib/routesMap";
import { useReducedMotionState } from "@/components/gsap/useReducedMotion";
import { useRouteLinesAnim } from "./useRouteLinesAnim";

type Props = { className?: string };

function RouteDot({ cx, cy, always }: { cx: number; cy: number; always?: boolean }) {
  return (
    <g data-route-dot data-route-dot-static={always ? "" : undefined} transform={`translate(${cx}, ${cy})`}>
      <circle className="routes-map__dot-ring" r={6.24} />
      <circle className="routes-map__dot-ring routes-map__dot-ring--alt" r={6.24} />
      <circle className="routes-map__dot-core" r={6.24} />
    </g>
  );
}

export function RoutesAnimatedLines({ className = "" }: Props) {
  const { reduce, ready } = useReducedMotionState();
  const svgRef = useRouteLinesAnim(reduce, ready);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1451.45 596.8"
      preserveAspectRatio="xMinYMax meet"
      aria-label="Mapa de rutas Apache Logistics"
      className={className}
    >
      <defs>
        {routePaths.map((path, i) => (
          <mask key={`mask-${i}`} id={`route-mask-${i}`} maskUnits="userSpaceOnUse">
            <rect width="1451.45" height="596.8" fill="black" />
            <path
              data-route-mask
              data-route-group={path.group}
              d={path.d}
              fill="none"
              stroke="white"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </mask>
        ))}
      </defs>
      {routePaths.map((path, i) => (
        <path
          key={path.d}
          data-route-line
          data-route-group={path.group}
          d={path.d}
          mask={`url(#route-mask-${i})`}
          className="routes-map__line"
        />
      ))}
      {routeDots.map((dot) => (
        <RouteDot key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} always={"always" in dot} />
      ))}
      {routeLabels.map((label) => (
        <text
          key={label.text}
          data-route-label
          data-route-label-static={"always" in label ? "" : undefined}
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
