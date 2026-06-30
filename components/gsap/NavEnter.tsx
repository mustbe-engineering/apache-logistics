"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import { gsap, initGsap } from "@/lib/gsapCore";
import { useReducedMotion } from "./useReducedMotion";

type NavEnterProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"header">;

export const NavEnter = forwardRef<HTMLElement, NavEnterProps>(function NavEnter(
  { children, className, ...rest },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !localRef.current) return;
    initGsap();

    const root = localRef.current;
    const logo = root.querySelector("[data-nav-logo]");
    const separator = root.querySelector("[data-nav-separator]");
    const links = root.querySelector("[data-nav-links]");
    const linkItems = links ? Array.from(links.children) : [];
    const actions = root.querySelector("[data-nav-actions]");

    gsap.set(root, { autoAlpha: 0, y: -18 });
    if (logo) gsap.set(logo, { autoAlpha: 0, y: -10 });
    if (separator) gsap.set(separator, { autoAlpha: 0, scaleY: 0, transformOrigin: "center center" });
    if (linkItems.length) gsap.set(linkItems, { autoAlpha: 0, y: -8 });
    if (actions) gsap.set(actions, { autoAlpha: 0, y: -8 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(root, { autoAlpha: 1, y: 0, duration: 0.58 });

    if (logo) {
      tl.to(logo, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.38");
    }

    if (separator) {
      tl.to(separator, { autoAlpha: 1, scaleY: 1, duration: 0.34 }, "-=0.34");
    }

    if (linkItems.length) {
      tl.to(linkItems, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.045 }, "-=0.28");
    }

    if (actions) {
      tl.to(actions, { autoAlpha: 1, y: 0, duration: 0.44 }, "-=0.34");
    }

    return () => {
      tl.kill();
    };
  }, [reduce]);

  const setRef = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <header ref={setRef} className={className} {...rest}>
      {children}
    </header>
  );
});
