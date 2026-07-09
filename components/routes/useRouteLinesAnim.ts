"use client";

import { useLayoutEffect, useRef } from "react";
import { routeGroups } from "@/lib/routesMap";
import { gsap, initGsap, ScrollTrigger } from "@/lib/gsapCore";
import { scheduleScrollRefresh } from "@/lib/scheduleScrollRefresh";

const DRAW = 1;
const ERASE = 1;
const GAP = 0.175;
const FADE = 0.25;

function masksInGroup(masks: SVGPathElement[], group: number) {
  return masks.filter((p) => Number(p.dataset.routeGroup) === group);
}

function maskLen(mask: SVGPathElement) {
  return Number(mask.dataset.routeLen);
}

const MASK_STROKE = 12;

function hideMask(mask: SVGPathElement) {
  const len = maskLen(mask);
  const hide = len + MASK_STROKE;
  gsap.set(mask, { strokeDasharray: `${len} ${hide}`, strokeDashoffset: hide, attr: { strokeLinecap: "butt" } });
}

function addDrawStep(tl: gsap.core.Timeline, group: SVGPathElement[], dot: SVGGElement, at: string | number) {
  tl.to(group, { strokeDashoffset: 0, duration: DRAW, stagger: 0.1, ease: "power2.inOut" }, at);
  tl.to(dot, { opacity: 1, duration: FADE, ease: "power2.out" }, "<0.4");
}

function addEraseStep(tl: gsap.core.Timeline, group: SVGPathElement[], dot: SVGGElement, at: string | number) {
  tl.to(dot, { opacity: 0, duration: FADE, ease: "power2.in" }, at);
  tl.to(group, {
    strokeDashoffset: (_i, el) => maskLen(el as SVGPathElement) + MASK_STROKE,
    duration: ERASE, stagger: 0.1, ease: "power2.inOut",
  }, "<");
}

function buildTimeline(masks: SVGPathElement[], dots: SVGGElement[]) {
  const tl = gsap.timeline({ repeat: -1, paused: true });
  routeGroups.forEach((group, i) => {
    addDrawStep(tl, masksInGroup(masks, i), dots[group.dot], i === 0 ? 0 : `+=${GAP}`);
  });
  routeGroups.slice().reverse().forEach((group, i) => {
    addEraseStep(tl, masksInGroup(masks, routeGroups.length - 1 - i), dots[group.dot], `+=${GAP}`);
  });
  return tl;
}

function animDots(dots: SVGGElement[]) {
  return dots.filter((d) => !d.hasAttribute("data-route-dot-static"));
}

function resetScene(masks: SVGPathElement[], dots: SVGGElement[], labels: SVGTextElement[]) {
  masks.forEach(hideMask);
  gsap.set(animDots(dots), { opacity: 0 });
  gsap.set(dots.filter((d) => d.hasAttribute("data-route-dot-static")), { opacity: 1 });
  gsap.set(labels, { opacity: 1 });
}

function playScene(
  svg: SVGSVGElement,
  tl: gsap.core.Timeline,
  masks: SVGPathElement[],
  dots: SVGGElement[],
  labels: SVGTextElement[],
) {
  resetScene(masks, dots, labels);
  svg.setAttribute("data-routes-ready", "");
  tl.restart();
}

function hideScene(
  svg: SVGSVGElement,
  tl: gsap.core.Timeline,
  masks: SVGPathElement[],
  dots: SVGGElement[],
  labels: SVGTextElement[],
) {
  tl.pause();
  resetScene(masks, dots, labels);
  svg.removeAttribute("data-routes-ready");
}

export function useRouteLinesAnim(reduce: boolean, ready: boolean) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const svg = svgRef.current;
    if (!svg) return;
    initGsap();
    const masks = Array.from(svg.querySelectorAll<SVGPathElement>("[data-route-mask]"));
    const dots = Array.from(svg.querySelectorAll<SVGGElement>("[data-route-dot]"));
    const labels = Array.from(svg.querySelectorAll<SVGTextElement>("[data-route-label]"));
    masks.forEach((mask) => {
      mask.dataset.routeLen = String(mask.getTotalLength());
      hideMask(mask);
    });
    resetScene(masks, dots, labels);
    if (reduce) {
      masks.forEach((m) => gsap.set(m, { strokeDashoffset: 0 }));
      gsap.set(dots, { opacity: 1 });
      svg.setAttribute("data-routes-ready", "");
      return () => svg.removeAttribute("data-routes-ready");
    }
    const tl = buildTimeline(masks, dots);
    const triggerEl = svg.closest("section") ?? svg;
    const play = () => playScene(svg, tl, masks, dots, labels);
    const hide = () => hideScene(svg, tl, masks, dots, labels);
    const trigger = ScrollTrigger.create({
      trigger: triggerEl, start: "top 78%",
      onEnter: play, onEnterBack: play,
      onLeave: hide, onLeaveBack: hide,
    });
    scheduleScrollRefresh();
    if (ScrollTrigger.isInViewport(triggerEl, 0.15)) play();
    return () => { tl.kill(); trigger.kill(); svg.removeAttribute("data-routes-ready"); };
  }, [reduce, ready]);

  return svgRef;
}
