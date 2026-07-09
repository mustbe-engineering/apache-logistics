"use client";

import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export type GsapCore = {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

let core: GsapCore | null = null;
let loading: Promise<GsapCore> | null = null;

export function loadGsap(): Promise<GsapCore> {
  if (core) return Promise.resolve(core);
  if (!loading) {
    loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
        core = { gsap, ScrollTrigger };
        return core;
      },
    );
  }
  return loading;
}

export function getGsap(): GsapCore {
  if (!core) throw new Error("GSAP not loaded");
  return core;
}
