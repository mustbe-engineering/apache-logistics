"use client";

import { useRef } from "react";
import { useFlowMask } from "./hero/useFlowMask";
import { useReducedMotion } from "./gsap/useReducedMotion";

export function HeroOverlay() {
  const reduce = useReducedMotion();
  const b1 = useRef<SVGEllipseElement>(null);
  const b2 = useRef<SVGEllipseElement>(null);
  const b3 = useRef<SVGEllipseElement>(null);
  const refs = [b1, b2, b3];
  useFlowMask(refs, reduce);

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="hero-water" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.011"
              numOctaves="3"
              seed="4"
              result="noise"
            >
              {!reduce && (
                <animate
                  attributeName="baseFrequency"
                  values="0.007 0.011;0.011 0.007;0.007 0.011"
                  dur="28s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
          </filter>
          <filter
            id="mask-feather"
            filterUnits="objectBoundingBox"
            x="-0.15"
            y="-0.15"
            width="1.3"
            height="1.3"
          >
            <feGaussianBlur stdDeviation="0.055" />
          </filter>
          <mask id="hero-flow-mask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
            <g filter="url(#mask-feather)">
              <ellipse ref={b1} cx="0.22" cy="0.42" rx="0.275" ry="0.33" fill="black" />
              <ellipse ref={b2} cx="0.62" cy="0.48" rx="0.248" ry="0.303" fill="black" />
              <ellipse ref={b3} cx="0.48" cy="0.32" rx="0.206" ry="0.261" fill="black" />
            </g>
          </mask>
        </defs>
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-nav/[0.08] backdrop-blur-2xl [filter:url(#hero-water)] [mask:url(#hero-flow-mask)] [-webkit-mask:url(#hero-flow-mask)]"
      />
    </>
  );
}
