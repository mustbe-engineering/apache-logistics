"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { observeNearViewport } from "@/components/fleet/observeNearViewport";

const RoutesAnimatedLines = dynamic(
  () => import("./RoutesAnimatedLines").then((m) => m.RoutesAnimatedLines),
  { ssr: false },
);

export function RoutesLinesGate() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;
    return observeNearViewport(el, () => setActive(true));
  }, [active]);

  return (
    <div ref={ref} className="absolute inset-0 z-10">
      {active ? (
        <RoutesAnimatedLines className="h-full w-full object-contain object-left-bottom" />
      ) : null}
    </div>
  );
}
