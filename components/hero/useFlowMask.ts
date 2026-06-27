"use client";

import { useEffect } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";

type Blob = { cx: number; cy: number; rx: number; ry: number };

const paths: Blob[][] = [
  [
    { cx: 0.22, cy: 0.42, rx: 0.275, ry: 0.33 },
    { cx: 0.38, cy: 0.58, rx: 0.22, ry: 0.275 },
  ],
  [
    { cx: 0.62, cy: 0.48, rx: 0.248, ry: 0.303 },
    { cx: 0.78, cy: 0.62, rx: 0.193, ry: 0.248 },
  ],
  [
    { cx: 0.48, cy: 0.32, rx: 0.206, ry: 0.261 },
    { cx: 0.55, cy: 0.72, rx: 0.179, ry: 0.234 },
  ],
];

export function useFlowMask(
  refs: React.RefObject<SVGEllipseElement | null>[],
  reduce: boolean,
) {
  useEffect(() => {
    if (reduce) return;
    const els = refs.map((r) => r.current).filter(Boolean) as SVGEllipseElement[];
    if (els.length !== refs.length) return;
    initGsap();
    const tweens = els.map((el, i) => {
      const [a, b] = paths[i];
      return gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
        .to(el, { attr: a, duration: 16 + i * 3 })
        .to(el, { attr: b, duration: 16 + i * 3 });
    });
    return () => tweens.forEach((t) => t.kill());
  }, [reduce, refs]);
}
