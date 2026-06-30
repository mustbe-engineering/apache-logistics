"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./gsap/useReducedMotion";

type StatCounterProps = { value: string; label: string };

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDataElement>(null);
  const reduce = useReducedMotion();
  const parsed = parseStat(value);

  useEffect(() => {
    if (!ref.current || !parsed) return;
    if (reduce) {
      ref.current.textContent = value;
      return;
    }
    initGsap();
    const tween = runCount(ref.current, parsed.target, parsed.suffix);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, reduce, parsed]);

  return (
    <div data-stagger className="flex flex-col items-center py-8 text-center sm:py-10">
      <data ref={ref} value={value} className="block font-macro text-3xl uppercase leading-none tracking-tight text-highlight md:text-4xl">
        {parsed ? `0${parsed.suffix}` : value}
      </data>
      <p className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-base/85">{label}</p>
    </div>
  );
}

function parseStat(value: string) {
  const match = value.match(/^(\d+)(\+?)$/);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

function runCount(el: HTMLElement, target: number, suffix: string) {
  const obj = { n: 0 };
  return gsap.to(obj, {
    n: target,
    duration: 1.4 + target / 900,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.n)}${suffix}`;
    },
  });
}
