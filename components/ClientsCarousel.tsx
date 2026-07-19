"use client";

import Image from "next/image";
import { clients } from "@/lib/content";
import { useInViewport } from "@/lib/useInViewport";
import { useReducedMotion } from "./gsap/useReducedMotion";

type Client = (typeof clients)[number];
const items = [...clients, ...clients];

function ClientSlide({ client }: { client: Client }) {
  return (
    <div className="clients-marquee__slide">
      <Image
        src={client.logo}
        alt={client.name}
        width={client.width}
        height={client.height}
        sizes="(max-width: 768px) 12rem, 16rem"
        className="clients-marquee__logo"
        style={{ width: "auto", height: "var(--clients-logo-h)" }}
      />
    </div>
  );
}

export function ClientsCarousel() {
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewport<HTMLDivElement>();

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
          className={`clients-marquee__track${visible ? "" : " clients-marquee__track--paused"}`}
        >
          {items.map((client, i) => (
            <ClientSlide key={`${client.logo}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
}
