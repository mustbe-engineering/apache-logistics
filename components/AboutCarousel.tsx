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
    <article className={`about-carousel-item mx-10 text-left md:mx-14 ${anim}`}>
      <p className="text-[0.7rem] uppercase tracking-[0.12em] text-highlight">{item.term}</p>
      <p className="mt-4 text-sm leading-relaxed !text-[#164775] md:text-base">{item.text}</p>
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
    <div ref={ref} className="relative mt-10 border-t border-nav/20 pt-8 max-[1020px]:mb-9">
      <button type="button" onClick={() => go((index - 1 + items.length) % items.length, "right")} aria-label="Anterior" className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-highlight">
        <CaretLeft size={32} weight="bold" />
      </button>
      <button type="button" onClick={() => go((index + 1) % items.length, "left")} aria-label="Siguiente" className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-highlight">
        <CaretRight size={32} weight="bold" />
      </button>
      <div className="relative overflow-hidden">
        {prevIndex !== null && <Slide item={items[prevIndex]} anim={outClass} />}
        <Slide item={items[index]} anim={inClass} />
      </div>
    </div>
  );
}
