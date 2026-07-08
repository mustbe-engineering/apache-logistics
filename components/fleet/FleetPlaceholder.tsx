import { forwardRef } from "react";

export const FleetPlaceholder = forwardRef<HTMLElement>(function FleetPlaceholder(_, ref) {
  return (
    <section
      ref={ref}
      id="flota"
      className="scroll-mt-[var(--nav-offset)] min-h-[100dvh] bg-[#e8e8e8]"
      aria-label="Secuencia visual al hacer scroll"
    />
  );
});
