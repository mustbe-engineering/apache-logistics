"use client";

import { useEffect, useRef, useState } from "react";
import { createFleetScrollSequence } from "@/lib/fleetScroll/createSequence";
import { FleetSequenceContent } from "./FleetSequenceContent";
import { observeNearViewport } from "./observeNearViewport";
import "./fleet-scroll.css";

export function FleetScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || near) return;
    return observeNearViewport(section, () => setNear(true));
  }, [near]);

  useEffect(() => {
    if (!near) return;
    const section = sectionRef.current;
    if (!section) return;
    let disposed = false;
    let cleanup = () => {};
    void createFleetScrollSequence(section).then((fn) => {
      if (disposed) { fn(); return; }
      cleanup = fn;
    });
    return () => { disposed = true; cleanup(); };
  }, [near]);

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
