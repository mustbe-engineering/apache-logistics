"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotionState } from "./useReducedMotion";

type HeroEnterProps = { children: React.ReactNode };

export function HeroEnter({ children }: HeroEnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduce, ready } = useReducedMotionState();

  useLayoutEffect(() => {
    if (!ready || reduce || !ref.current) return;
    initGsap();
    const tl = runHeroTimeline(ref.current);
    return () => { tl.kill(); };
  }, [reduce, ready]);

  return <div ref={ref} className="h-full">{children}</div>;
}

function runHeroTimeline(root: HTMLElement) {
  const copy = root.querySelector("[data-hero-copy]");
  const media = root.querySelector("[data-hero-media]");
  const scrims = root.querySelectorAll("[data-hero-scrim]");
  const cta = root.querySelector("[data-hero-cta]");
  const lead = copy?.querySelector(".hero-lead");

  if (media) gsap.set(media, { scale: 1.04 });
  if (scrims.length) gsap.set(scrims, { autoAlpha: 0 });
  if (lead) gsap.set(lead, { opacity: 0, y: 26 });
  if (cta) gsap.set(cta, { opacity: 0, y: 12 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
  if (media) tl.to(media, { scale: 1, duration: 1.05, ease: "power2.out" });
  if (scrims.length) tl.to(scrims, { autoAlpha: 1, duration: 0.72, stagger: 0.06 }, "-=0.78");
  if (lead) tl.to(lead, { opacity: 1, y: 0, duration: 0.62 }, "-=0.62");
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.48, ease: "power2.out" }, "-=0.18");
  return tl;
}
