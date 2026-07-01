"use client";

import Image from "next/image";
import { fleetMarkers } from "@/lib/fleetMarkers";

type FleetMapProps = {
  active: number | null;
  onSelect: (index: number | null) => void;
};

export function FleetMap({ active, onSelect }: FleetMapProps) {
  return (
    <div className="relative mx-auto aspect-[2080/1161] w-full max-w-[90rem]">
      <Image
        src="/images/cenital-trucks.jpg"
        alt="Vista cenital de la flota Apache"
        fill
        className="pointer-events-none object-cover"
        sizes="(max-width: 90rem) 100vw, 1440px"
      />
      {fleetMarkers.map((marker, i) => (
        <button
          key={marker.title}
          type="button"
          aria-label={marker.title}
          aria-pressed={active === i}
          onClick={() => onSelect(active === i ? null : i)}
          className="absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <span
            className={`fleet-gps block h-2.5 w-2.5 rounded-full border-2 border-white bg-highlight transition-transform duration-300 ${
              active === i ? "scale-150 ring-1 ring-nav/20" : "hover:scale-125"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
