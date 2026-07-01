"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";
import { gsap, initGsap } from "@/lib/gsapCore";

export function SectionDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (reduce || !section || !bg) return;
    initGsap();
    const tween = gsap.fromTo(bg, { yPercent: -12 }, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      aria-hidden
      className="relative min-h-[min(100dvh,56rem)] overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/crossing-paths.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
