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
  const { quality = 75, width = 384, optimize = true, delay = 2000 } = options;

  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (sources.length === 0) return;

    timerRef.current = setTimeout(() => {
      sources.forEach((src) => {
        const img = new Image();
        img.src = optimize
          ? `/_next/image?url=${encodeURIComponent(
              src
            )}&w=${width}&q=${quality}`
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
