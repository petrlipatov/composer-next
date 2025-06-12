import { createContext, useContext } from "react";
import { rootStore } from "@/shared/stores";

export const RootStoreContext = createContext(rootStore);
export const useRootStore = () => useContext(RootStoreContext);
