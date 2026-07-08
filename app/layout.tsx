import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import {
  ogImage,
  ogImageAlt,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo/icon.ico",
    shortcut: "/logo/icon.ico",
    apple: "/logo/icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

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
