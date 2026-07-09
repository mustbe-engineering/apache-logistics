"use client";

import { useEffect, useRef } from "react";
import { useInViewport } from "@/lib/useInViewport";
import { useReducedMotionState } from "./gsap/useReducedMotion";

const CLIENTS_VIDEO = "/videos/apache-logistics.mp4";

export function ClientsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, visible } = useInViewport<HTMLDivElement>("400px 0px");
  const { reduce, ready } = useReducedMotionState();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    if (!visible || reduce) {
      video.pause();
      return;
    }
    const play = () => { void video.play().catch(() => {}); };
    const id = requestIdleCallback(play, { timeout: 1500 });
    return () => cancelIdleCallback(id);
  }, [visible, reduce, ready]);

  return (
    <div ref={ref} className="absolute inset-0">
      <video
        ref={videoRef}
        preload="none"
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden
      >
        <source src={CLIENTS_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
