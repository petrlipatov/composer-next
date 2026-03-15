import type { Metadata, Viewport } from "next";
import { ViewportController } from "@/shared/components/layout/viewport-controller";
import { Providers } from "@/shared/providers";
import { ReactNode, Suspense } from "react";
import { UrlSync } from "@/features/url-synchronizer/UrlSync";
import "./globals.css";
import { GoogleAnalytics } from "@/shared/components/layout/google-analytics/GoogleAnalytics";
import { YandexMetrika } from "@/shared/components/layout/yandex-metrika/YandexMetrika";
import { YM_ID } from "@/shared/constants/conf";

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
    "Liza Tikhonova is a professional music composer creating original soundtracks and pieces for films, TV series, and games. Hire for custom scores and licensing.",
  keywords: [
    "Liza Tikhonova",
    "Music Composer",
    "Film Composer",
    "Game Music Composer",
    "Soundtracks",
    "Original Music",
    "Cinematic Music",
    "Orchestral Music",
    "Piano Pieces",
    "Instrumental Music",
    "Music for Film",
    "Music for Games",
    "Sound Design",
  ],
  openGraph: {
    title: "Liza Tikhonova — Music Composer | Soundtracks & Original Pieces",
    description: "Portfolio of music composer Liza Tikhonova. Film scores, game soundtracks, and original compositions.",
    url: "https://lizatikhonova.com",
    siteName: "Liza Tikhonova Music",
    images: [
      {
        url: "https://lizatikhonova.com/opengraph-image.png", // Make sure to create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liza Tikhonova — Music Composer | Soundtracks & Original Pieces",
    description: "Portfolio of music composer Liza Tikhonova. Film scores, game soundtracks, and original compositions.",
    // creator: "@YourTwitterHandle", // Add Twitter handle
    images: ["https://lizatikhonova.com/opengraph-image.png"], // Use the same opengraph image
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
      <YandexMetrika />
      <ViewportController />
      <Providers>
        <body>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Liza Tikhonova",
                "url": "https://lizatikhonova.com",
                "jobTitle": "Music Composer",
                "sameAs": [],
              }),
            }}
          />
          {children}
          {YM_ID && (
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${YM_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          )}
        </body>
      </Providers>
      <Suspense>
        <UrlSync />
      </Suspense>
    </html>
  );
}
