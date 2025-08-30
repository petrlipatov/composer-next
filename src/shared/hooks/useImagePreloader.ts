"use client";
import { useEffect, useRef } from "react";
import { useViewportSize } from "./useViewportSize";

interface PreloaderOptions {
  quality?: number;
  width?: number;
  nextImageOptimization?: boolean;
  delay?: number;
}

export function useImagePreloader(
  sources: string[],
  options: PreloaderOptions = {}
) {
  const {
    quality = 75,
    width = 128,
    nextImageOptimization = true,
    delay = 1500,
  } = options;

  const { width: viewportWidth } = useViewportSize();
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (sources.length === 0 || viewportWidth > 720) {
      return;
    }

    const thresholds = [256, 384, 640];
    const imageRealWidth = 190;
    const clampedDPR = Math.min(window.devicePixelRatio, 3);
    const imageWidthAccToDevice = imageRealWidth * clampedDPR;

    const imageThresholdWidth =
      thresholds.find((t) => imageWidthAccToDevice <= t) ?? 256;

    timerRef.current = setTimeout(() => {
      sources.forEach((src) => {
        const img = new Image();
        img.src = nextImageOptimization
          ? `/_next/image?url=${encodeURIComponent(src)}&w=${
              imageThresholdWidth ?? width
            }&q=${quality}`
          : src;
      });
    }, delay);
  }, [delay, nextImageOptimization, quality, width, viewportWidth, sources]);
}
