import { useLayoutEffect } from "react";

export function usePageDynamicHeight() {
  useLayoutEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    updateVh();
    window.addEventListener("resize", updateVh);

    return () => window.removeEventListener("resize", updateVh);
  }, []);
}
