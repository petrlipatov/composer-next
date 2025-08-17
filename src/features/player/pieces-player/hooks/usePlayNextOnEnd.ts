import { PiecesStore } from "@/shared/stores/pieces-store";
import { RefObject, useEffect } from "react";

type Props = (
  playerRef: RefObject<HTMLAudioElement | null>,
  piecesStore: PiecesStore
) => void;

export const usePlayNextOnEnd: Props = (playerRef, piecesStore) => {
  useEffect(() => {
    const playNext = () => {
      const currTrack = piecesStore.piecesFilteredByTags.find(
        (track) => track.title === piecesStore.playingPiece!.title
      );
      const currTrackIndex = piecesStore.piecesFilteredByTags.indexOf(
        currTrack!
      );

      let nextIndex: number;

      if (currTrackIndex < piecesStore.piecesFilteredByTags.length - 1) {
        nextIndex = currTrackIndex + 1;
      } else {
        nextIndex = 0;
      }

      const nextTrack = piecesStore.piecesFilteredByTags[nextIndex];
      piecesStore.setPlayingPiece(nextTrack.title);
    };

    if (playerRef.current !== null) {
      playerRef.current.addEventListener("ended", playNext);
    }
  }, [playerRef, piecesStore]);
};
