import { Dispatch, RefObject, SetStateAction, useLayoutEffect } from "react";

export const useBufferedResetOnChange = (
  playerRef: RefObject<HTMLAudioElement | null>,
  currentTrackTitle: string = "",
  bufferedSetter: Dispatch<SetStateAction<number>>,
  progressSetter: Dispatch<SetStateAction<number>>
) => {
  useLayoutEffect(
    function resetBufferedTrack() {
      if (
        playerRef.current &&
        !playerRef.current.src.includes(currentTrackTitle)
      ) {
        bufferedSetter(0);
        progressSetter(0);
      }
    },
    [currentTrackTitle, playerRef, bufferedSetter, progressSetter]
  );
};
