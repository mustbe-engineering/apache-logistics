"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { clients } from "@/lib/content";
import { useReducedMotion } from "./gsap/useReducedMotion";

type Client = (typeof clients)[number];
const DURATION = 380;

function ClientLogo({ client, anim }: { client: Client; anim: string }) {
  return (
    <div className={`flex h-[18.25rem] w-full max-w-[30.42rem] items-center justify-center px-4 ${anim}`}>
      <Image
        src={client.logo}
        alt={client.name}
        width={client.width}
        height={client.height}
        sizes="(max-width: 640px) 80vw, 30.42rem"
        className="h-auto max-h-full w-auto max-w-full object-contain"
      />
    </div>
  );
}

export function ClientsCarousel() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const anim = !reduce && prevIndex !== null;

  useEffect(() => {
    if (prevIndex === null) return;
    const id = setTimeout(() => setPrevIndex(null), DURATION);
    return () => clearTimeout(id);
  }, [prevIndex, index]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((v) => {
        setPrevIndex(v);
        return (v + 1) % clients.length;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mt-[3.9rem] min-h-[24.34rem] border-t border-base/20 pt-[5.85rem]">
      <div className="relative overflow-hidden">
        {prevIndex !== null && (
          <div className="absolute inset-x-0 top-0 flex justify-center clients-carousel-out">
            <ClientLogo client={clients[prevIndex]} anim="" />
          </div>
        )}
        <div className="flex justify-center">
          <ClientLogo client={clients[index]} anim={anim ? "clients-carousel-in" : ""} />
        </div>
      </div>
    </div>
  );
}
