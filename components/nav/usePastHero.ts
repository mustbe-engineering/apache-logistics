"use client";

import { useSyncExternalStore } from "react";

function getNavHeight() {
  return document.querySelector<HTMLElement>("[data-nav-shell]")?.offsetHeight ?? 80;
}

function getPastHero() {
  const hero = document.getElementById("home");
  if (!hero) return false;
  return hero.getBoundingClientRect().bottom <= getNavHeight();
}

function subscribe(onStoreChange: () => void) {
  let frame = 0;
  const onChange = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onStoreChange();
    });
  };
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function usePastHero() {
  return useSyncExternalStore(subscribe, getPastHero, () => false);
}
