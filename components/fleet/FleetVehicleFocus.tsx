"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fleetVehicles } from "@/lib/fleetVehicle";

export function FleetVehicleFocus({ index }: { index: number }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setHost(document.querySelector<HTMLElement>(".scroll-sequence__sticky"));
  }, []);
  if (!host) return null;
  return createPortal(
    <div className="scroll-sequence__vehicle-focus" aria-hidden="true">
      {fleetVehicles.map((vehicle, i) => (
        <img
          key={vehicle.image}
          src={vehicle.image}
          alt=""
          className={`scroll-sequence__vehicle-focus-img${i === index ? " is-active" : ""}`}
          draggable={false}
        />
      ))}
    </div>,
    host,
  );
}
