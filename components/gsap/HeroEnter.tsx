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
    const off = bindCtaHover(ref.current.querySelector("[data-hero-cta]"));
    return () => {
      tl.kill();
      off();
    };
  }, [reduce]);

  return <div ref={ref} className="h-full">{children}</div>;
}

function runHeroTimeline(root: HTMLElement) {
  const copy = root.querySelector("[data-hero-copy]");
  const media = root.querySelector("[data-hero-media]");
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (copy) tl.from(copy.children, { y: 28, opacity: 0, stagger: 0.1, duration: 0.62 });
  if (media) tl.from(media, { x: 32, opacity: 0, duration: 0.72 }, "-=0.38");
  return tl;
}

function bindCtaHover(cta: Element | null) {
  if (!cta) return () => undefined;
  gsap.set(cta, { transformOrigin: "center" });
  cta.addEventListener("mouseenter", onIn);
  cta.addEventListener("mouseleave", onOut);
  return () => {
    cta.removeEventListener("mouseenter", onIn);
    cta.removeEventListener("mouseleave", onOut);
  };
}

function onIn(e: Event) {
  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.22, ease: "power2.out" });
}

function onOut(e: Event) {
  gsap.to(e.currentTarget, { scale: 1, duration: 0.22, ease: "power2.out" });
}
