"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./gsap/useReducedMotion";

import { StatIcon } from "./stats/StatIcons";
import type { StatIconId } from "@/lib/data";

type StatCounterProps = { value: string; label: string; icon: StatIconId };

export function StatCounter({ value, label, icon }: StatCounterProps) {
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
    <div data-stagger className="stats-bar__item">
      <div className="stats-bar__stack">
        <div className="stats-bar__icon-wrap">
          <StatIcon id={icon} className="stats-bar__icon" />
        </div>
        <data ref={ref} value={value} className="stats-bar__value">
          {parsed ? `0${parsed.suffix}` : value}
        </data>
        <p className="stats-bar__label">{label}</p>
      </div>
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
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.n)}${suffix}`;
    },
  });
}
