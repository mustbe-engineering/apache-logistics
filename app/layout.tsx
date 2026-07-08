import localFont from "next/font/local";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const stretchPro = localFont({
  src: "./fonts/StretchPro.otf",
  variable: "--font-stretch-pro",
  display: "swap",
  preload: false,
});

const pretendard = localFont({
  src: [
    { path: "./fonts/pretendard/Pretendard-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/pretendard/Pretendard-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/pretendard/Pretendard-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: false,
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${stretchPro.variable} ${pretendard.variable}`}>
      <body className="grain min-h-[100dvh]">
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
