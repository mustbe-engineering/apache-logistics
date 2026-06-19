import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Apache Logistics | Transporte de carga en el noroeste",
  description:
    "Transporte de carga especializado en el noroeste de México con monitoreo avanzado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="grain min-h-[100dvh]">{children}</body>
    </html>
  );
}
