"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

type HeroEnterProps = { children: React.ReactNode };

export function HeroEnter({ children }: HeroEnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    initGsap();
    const tl = runHeroTimeline(ref.current);
    return () => {
      tl.kill();
    };
  }, [reduce]);

  return <div ref={ref} className="h-full">{children}</div>;
}

function runHeroTimeline(root: HTMLElement) {
  const copy = root.querySelector("[data-hero-copy]");
  const media = root.querySelector("[data-hero-media]");
  const cta = root.querySelector("[data-hero-cta]");
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (copy) {
    const copyChildren = Array.from(copy.children).filter((child) => child !== cta);
    tl.from(copyChildren, { y: 28, opacity: 0, stagger: 0.1, duration: 0.62 });
  }
  if (cta) tl.from(cta, { opacity: 0, duration: 0.45 }, "-=0.15");
  if (media) tl.from(media, { x: 32, opacity: 0, duration: 0.72 }, "-=0.38");
  return tl;
}
