import { PiecesStore } from "@/shared/stores/pieces-store";
import { RefObject, useEffect } from "react";

type Props = (
  playerRef: RefObject<HTMLAudioElement | null>,
  piecesStore: PiecesStore
) => void;

export const usePlayNextOnEnd: Props = (playerRef, piecesStore) => {
  useEffect(() => {
    const playNext = () => {
      const currTrack = piecesStore.tracksFilteredByTags.find(
        (track) => track.title === piecesStore.playingTrack!.title
      );
      const currTrackIndex = piecesStore.tracksFilteredByTags.indexOf(
        currTrack!
      );

      let nextIndex: number;

      if (currTrackIndex < piecesStore.tracksFilteredByTags.length - 1) {
        nextIndex = currTrackIndex + 1;
      } else {
        nextIndex = 0;
      }

      const nextTrack = piecesStore.tracksFilteredByTags[nextIndex];
      piecesStore.setPlayingTrack(nextTrack.title);
    };

    if (playerRef.current !== null) {
      playerRef.current.addEventListener("ended", playNext);
    }
  }, [playerRef, piecesStore]);
};
