"use client";

import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { usePageDynamicHeight } from "@/shared/hooks/usePageDynamicHeight";

export const ViewportHeight = () => {
  usePageDynamicHeight();
  useDeviceType();
  return null;
};
