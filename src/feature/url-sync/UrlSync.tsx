"use client";
import { observer } from "mobx-react-lite";
import { useSyncUrlWithState } from "./services/hooks/useSyncUrlWithState";

export const UrlSync = observer(() => {
  useSyncUrlWithState();
  return null;
});
