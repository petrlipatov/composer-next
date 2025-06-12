import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useAudioDuration = (
  playerRef: RefObject<HTMLAudioElement | null>,
  durationSetter: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const audio = playerRef.current;
    if (!audio) {
      return;
    }

    const updateDuration = (e: Event) =>
      durationSetter((e.target as HTMLAudioElement).duration);

    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [playerRef, durationSetter]);
};
