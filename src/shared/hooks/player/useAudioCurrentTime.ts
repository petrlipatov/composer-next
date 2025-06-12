import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useAudioCurrentTime = (
  playerRef: RefObject<HTMLAudioElement | null>,
  timeSetter: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const audio = playerRef.current;
    if (!audio) {
      return;
    }

    const updateTime = (e: Event) => {
      const time = (e.currentTarget as HTMLAudioElement).currentTime;
      timeSetter(Math.round(time));
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [playerRef, timeSetter]);
};
