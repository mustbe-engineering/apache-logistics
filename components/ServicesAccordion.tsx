"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { services } from "@/lib/data";
import { serviceIcons } from "@/lib/serviceIcons";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./gsap/useReducedMotion";
import { ServiceAccordionRow } from "./ServiceAccordionRow";

const HEADER = 64;
const TONES = ["#164775", "#185078", "#1a5282", "#1c5686", "#1e5a8a", "#205e8e"];
const EASE = "power3.inOut";

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  const layout = useCallback(
    (index: number) => {
      const box = boxRef.current;
      if (!box) return;
      const expanded = Math.max(box.offsetHeight - HEADER * (services.length - 1), HEADER);
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.to(row, { height: i === index ? expanded : HEADER, duration: reduce ? 0 : 0.78, ease: EASE });
      });
    },
    [reduce],
  );

  useLayoutEffect(() => {
    initGsap();
    layout(open);
    const onResize = () => layout(open);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, layout]);

  return (
    <div
      ref={boxRef}
      className="flex h-full min-h-0 flex-col gap-px overflow-hidden bg-white/[0.08]"
    >
      {services.map((s, i) => (
        <div key={s.name} ref={(el) => { rowRefs.current[i] = el; }} className="overflow-hidden">
          <ServiceAccordionRow
            name={s.name}
            tagline={s.tagline}
            desc={s.desc}
            benefits={s.benefits}
            tone={TONES[i] ?? TONES[0]}
            index={i}
            active={open === i}
            Icon={serviceIcons[s.icon]}
            onSelect={() => setOpen(i)}
          />
        </div>
      ))}
    </div>
  );
}
