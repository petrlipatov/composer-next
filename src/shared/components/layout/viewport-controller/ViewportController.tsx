"use client";

import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { usePageDynamicHeight } from "@/shared/hooks/usePageDynamicHeight";
import { useEffect } from "react";

export const ViewportController = () => {
  usePageDynamicHeight();
  useDeviceType();

  useEffect(() => {
    const handleOrientationChange = () => {
      window.location.reload();
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return null;
};
