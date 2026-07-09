import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="grain min-h-[100dvh]">
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
