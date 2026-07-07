"use client";

import { useEffect, useRef } from "react";
import { routeGroups } from "@/lib/routesMap";
import { gsap, initGsap, ScrollTrigger } from "@/lib/gsapCore";

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

function hideMask(mask: SVGPathElement) {
  const len = maskLen(mask);
  gsap.set(mask, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });
}

function addDrawStep(
  tl: gsap.core.Timeline,
  group: SVGPathElement[],
  dot: SVGGElement,
  label: SVGTextElement,
  at: string | number,
) {
  tl.to(group, { strokeDashoffset: 0, duration: DRAW, stagger: 0.1, ease: "power2.inOut" }, at);
  tl.to([dot, label], { opacity: 1, duration: FADE, ease: "power2.out" }, "<0.4");
}

function addEraseStep(
  tl: gsap.core.Timeline,
  group: SVGPathElement[],
  dot: SVGGElement,
  label: SVGTextElement,
  at: string | number,
) {
  tl.to([dot, label], { opacity: 0, duration: FADE, ease: "power2.in" }, at);
  tl.to(group, {
    strokeDashoffset: (_i, el) => maskLen(el as SVGPathElement),
    duration: ERASE, stagger: 0.1, ease: "power2.inOut",
  }, "<");
}

function buildTimeline(masks: SVGPathElement[], dots: SVGGElement[], labels: SVGTextElement[]) {
  const tl = gsap.timeline({ repeat: -1, paused: true });
  routeGroups.forEach((group, i) => {
    addDrawStep(tl, masksInGroup(masks, i), dots[group.dot], labels[group.label], i === 0 ? 0 : `+=${GAP}`);
  });
  routeGroups.slice().reverse().forEach((group, i) => {
    addEraseStep(tl, masksInGroup(masks, routeGroups.length - 1 - i), dots[group.dot], labels[group.label], `+=${GAP}`);
  });
  return tl;
}

function animLabels(labels: SVGTextElement[]) {
  return labels.filter((l) => !l.hasAttribute("data-route-label-static"));
}

function animDots(dots: SVGGElement[]) {
  return dots.filter((d) => !d.hasAttribute("data-route-dot-static"));
}

function resetScene(masks: SVGPathElement[], dots: SVGGElement[], labels: SVGTextElement[]) {
  masks.forEach(hideMask);
  gsap.set(animDots(dots), { opacity: 0 });
  gsap.set(dots.filter((d) => d.hasAttribute("data-route-dot-static")), { opacity: 1 });
  gsap.set(animLabels(labels), { opacity: 0 });
  gsap.set(labels.filter((l) => l.hasAttribute("data-route-label-static")), { opacity: 1 });
}

function startIfVisible(el: Element, tl: gsap.core.Timeline, masks: SVGPathElement[], dots: SVGGElement[], labels: SVGTextElement[]) {
  if (!ScrollTrigger.isInViewport(el, 0.15)) return;
  resetScene(masks, dots, labels);
  tl.restart();
}

export function useRouteLinesAnim(reduce: boolean, ready: boolean) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
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
    svg.setAttribute("data-routes-ready", "");
    if (reduce) {
      masks.forEach((m) => gsap.set(m, { strokeDashoffset: 0 }));
      gsap.set(dots, { opacity: 1 });
      gsap.set(labels, { opacity: 1 });
      return () => svg.removeAttribute("data-routes-ready");
    }
    const tl = buildTimeline(masks, dots, labels);
    const triggerEl = svg.closest("section") ?? svg;
    const play = () => { resetScene(masks, dots, labels); tl.restart(); };
    const trigger = ScrollTrigger.create({
      trigger: triggerEl, start: "top 78%",
      onEnter: play, onEnterBack: play,
      onLeave: () => tl.pause(),
      onLeaveBack: () => { tl.pause(); resetScene(masks, dots, labels); },
    });
    ScrollTrigger.refresh();
    startIfVisible(triggerEl, tl, masks, dots, labels);
    return () => { tl.kill(); trigger.kill(); svg.removeAttribute("data-routes-ready"); };
  }, [reduce, ready]);

  return svgRef;
}
