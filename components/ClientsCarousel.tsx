"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clients } from "@/lib/content";
import { useReducedMotion } from "./gsap/useReducedMotion";

function LogoMark({ mark }: { mark: string }) {
  return (
    <div className="flex h-[9.36rem] w-[15.6rem] items-center justify-center border border-base/25 bg-base/10">
      <span className="font-macro text-3xl uppercase tracking-tight text-base">{mark}</span>
    </div>
  );
}

export function ClientsCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const client = clients[index];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % clients.length), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mt-[3.9rem] min-h-[12.48rem] border-t border-base/20 pt-[3.9rem]">
      <div className="flex flex-col items-center">
        <Link href={client.href} target="_blank" rel="noopener noreferrer" aria-label={client.name} className="transition-opacity hover:opacity-85">
          <LogoMark mark={client.mark} />
        </Link>
        <p className="mt-6 text-sm text-base/80">{client.name}</p>
      </div>
    </div>
  );
}
