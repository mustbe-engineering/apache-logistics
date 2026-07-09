"use client";

import { useLayoutEffect, useState } from "react";
import type { NavSectionId } from "./useActiveSection";

type Line = { x: number; y: number; width: number; visible: boolean };

function measure(activeId: NavSectionId): Line {
  const bar = document.querySelector<HTMLElement>(".nav-bar");
  const text = document.querySelector<HTMLElement>(
    `[data-nav-links] [href="#${activeId}"] .nav-link-text`,
  );
  if (!bar || !text) return { x: 0, y: 0, width: 0, visible: false };
  const links = document.querySelector<HTMLElement>("[data-nav-links]");
  if (!links || window.getComputedStyle(links).display === "none") {
    return { x: 0, y: 0, width: 0, visible: false };
  }
  const barBox = bar.getBoundingClientRect();
  const textBox = text.getBoundingClientRect();
  const width = Math.max(textBox.width * 0.9, 1);
  const x = textBox.left - barBox.left + (textBox.width - width) * 0.5;
  const y = textBox.bottom - barBox.top + 8;
  return { x, y, width, visible: width > 1 };
}

type NavActiveLineProps = { activeId: NavSectionId; pastHero: boolean };

export function NavActiveLine({ activeId, pastHero }: NavActiveLineProps) {
  const [line, setLine] = useState<Line>({ x: 0, y: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    let frame = 0;
    const sync = () => setLine(measure(activeId));
    const onMove = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };
    sync();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [activeId, pastHero]);

  return (
    <span
      aria-hidden
      className="nav-active-line"
      style={{
        width: `${line.width}px`,
        transform: `translate(${line.x}px, ${line.y}px)`,
        opacity: line.visible ? 1 : 0,
      }}
    />
  );
}
