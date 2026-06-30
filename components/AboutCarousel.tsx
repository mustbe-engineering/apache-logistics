"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "./gsap/useReducedMotion";

type Item = { term: string; text: string };

export function AboutCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const item = items[index];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [reduce, items.length]);

  const prev = () => setIndex((v) => (v - 1 + items.length) % items.length);
  const next = () => setIndex((v) => (v + 1) % items.length);

  return (
    <div className="relative mt-10 border-t border-nav/20 pt-8">
      <button type="button" onClick={prev} aria-label="Anterior" className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-highlight">
        <CaretLeft size={32} weight="bold" />
      </button>
      <button type="button" onClick={next} aria-label="Siguiente" className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-highlight">
        <CaretRight size={32} weight="bold" />
      </button>
      <article className="mx-10 text-left md:mx-14">
        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-highlight">{item.term}</p>
        <p className="mt-4 text-sm leading-relaxed !text-[#164775] md:text-base">{item.text}</p>
      </article>
    </div>
  );
}
