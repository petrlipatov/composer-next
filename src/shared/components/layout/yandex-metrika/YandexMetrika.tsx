"use client";

import { YM_ID } from "@/shared/constants/conf";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Script from "next/script";

type WindowWithYm = Window & {
  ym: (id: unknown, action: string, options?: unknown) => void;
};

export function YandexMetrika() {
  const pathname = usePathname();
  const isFirstPageLoad = useRef(true);

  useEffect(() => {
    if (isFirstPageLoad.current) {
      isFirstPageLoad.current = false;
      return;
    }

    if (typeof (window as unknown as WindowWithYm).ym === "function") {
      (window as unknown as WindowWithYm).ym(YM_ID, "hit", pathname);
    }
  }, [pathname]);

  if (!YM_ID) {
    return null;
  }

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

        ym(${YM_ID}, 'init', {
          ssr:true,
          webvisor:true,
          clickmap:true,
          ecommerce:"dataLayer",
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce:true,
          trackLinks:true
        });
      `}
    </Script>
  );
}
