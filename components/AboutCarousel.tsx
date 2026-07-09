"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useInViewport } from "@/lib/useInViewport";
import { useReducedMotion } from "./gsap/useReducedMotion";

type Item = { term: string; text: string };
type Dir = "left" | "right";
const DURATION = 400;

function Slide({ item, anim }: { item: Item; anim: string }) {
  return (
    <article className={`about-carousel-item text-left ${anim}`}>
      <h3 className="font-display text-sm capitalize tracking-[0.02em] text-nav md:text-[1rem]">
        {item.term}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-nav md:text-[1rem]">{item.text}</p>
    </article>
  );
}

export function AboutCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<Dir>("left");
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewport<HTMLDivElement>();

  const go = (next: number, direction: Dir) => {
    if (next === index) return;
    setDir(direction);
    setPrevIndex(index);
    setIndex(next);
  };

  useEffect(() => {
    if (prevIndex === null) return;
    const id = setTimeout(() => setPrevIndex(null), DURATION);
    return () => clearTimeout(id);
  }, [prevIndex, index]);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      setIndex((v) => {
        setDir("left");
        setPrevIndex(v);
        return (v + 1) % items.length;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [reduce, visible, items.length]);

  const anim = !reduce && prevIndex !== null;
  const outClass = anim ? `absolute inset-x-0 top-0 about-carousel-out-${dir}` : "";
  const inClass = anim ? `about-carousel-in-${dir}` : "";

  return (
    <div ref={ref} className="mt-10 border-t border-nav/20 pt-8 max-[1020px]:mb-9">
      <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3 md:gap-x-4">
        <button
          type="button"
          onClick={() => go((index - 1 + items.length) % items.length, "right")}
          aria-label="Anterior"
          className="shrink-0 pt-0.5 text-highlight"
        >
          <CaretLeft size={32} weight="bold" />
        </button>
        <div className="relative min-h-[8.75rem] overflow-hidden md:min-h-[7.75rem]">
          {prevIndex !== null && <Slide item={items[prevIndex]} anim={outClass} />}
          <Slide item={items[index]} anim={inClass} />
        </div>
        <button
          type="button"
          onClick={() => go((index + 1) % items.length, "left")}
          aria-label="Siguiente"
          className="shrink-0 pt-0.5 text-highlight"
        >
          <CaretRight size={32} weight="bold" />
        </button>
      </div>
    </div>
  );
}
