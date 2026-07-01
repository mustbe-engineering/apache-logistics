"use client";

import { X } from "@phosphor-icons/react";
import { useEffect } from "react";

type LegalModalProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

export function LegalModal({ open, title, content, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-ink/55" onClick={onClose} aria-label="Cerrar" />
      <div className="relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto bg-base p-6 md:p-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-nav/60 hover:text-nav" aria-label="Cerrar">
          <X size={24} weight="bold" />
        </button>
        <h2 className="font-macro pr-10 text-2xl uppercase tracking-tight text-nav md:text-3xl">{title}</h2>
        <p className="mt-6 whitespace-pre-line text-sm leading-[1.7] text-nav/85 md:text-[0.9375rem]">{content}</p>
      </div>
    </div>
  );
}
