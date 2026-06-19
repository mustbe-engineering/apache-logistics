"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ready = false;

export function initGsap() {
  if (ready || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ready = true;
}

export { gsap, ScrollTrigger };
