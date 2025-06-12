import { usePathname, useSearchParams } from "next/navigation";

export const useParamsHelpers = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const selected = searchParams.get("selected");
  const isPlayerOpened = Boolean(searchParams.get("player"));

  const deleteSelected = () => {
    params.delete("selected");
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const addSelected = (titleToSelect: string) => {
    if (selected === titleToSelect) return;
    params.set("selected", titleToSelect);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const activePlayer = () => {
    params.set("player", "true");
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const terminatePlayer = () => {
    params.delete("player");
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return {
    selected,
    isPlayerOpened,
    deleteSelected,
    addSelected,
    activePlayer,
    terminatePlayer,
  };
};
