"use client";

import { ReactNode } from "react";
import { rootStore } from "@/shared/stores";
import { RootStoreContext } from "../contexts/store-context";

export function Providers({ children }: { children: ReactNode }) {
  
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}
