"use client";

import { useEffect, useRef } from "react";
import { routeGroups } from "@/lib/routesMap";
import { gsap, initGsap, ScrollTrigger } from "@/lib/gsapCore";

const DRAW = 1;
const ERASE = 1;
const GAP = 0.175;
const FADE = 0.25;

function pathsInGroup(paths: SVGPathElement[], group: number) {
  return paths.filter((p) => Number(p.dataset.routeGroup) === group);
}

function pathLen(path: SVGPathElement) {
  return Number(path.dataset.routeLen);
}

function addDrawStep(
  tl: gsap.core.Timeline,
  groupPaths: SVGPathElement[],
  dot: SVGCircleElement,
  label: SVGTextElement,
  at: string | number,
) {
  tl.to(groupPaths, { strokeDashoffset: 0, duration: DRAW, stagger: 0.1, ease: "power2.inOut" }, at);
  tl.to([dot, label], { opacity: 1, duration: FADE, ease: "power2.out" }, "<0.4");
}

function addEraseStep(
  tl: gsap.core.Timeline,
  groupPaths: SVGPathElement[],
  dot: SVGCircleElement,
  label: SVGTextElement,
  at: string | number,
) {
  tl.to([dot, label], { opacity: 0, duration: FADE, ease: "power2.in" }, at);
  tl.to(groupPaths, {
    strokeDashoffset: (_i, el) => pathLen(el as SVGPathElement),
    duration: ERASE, stagger: 0.1, ease: "power2.inOut",
  }, "<");
}

function buildRouteTimeline(
  paths: SVGPathElement[],
  dots: SVGCircleElement[],
  labels: SVGTextElement[],
) {
  const tl = gsap.timeline({ repeat: -1, paused: true });
  gsap.set([dots[0], labels[0]], { opacity: 1 });
  gsap.set(dots.slice(1), { opacity: 0 });
  gsap.set(labels.slice(1), { opacity: 0 });
  routeGroups.forEach((group, i) => {
    const groupPaths = pathsInGroup(paths, i);
    addDrawStep(tl, groupPaths, dots[group.dot], labels[group.label], i === 0 ? 0 : `+=${GAP}`);
  });
  routeGroups.slice().reverse().forEach((group, i) => {
    const groupPaths = pathsInGroup(paths, routeGroups.length - 1 - i);
    addEraseStep(tl, groupPaths, dots[group.dot], labels[group.label], `+=${GAP}`);
  });
  return tl;
}

export function useRouteLinesAnim(reduce: boolean) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    initGsap();
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-route-line]"));
    const dots = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-route-dot]"));
    const labels = Array.from(svg.querySelectorAll<SVGTextElement>("[data-route-label]"));
    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.dataset.routeLen = String(len);
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });
    if (reduce) {
      paths.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
      gsap.set(dots, { opacity: 1 });
      gsap.set(labels, { opacity: 1 });
      return;
    }
    const tl = buildRouteTimeline(paths, dots, labels);
    const trigger = ScrollTrigger.create({
      trigger: svg, start: "top 78%",
      onEnter: () => tl.play(), onEnterBack: () => tl.play(),
      onLeave: () => tl.pause(), onLeaveBack: () => tl.pause(),
    });
    return () => { tl.kill(); trigger.kill(); };
  }, [reduce]);

  return svgRef;
}
