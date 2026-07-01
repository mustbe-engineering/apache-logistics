"use client";

import { X } from "@phosphor-icons/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Contact } from "./Contact";

type QuoteModalContext = { open: () => void; close: () => void };

const QuoteModalCtx = createContext<QuoteModalContext | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalCtx);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  return (
    <QuoteModalCtx.Provider value={{ open: show, close: hide }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Solicitar cotización">
          <button type="button" className="absolute inset-0 bg-ink/55" onClick={hide} aria-label="Cerrar" />
          <div className="relative z-10 max-h-[90dvh] w-full max-w-5xl overflow-y-auto bg-base p-6 md:p-8">
            <button type="button" onClick={hide} className="absolute right-4 top-4 text-ink/60 hover:text-ink" aria-label="Cerrar">
              <X size={24} weight="bold" />
            </button>
            <Contact />
          </div>
        </div>
      )}
    </QuoteModalCtx.Provider>
  );
}
