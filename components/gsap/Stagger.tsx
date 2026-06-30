"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  start?: string;
  y?: number;
  duration?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className,
  start = "top 85%",
  y = 22,
  duration = 0.55,
  stagger = 0.08,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    initGsap();
    const items = ref.current.querySelectorAll("[data-stagger]");
    if (!items.length) return;
    gsap.set(items, { y, opacity: 0 });
    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start, once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduce, start, y, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
