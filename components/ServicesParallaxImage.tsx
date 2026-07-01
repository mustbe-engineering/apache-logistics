"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";
import { gsap } from "@/lib/gsapCore";

const MOVE = { x: 28, y: 18 };

function parallaxMove(
  frame: HTMLDivElement,
  e: MouseEvent,
  xTo: gsap.QuickToFunc,
  yTo: gsap.QuickToFunc,
) {
  const r = frame.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
  const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
  xTo(nx * MOVE.x);
  yTo(ny * MOVE.y);
}

function bindParallax(frame: HTMLDivElement, layer: HTMLDivElement) {
  const xTo = gsap.quickTo(layer, "x", { duration: 0.75, ease: "power3.out" });
  const yTo = gsap.quickTo(layer, "y", { duration: 0.75, ease: "power3.out" });
  const reset = () => {
    xTo(0);
    yTo(0);
  };
  const move = (e: MouseEvent) => parallaxMove(frame, e, xTo, yTo);
  frame.addEventListener("mousemove", move);
  frame.addEventListener("mouseleave", reset);
  return () => {
    frame.removeEventListener("mousemove", move);
    frame.removeEventListener("mouseleave", reset);
    gsap.set(layer, { x: 0, y: 0 });
  };
}

export function ServicesParallaxImage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer || reduce) return;
    return bindParallax(frame, layer);
  }, [reduce]);

  return (
    <div
      ref={frameRef}
      className="relative min-h-[12rem] overflow-hidden border border-white/10 lg:col-span-2 lg:min-h-0 lg:h-full"
    >
      <div ref={layerRef} className="absolute inset-0 scale-[1.12] will-change-transform">
        <Image
          src="/images/truck-zoom-logo.jpg"
          alt="Unidad Apache Logistics con logo corporativo"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
    </div>
  );
}
