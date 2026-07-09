"use client";

import { useSyncExternalStore } from "react";
import { NAV_LINKS } from "./links";

export type NavSectionId = (typeof NAV_LINKS)[number]["href"] extends `#${infer Id}` ? Id : never;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", "")) as NavSectionId[];

function navHeight() {
  return document.querySelector<HTMLElement>("[data-nav-shell]")?.offsetHeight ?? 80;
}

function sectionTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function nearPageBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
}

function pastLastSection(last: NavSectionId) {
  const el = document.getElementById(last);
  return !!el && el.getBoundingClientRect().bottom <= navHeight() + 96;
}

function readActive(): NavSectionId {
  const last = SECTION_IDS[SECTION_IDS.length - 1];
  if (nearPageBottom() || pastLastSection(last)) return last;
  const probe = window.scrollY + navHeight() + 96;
  let active: NavSectionId = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && sectionTop(el) <= probe) active = id;
  }
  return active;
}

function subscribe(onChange: () => void) {
  let frame = 0;
  const tick = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", tick);
    window.removeEventListener("resize", tick);
  };
}

export function useActiveSection() {
  return useSyncExternalStore(subscribe, readActive, () => SECTION_IDS[0]);
}
