"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";

const MOVE = { x: 28, y: 18 };

function bindParallax(frame: HTMLDivElement, layer: HTMLDivElement) {
  const move = (e: MouseEvent) => {
    const r = frame.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    layer.style.transform = `translate(${nx * MOVE.x}px, ${ny * MOVE.y}px)`;
  };
  const reset = () => { layer.style.transform = "translate(0px, 0px)"; };
  frame.addEventListener("mousemove", move);
  frame.addEventListener("mouseleave", reset);
  return () => {
    frame.removeEventListener("mousemove", move);
    frame.removeEventListener("mouseleave", reset);
    reset();
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
    layer.style.transition = "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)";
    return bindParallax(frame, layer);
  }, [reduce]);

  return (
    <div
      ref={frameRef}
      className="relative min-h-[12rem] overflow-hidden border border-white/10 lg:col-span-2 lg:min-h-0 lg:h-full"
    >
      <div ref={layerRef} className="absolute inset-0 scale-[1.12] will-change-transform">
        <Image
          src="/images/assets/truck-zoom-logo.jpg"
          alt="Unidad Apache Logistics con logo corporativo"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
    </div>
  );
}
