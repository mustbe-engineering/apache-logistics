"use client";

import { useEffect, useState } from "react";

export function usePastHero() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const sync = () => {
      const navHeight =
        document.querySelector("[data-nav-shell]")?.getBoundingClientRect().height ?? 80;
      setPastHero(hero.getBoundingClientRect().bottom <= navHeight + 2);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return pastHero;
}
