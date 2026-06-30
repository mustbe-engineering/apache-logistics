"use client";

import { useSyncExternalStore } from "react";

function getNavHeight() {
  return (
    document.querySelector<HTMLElement>("[data-nav-shell]")?.offsetHeight ?? 80
  );
}

function getPastHero() {
  const hero = document.getElementById("home");
  if (!hero) return false;
  return hero.getBoundingClientRect().bottom <= getNavHeight();
}

function subscribe(onStoreChange: () => void) {
  const onChange = () => onStoreChange();

  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function usePastHero() {
  return useSyncExternalStore(subscribe, getPastHero, () => false);
}
