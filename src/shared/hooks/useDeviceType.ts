import { useEffect } from "react";
import { useRootStore } from "../contexts/store-context";

export function useDeviceType() {
  const rooStore = useRootStore();
  useEffect(() => {
    const updateSize = () => {
      rooStore.setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [rooStore]);
}
