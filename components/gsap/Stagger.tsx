"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className,
  y = 22,
  duration = 0.55,
  stagger = 0.08,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const root = ref.current;
    const show = () => {
      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((item, i) => {
        item.style.setProperty("--i", String(i));
      });
      root.classList.add("is-visible");
      observer.disconnect();
    };
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) show(); },
      { rootMargin: "0px 0px -14% 0px", threshold: 0 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={`stagger ${className ?? ""}`}
      style={
        {
          "--stagger-y": `${y}px`,
          "--stagger-dur": `${duration}s`,
          "--stagger-gap": `${stagger}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
