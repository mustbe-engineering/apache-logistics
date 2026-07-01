"use client";

import type { ButtonHTMLAttributes } from "react";
import { useQuoteModal } from "./QuoteModalProvider";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function QuoteOpenButton({ className, children, onClick, ...props }: Props) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={(e) => { open(); onClick?.(e); }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
