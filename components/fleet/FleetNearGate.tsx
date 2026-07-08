"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FleetPlaceholder } from "./FleetPlaceholder";
import { observeNearViewport } from "./observeNearViewport";

const Fleet = dynamic(() => import("@/components/Fleet").then((m) => m.Fleet));

export function FleetNearGate() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;
    return observeNearViewport(el, () => setActive(true));
  }, [active]);

  if (active) return <Fleet />;
  return <FleetPlaceholder ref={ref} />;
}
