import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useProgressTrackUpdate = (
  playerRef: RefObject<HTMLAudioElement | null>,
  progressSetter: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const audio = playerRef?.current;
    if (!audio) return;

    const update = () => {
      if (audio.duration) {
        progressSetter((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [playerRef, progressSetter]);
};
