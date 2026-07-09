"use client";

import { useEffect, useRef } from "react";
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
    const el = ref.current;
    let stop = () => {};
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        stop = runCount(el, parsed.target, parsed.suffix);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
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
  const start = performance.now();
  const duration = (1.4 + target / 900) * 1000;
  let raf = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
