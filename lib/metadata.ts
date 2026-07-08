import type { Metadata } from "next";
import {
  ogDescription,
  ogImage,
  ogImageAlt,
  ogImageHeight,
  ogImageWidth,
  ogTitle,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
} from "./site";

const socialImage = {
  url: ogImage,
  width: ogImageWidth,
  height: ogImageHeight,
  alt: ogImageAlt,
  type: "image/jpeg",
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: "transporte y logística",
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo/icon.ico",
    shortcut: "/logo/icon.ico",
    apple: "/logo/icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["es"],
    url: "/",
    siteName,
    title: ogTitle,
    description: ogDescription,
    images: [socialImage],
    countryName: "México",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
