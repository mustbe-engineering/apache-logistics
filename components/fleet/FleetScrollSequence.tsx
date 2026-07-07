"use client";

import { useEffect, useRef } from "react";
import { createFleetScrollSequence } from "@/lib/fleetScroll/createSequence";
import { FleetSequenceContent } from "./FleetSequenceContent";
import "./fleet-scroll.css";

export function FleetScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let disposed = false;
    let cleanup = () => {};
    void createFleetScrollSequence(section).then((fn) => {
      if (disposed) { fn(); return; }
      cleanup = fn;
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flota"
      className="scroll-sequence scroll-mt-[var(--nav-offset)]"
      aria-label="Secuencia visual al hacer scroll"
    >
      <FleetSequenceContent />
    </section>
  );
}
