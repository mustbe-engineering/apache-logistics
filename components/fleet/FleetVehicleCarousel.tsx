"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { fleetVehicles, type FleetVehicle } from "@/lib/fleetVehicle";
import { useInViewport } from "@/lib/useInViewport";
import { useReducedMotion } from "../gsap/useReducedMotion";
import { FleetVehicleFocus } from "./FleetVehicleFocus";

type Dir = "left" | "right";
const DURATION = 400;
const INTERVAL = 5000;

function VehicleSlide({ vehicle, anim }: { vehicle: FleetVehicle; anim: string }) {
  return (
    <div className={`scroll-sequence__vehicle-slide ${anim}`}>
      <header className="scroll-sequence__vehicle-head">
        <h3 className="scroll-sequence__vehicle-name">{vehicle.name}</h3>
        <p className="scroll-sequence__vehicle-tagline">{vehicle.tagline}</p>
      </header>
      <dl className="scroll-sequence__vehicle-specs">
        {vehicle.specs.map((spec) => (
          <div key={spec.label} className="scroll-sequence__vehicle-spec">
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function FleetVehicleCarousel() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<Dir>("left");
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewport<HTMLElement>();
  const len = fleetVehicles.length;

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
        return (v + 1) % len;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, visible, len]);

  const anim = !reduce && prevIndex !== null;
  const outClass = anim ? `absolute inset-0 about-carousel-out-${dir}` : "";
  const inClass = anim ? `about-carousel-in-${dir}` : "";

  return (
    <>
      <FleetVehicleFocus index={index} />
      <article ref={ref} className="scroll-sequence__vehicle-panel">
        <button type="button" className="scroll-sequence__vehicle-nav" aria-label="Unidad anterior" onClick={() => go((index - 1 + len) % len, "right")}>
          <CaretLeft size={28} weight="bold" />
        </button>
        <div className="scroll-sequence__vehicle-stage">
          {prevIndex !== null && <VehicleSlide vehicle={fleetVehicles[prevIndex]} anim={outClass} />}
          <VehicleSlide vehicle={fleetVehicles[index]} anim={inClass} />
        </div>
        <button type="button" className="scroll-sequence__vehicle-nav" aria-label="Unidad siguiente" onClick={() => go((index + 1) % len, "left")}>
          <CaretRight size={28} weight="bold" />
        </button>
      </article>
    </>
  );
}
