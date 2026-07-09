"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import type { GsapCore } from "@/lib/gsapCore";
import { loadGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

type GsapTimeline = ReturnType<GsapCore["gsap"]["timeline"]>;

type NavEnterProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"header">;

function runNavEnter(root: HTMLElement, gsap: GsapCore["gsap"]) {
  const logo = root.querySelector("[data-nav-logo]");
  const separator = root.querySelector("[data-nav-separator]");
  const links = root.querySelector("[data-nav-links]");
  const linkItems = links ? Array.from(links.children) : [];
  const actions = root.querySelector("[data-nav-actions]");
  gsap.set(root, { opacity: 0, y: -18 });
  if (logo) gsap.set(logo, { opacity: 0, y: -10 });
  if (separator) gsap.set(separator, { opacity: 0, scaleY: 0, transformOrigin: "center center" });
  if (linkItems.length) gsap.set(linkItems, { opacity: 0, y: -8 });
  if (actions) gsap.set(actions, { opacity: 0, y: -8 });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(root, { opacity: 1, y: 0, duration: 0.58 });
  if (logo) tl.to(logo, { opacity: 1, y: 0, duration: 0.48 }, "-=0.38");
  if (separator) tl.to(separator, { opacity: 1, scaleY: 1, duration: 0.34 }, "-=0.34");
  if (linkItems.length) tl.to(linkItems, { opacity: 1, y: 0, duration: 0.42, stagger: 0.045 }, "-=0.28");
  if (actions) tl.to(actions, { opacity: 1, y: 0, duration: 0.44 }, "-=0.34");
  return tl;
}

export const NavEnter = forwardRef<HTMLElement, NavEnterProps>(function NavEnter(
  { children, className, ...rest },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !localRef.current) return;
    const root = localRef.current;
    root.dataset.navAnimate = "";
    let tl: GsapTimeline | undefined;
    let cancelled = false;
    void loadGsap().then(({ gsap }) => {
      if (cancelled || !localRef.current) return;
      tl = runNavEnter(root, gsap);
      delete root.dataset.navAnimate;
    });
    return () => {
      cancelled = true;
      tl?.kill();
      delete root.dataset.navAnimate;
    };
  }, [reduce]);

  const setRef = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <header ref={setRef} className={className} {...rest}>
      {children}
    </header>
  );
});
