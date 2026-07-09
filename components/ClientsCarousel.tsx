"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clients } from "@/lib/content";
import { useInViewport } from "@/lib/useInViewport";
import { useReducedMotion } from "./gsap/useReducedMotion";

type Client = (typeof clients)[number];
const STEP_MS = 3000;
const items = [...clients, ...clients];

function ClientSlide({ client }: { client: Client }) {
  return (
    <div className="clients-marquee__slide">
      <Image
        src={client.logo}
        alt={client.name}
        width={client.width}
        height={client.height}
        sizes="9rem"
        className="clients-marquee__logo"
      />
    </div>
  );
}

export function ClientsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resettingRef = useRef(false);
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewport<HTMLDivElement>();
  indexRef.current = index;

  const queueStep = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIndex((v) => v + 1), STEP_MS);
  };

  useEffect(() => {
    if (reduce || !visible) {
      clearTimeout(timerRef.current);
      return;
    }
    queueStep();
    return () => clearTimeout(timerRef.current);
  }, [reduce, visible]);

  const onEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (resettingRef.current || !visible) return;
    if (indexRef.current === clients.length) {
      resettingRef.current = true;
      setPaused(true);
      setIndex(0);
      requestAnimationFrame(() => {
        setPaused(false);
        resettingRef.current = false;
        queueStep();
      });
      return;
    }
    queueStep();
  };

  if (reduce) {
    return (
      <div ref={ref} className="clients-marquee">
        <div className="clients-marquee__viewport clients-marquee__viewport--static">
          <div className="clients-marquee__track clients-marquee__track--static">
            {clients.map((client) => (
              <ClientSlide key={client.logo} client={client} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="clients-marquee">
      <div className="clients-marquee__viewport">
        <div
          className={`clients-marquee__track${paused ? " clients-marquee__track--paused" : ""}`}
          style={{ transform: `translateX(calc(-1 * ${index} * var(--clients-slide-w)))` }}
          onTransitionEnd={onEnd}
        >
          {items.map((client, i) => (
            <ClientSlide key={`${client.logo}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
}
