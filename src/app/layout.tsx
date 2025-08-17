import type { Metadata, Viewport } from "next";
import { ViewportController } from "@/shared/components/layout/viewport-controller";
import { Providers } from "@/shared/providers";
import { ReactNode, Suspense } from "react";
import { UrlSync } from "@/features/url-synchronizer/UrlSync";
import "./globals.css";
import { GoogleAnalytics } from "@/shared/components/layout/google-analytics/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Liza Tikhonova — Music Composer | Soundtracks & Original Pieces",
  description:
    "Liza Tikhonova is a professional music composer creating original soundtracks and pieces for films, TV series, and games.",
  keywords: [
    "Liza Tikhonova",
    "Music Composer",
    "Film Composer",
    "Soundtracks",
    "Original Music",
    "Game Music",
    "Cinematic Music",
    "Piano Pieces",
    "Instrumental Music",
  ],
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://lizatikhonova.com/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <ViewportController />
      <Providers>
        <body>{children}</body>
      </Providers>
      <Suspense>
        <UrlSync />
      </Suspense>
    </html>
  );
}
