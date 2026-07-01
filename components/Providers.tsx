"use client";

import { QuoteModalProvider } from "./QuoteModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuoteModalProvider>{children}</QuoteModalProvider>;
}
