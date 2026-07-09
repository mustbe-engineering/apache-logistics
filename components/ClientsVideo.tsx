"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionState } from "./gsap/useReducedMotion";

const CLIENTS_VIDEO = "/videos/apache-logistics.mp4";

export function ClientsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reduce, ready } = useReducedMotionState();

  useEffect(() => {
    if (!ready || reduce) return;
    const video = videoRef.current;
    if (!video) return;
    const play = () => { void video.play().catch(() => {}); };
    const id = requestIdleCallback(play, { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, [reduce, ready]);

  return (
    <video
      ref={videoRef}
      preload="metadata"
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden
    >
      <source src={CLIENTS_VIDEO} type="video/mp4" />
    </video>
  );
}
