import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useLoadingEvents = (
  playerRef: RefObject<HTMLAudioElement | null>,
  loadingSetter: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const audio = playerRef.current;
    if (!audio) {
      return;
    }

    const setLoading = () => loadingSetter(true);
    const setPlaying = () => loadingSetter(false);

    audio.addEventListener("waiting", setLoading);
    audio.addEventListener("playing", setPlaying);

    return () => {
      audio.removeEventListener("waiting", setLoading);
      audio.removeEventListener("playing", setPlaying);
    };
  }, [playerRef, loadingSetter]);
};

export default useLoadingEvents;
