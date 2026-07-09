"use client";

import { useLayoutEffect, useRef } from "react";
import type { GsapCore } from "@/lib/gsapCore";
import { loadGsap } from "@/lib/gsapCore";

type GsapTimeline = ReturnType<GsapCore["gsap"]["timeline"]>;

type HeroEnterProps = { children: React.ReactNode };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function runHeroTimeline(root: HTMLElement, gsap: GsapCore["gsap"]) {
  const copy = root.querySelector("[data-hero-copy]");
  const media = root.querySelector("[data-hero-media]");
  const scrims = root.querySelectorAll("[data-hero-scrim]");
  const cta = root.querySelector("[data-hero-cta]");
  const lead = copy?.querySelector(".hero-lead");
  if (media) gsap.set(media, { scale: 1.04 });
  if (scrims.length) gsap.set(scrims, { opacity: 0 });
  if (lead) gsap.set(lead, { opacity: 0, y: 26 });
  if (cta) gsap.set(cta, { opacity: 0, y: 12 });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
  if (media) tl.to(media, { scale: 1, duration: 1.05, ease: "power2.out" });
  if (scrims.length) tl.to(scrims, { opacity: 1, duration: 0.72, stagger: 0.06 }, "-=0.78");
  if (lead) tl.to(lead, { opacity: 1, y: 0, duration: 0.62 }, "-=0.62");
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.48, ease: "power2.out" }, "-=0.18");
  return tl;
}

export function HeroEnter({ children }: HeroEnterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const root = ref.current;
    root.dataset.heroAnimate = "";
    let tl: GsapTimeline | undefined;
    let cancelled = false;
    void loadGsap().then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      tl = runHeroTimeline(root, gsap);
      delete root.dataset.heroAnimate;
    });
    return () => {
      cancelled = true;
      tl?.kill();
      delete root.dataset.heroAnimate;
    };
  }, []);

  return <div ref={ref} className="h-full">{children}</div>;
}
