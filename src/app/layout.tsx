import type { Metadata } from "next";
import { ViewportHeight } from "@/shared/components/layout/viewport-height";
import { Providers } from "@/shared/providers";
import { ReactNode, Suspense } from "react";
import { UrlSync } from "@/feature/url-synchronizer/UrlSync";
import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Liza Tikhonova",
  description: "Music Composer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
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
