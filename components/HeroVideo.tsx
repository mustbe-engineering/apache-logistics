"use client";

import { useEffect, useRef } from "react";
import { cancelIdle, scheduleIdle } from "@/lib/scheduleIdle";
import { useReducedMotionState } from "./gsap/useReducedMotion";

const HERO_VIDEO = "/videos/apache-optimized.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reduce, ready } = useReducedMotionState();

  useEffect(() => {
    if (!ready || reduce) return;
    const video = videoRef.current;
    if (!video) return;
    const play = () => { void video.play().catch(() => {}); };
    const id = scheduleIdle(play, 2000);
    return () => cancelIdle(id);
  }, [reduce, ready]);

  return (
    <video
      ref={videoRef}
      data-hero-media
      preload="metadata"
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      aria-hidden
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
