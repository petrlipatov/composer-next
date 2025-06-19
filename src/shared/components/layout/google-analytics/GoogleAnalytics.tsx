"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";
import { GA_ID } from "@/shared/constants/conf";

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      {/* Загрузка библиотеки gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Инициализация dataLayer и первого pageview */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
