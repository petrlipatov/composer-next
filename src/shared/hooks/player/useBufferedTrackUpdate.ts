import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useBufferedTrackUpdate = (
  playerRef: RefObject<HTMLAudioElement | null>,
  bufferedSetter: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const audio = playerRef.current;
    if (!audio) {
      return;
    }

    const updateBuffer = () => {
      if (!audio.duration) {
        return;
      }

      const bufferedRanges = audio.buffered;
      if (bufferedRanges.length) {
        const end = bufferedRanges.end(bufferedRanges.length - 1);

        const percent = (end / audio.duration) * 100;
        bufferedSetter(percent);
      }
    };

    audio.addEventListener("timeupdate", updateBuffer);
    audio.addEventListener("play", updateBuffer);

    return () => {
      audio.removeEventListener("progress", updateBuffer);
    };
  }, [playerRef, bufferedSetter]);
};
