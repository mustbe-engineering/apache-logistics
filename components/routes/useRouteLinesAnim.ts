"use client";

import { useLayoutEffect, useRef } from "react";
import type { gsap as Gsap } from "gsap";
import { routeGroups } from "@/lib/routesMap";
import type { GsapCore } from "@/lib/gsapCore";
import { loadGsap } from "@/lib/gsapCore";
import { scheduleScrollRefresh } from "@/lib/scheduleScrollRefresh";

type GsapTimeline = ReturnType<GsapCore["gsap"]["timeline"]>;

const DRAW = 1;
const ERASE = 1;
const GAP = 0.175;
const FADE = 0.25;
const MASK_STROKE = 12;

function maskLen(mask: SVGPathElement) {
  return Number(mask.dataset.routeLen);
}

function masksInGroup(masks: SVGPathElement[], group: number) {
  return masks.filter((p) => Number(p.dataset.routeGroup) === group);
}

function hideMask(gsap: GsapCore["gsap"], mask: SVGPathElement) {
  const len = maskLen(mask);
  const hide = len + MASK_STROKE;
  gsap.set(mask, { strokeDasharray: `${len} ${hide}`, strokeDashoffset: hide, attr: { strokeLinecap: "butt" } });
}

function buildTimeline(gsap: GsapCore["gsap"], masks: SVGPathElement[], dots: SVGGElement[]) {
  const tl = gsap.timeline({ repeat: -1, paused: true });
  routeGroups.forEach((group, i) => {
    const at = i === 0 ? 0 : `+=${GAP}`;
    const paths = masksInGroup(masks, i);
    tl.to(paths, { strokeDashoffset: 0, duration: DRAW, stagger: 0.1, ease: "power2.inOut" }, at);
    tl.to(dots[group.dot], { opacity: 1, duration: FADE, ease: "power2.out" }, "<0.4");
  });
  routeGroups.slice().reverse().forEach((group, i) => {
    const paths = masksInGroup(masks, routeGroups.length - 1 - i);
    tl.to(dots[group.dot], { opacity: 0, duration: FADE, ease: "power2.in" }, `+=${GAP}`);
    tl.to(paths, {
      strokeDashoffset: (_j, el) => maskLen(el as SVGPathElement) + MASK_STROKE,
      duration: ERASE, stagger: 0.1, ease: "power2.inOut",
    }, "<");
  });
  return tl;
}

function resetScene(
  gsap: GsapCore["gsap"],
  masks: SVGPathElement[],
  dots: SVGGElement[],
  labels: SVGTextElement[],
) {
  masks.forEach((mask) => hideMask(gsap, mask));
  gsap.set(dots.filter((d) => !d.hasAttribute("data-route-dot-static")), { opacity: 0 });
  gsap.set(dots.filter((d) => d.hasAttribute("data-route-dot-static")), { opacity: 1 });
  gsap.set(labels, { opacity: 1 });
}

export function useRouteLinesAnim(reduce: boolean, ready: boolean) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!ready || !svgRef.current) return;
    let tl: GsapTimeline | undefined;
    let trigger: ReturnType<GsapCore["ScrollTrigger"]["create"]> | undefined;
    let cancelled = false;
    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !svgRef.current) return;
      const svg = svgRef.current;
      const masks = Array.from(svg.querySelectorAll<SVGPathElement>("[data-route-mask]"));
      const dots = Array.from(svg.querySelectorAll<SVGGElement>("[data-route-dot]"));
      const labels = Array.from(svg.querySelectorAll<SVGTextElement>("[data-route-label]"));
      masks.forEach((mask) => { mask.dataset.routeLen = String(mask.getTotalLength()); });
      resetScene(gsap, masks, dots, labels);
      if (reduce) {
        masks.forEach((m) => gsap.set(m, { strokeDashoffset: 0 }));
        gsap.set(dots, { opacity: 1 });
        svg.setAttribute("data-routes-ready", "");
        return;
      }
      tl = buildTimeline(gsap, masks, dots);
      const triggerEl = svg.closest("section") ?? svg;
      const play = () => { resetScene(gsap, masks, dots, labels); svg.setAttribute("data-routes-ready", ""); tl?.restart(); };
      const hide = () => { tl?.pause(); resetScene(gsap, masks, dots, labels); svg.removeAttribute("data-routes-ready"); };
      trigger = ScrollTrigger.create({
        trigger: triggerEl, start: "top 78%",
        onEnter: play, onEnterBack: play, onLeave: hide, onLeaveBack: hide,
      });
      scheduleScrollRefresh();
      if (ScrollTrigger.isInViewport(triggerEl, 0.15)) play();
    });
    return () => {
      cancelled = true;
      tl?.kill();
      trigger?.kill();
      svgRef.current?.removeAttribute("data-routes-ready");
    };
  }, [reduce, ready]);

  return svgRef;
}
