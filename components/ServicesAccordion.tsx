"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { services } from "@/lib/data";
import { serviceIcons } from "@/lib/serviceIcons";
import { useReducedMotion } from "./gsap/useReducedMotion";
import { ServiceAccordionRow } from "./ServiceAccordionRow";

const HEADER_MOBILE = 48;
const HEADER_TABLET = 52;
const TONES = ["#164775", "#185078", "#1a5282", "#1c5686", "#1e5a8a", "#205e8e"];
const HEIGHT_EASE = "height 0.78s cubic-bezier(0.22, 1, 0.36, 1)";

function getHeader() {
  if (typeof window === "undefined") return HEADER_MOBILE;
  return window.innerWidth < 640 ? HEADER_MOBILE : HEADER_TABLET;
}

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  const layout = useCallback(
    (index: number) => {
      const box = boxRef.current;
      if (!box) return;
      const header = getHeader();
      const expanded = Math.max(box.offsetHeight - header * (services.length - 1), header);
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        row.style.transition = reduce ? "none" : HEIGHT_EASE;
        row.style.height = `${i === index ? expanded : header}px`;
      });
    },
    [reduce],
  );

  useLayoutEffect(() => {
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
            active={open === i}
            icon={s.icon}
            iconSrc={serviceIcons[s.icon]}
            onSelect={() => setOpen(i)}
          />
        </div>
      ))}
    </div>
  );
}
