"use client";

import { useEffect, useState } from "react";

type MotionState = { reduce: boolean; ready: boolean };

export function useReducedMotionState(): MotionState {
  const [state, setState] = useState<MotionState>({ reduce: true, ready: false });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setState({ reduce: mq.matches, ready: true });
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return state;
}

export function useReducedMotion() {
  return useReducedMotionState().reduce;
}
