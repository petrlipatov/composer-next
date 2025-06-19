import type { Metadata, Viewport } from "next";
import { ViewportHeight } from "@/shared/components/layout/viewport-height";
import { Providers } from "@/shared/providers";
import { ReactNode, Suspense } from "react";
import { UrlSync } from "@/feature/url-synchronizer/UrlSync";
import "@/shared/styles/globals.css";
import { GoogleAnalytics } from "@/shared/components/layout/google-analytics/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Liza Tikhonova",
  description: "Music Composer",
  openGraph: {
    type: "website",
    url: "https://lizatikhonova.com/",
    title: "Liza Tikhonova",
    description: "Music Composer",
    images: [
      {
        url: "/pieces/day-in-may.webp",
        width: 600,
        height: 600,
        alt: "img",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <ViewportHeight />
      <Providers>
        <body>{children}</body>
      </Providers>
      <Suspense>
        <UrlSync />
      </Suspense>
    </html>
  );
}
