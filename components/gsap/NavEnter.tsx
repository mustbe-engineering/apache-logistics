"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

export function NavEnter({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"header">) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    initGsap();
    const tween = gsap.from(ref.current, { y: -64, opacity: 0, duration: 0.55, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [reduce]);

  return (
    <header ref={ref} className={className} {...rest}>
      {children}
    </header>
  );
}
