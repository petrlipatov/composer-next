"use client";
import { useLayoutEffect, useRef } from "react";
import { updateViewportCssVariables } from "../utils/viewport";

export function usePageDynamicHeight() {
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useLayoutEffect(() => {
    const fixLayout = () => {
      updateViewportCssVariables();
      window.scrollTo(0, 0);
    };

    // --- For modern browsers with visualViewport support ---
    if (window.visualViewport) {
      fixLayout();
      window.visualViewport.addEventListener("resize", fixLayout);
      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener("resize", fixLayout);
        }
      };
    }

    // --- Fallback for older browsers ---
    const clearTimers = () => {
      timersRef.current.forEach((timerId) => clearTimeout(timerId));
      timersRef.current = [];
    };

    const handleOrientationChange = () => {
      clearTimers();
      const newTimers = [
        setTimeout(fixLayout, 100),
        setTimeout(fixLayout, 300),
        setTimeout(fixLayout, 500),
      ];
      timersRef.current = newTimers;
    };

    // Initial call for fallback
    fixLayout();

    window.addEventListener("resize", fixLayout);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", fixLayout);
      window.removeEventListener("orientationchange", handleOrientationChange);
      clearTimers();
    };
  }, []);
}
