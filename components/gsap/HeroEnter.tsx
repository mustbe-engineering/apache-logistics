"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

type HeroEnterProps = { children: React.ReactNode };

export function HeroEnter({ children }: HeroEnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
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
  const scrims = root.querySelectorAll("[data-hero-scrim]");
  const cta = root.querySelector("[data-hero-cta]");
  const pills = root.querySelectorAll(".hero-pill");

  let copyBlocks: Element[] = [];
  if (copy) {
    copyBlocks = Array.from(copy.children).filter(
      (child) => child !== cta && !child.classList.contains("hero-pills"),
    );
  }

  if (media) gsap.set(media, { autoAlpha: 0, scale: 1.04 });
  if (scrims.length) gsap.set(scrims, { autoAlpha: 0 });
  if (copyBlocks.length) gsap.set(copyBlocks, { autoAlpha: 0, y: 26 });
  if (pills.length) gsap.set(pills, { autoAlpha: 0, y: 14 });
  if (cta) gsap.set(cta, { autoAlpha: 0, y: 12 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.1,
  });

  if (media) {
    tl.to(media, { autoAlpha: 1, scale: 1, duration: 1.05, ease: "power2.out" });
  }

  if (scrims.length) {
    tl.to(scrims, { autoAlpha: 1, duration: 0.72, stagger: 0.06 }, "-=0.78");
  }

  if (copyBlocks.length) {
    tl.to(copyBlocks, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.09 }, "-=0.62");
  }

  if (pills.length) {
    tl.to(pills, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.06 }, "-=0.28");
  }

  if (cta) {
    tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" }, "-=0.18");
  }

  return tl;
}
