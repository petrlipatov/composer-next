import { useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRootStore } from "../../../../shared/contexts/store-context";

export function useSyncUrlWithState() {
  const { urlStore } = useRootStore();
  const searchParamsHook = useSearchParams();

  const initialSelected = useRef<string | null>(
    searchParamsHook.get("selected")
  );
  const initialPlayer = useRef<boolean>(
    Boolean(searchParamsHook.get("player"))
  );

  useLayoutEffect(
    function setInitialUrlState() {
      if (initialSelected.current !== null) {
        urlStore.setSelected(initialSelected.current);
      }
      if (initialPlayer.current) {
        urlStore.setPlayerOpen();
      }
    },
    [urlStore]
  );

  useEffect(
    function updateUrl() {
      const params = new URLSearchParams(window.location.search);

      if (urlStore.selected) {
        params.set("selected", urlStore.selected);
      } else {
        params.delete("selected");
      }

      if (urlStore.isPlayerOpen) {
        params.set("player", "true");
      } else {
        params.delete("player");
      }

      const newSearch = params.toString();
      const newUrl = `${window.location.pathname}${
        newSearch ? "?" + newSearch : ""
      }${window.location.hash}`;

      if (newUrl !== window.location.href) {
        window.history.replaceState(null, "", newUrl);
      }
    },
    [urlStore.selected, urlStore.isPlayerOpen]
  );
}
