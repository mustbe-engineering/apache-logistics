"use client";

import { useEffect, useState } from "react";

export function useMinWidth(px: number) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const sync = () => setMatch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [px]);

  return match;
}
