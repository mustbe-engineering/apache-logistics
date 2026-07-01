"use client";

import Image from "next/image";
import { unitMarkers } from "@/lib/unitMarkers";

type UnitsMapProps = {
  active: number | null;
  onSelect: (index: number | null) => void;
};

export function UnitsMap({ active, onSelect }: UnitsMapProps) {
  return (
    <div className="relative mx-auto aspect-[1344/752] w-full max-w-[90rem]">
      <Image
        src="/images/trucks-transparent-bk.png"
        alt="Unidades de la flota Apache Logistics"
        fill
        className="pointer-events-none object-contain"
        sizes="(max-width: 90rem) 100vw, 1440px"
      />
      {unitMarkers.map((marker, i) => (
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
