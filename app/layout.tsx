import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const stretchPro = localFont({
  src: "./fonts/StretchPro.otf",
  variable: "--font-stretch-pro",
  display: "swap",
});

const pretendard = localFont({
  src: [
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
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
    <html lang="es" className={`${archivo.variable} ${stretchPro.variable} ${pretendard.variable}`}>
      <body className="grain min-h-[100dvh]">{children}</body>
    </html>
  );
}
