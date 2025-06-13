import { useEffect, useRef } from "react";

interface PreloaderOptions {
  quality?: number;
  width?: number;
  optimize?: boolean;
  delay?: number;
}

export function useImagePreloader(
  sources: string[],
  options: PreloaderOptions = {}
) {
  const { quality = 75, width = 384, optimize = true, delay = 1500 } = options;

  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const widthAccToDevice = window.devicePixelRatio === 2 ? 384 : 640;

    console.log("to preload", sources);
    if (sources.length === 0) return;

    timerRef.current = setTimeout(() => {
      console.log("timeout set");
      sources.forEach((src) => {
        console.log("preload", src);
        const img = new Image();
        img.src = optimize
          ? `/_next/image?url=${encodeURIComponent(src)}&w=${
              widthAccToDevice ?? width
            }&q=${quality}`
          : src;
      });
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay, optimize, quality, width, sources]);
}
