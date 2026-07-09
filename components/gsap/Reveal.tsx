"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
};

export function Reveal({ children, className, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const show = () => {
      el.classList.add("is-visible");
      observer.disconnect();
    };
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) show(); },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
