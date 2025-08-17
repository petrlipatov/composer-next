import { Piece } from "@/shared/types";
import { RefObject, useEffect } from "react";

type Props = [
  playerRef: RefObject<HTMLAudioElement | null>,
  store: {
    playingPiece: Piece | null;
    isAudioPlaying: boolean;
    setPlayingPiece: (name: string) => void;
  },
  isPlayerOpened: boolean
];

export const usePiecesPlayerController = (
  ...[playerRef, store, isPlayerOpened]: Props
) => {
  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    const { playingPiece, isAudioPlaying } = store;

    if (playingPiece && !isAudioPlaying && !playerRef.current.paused) {
      playerRef.current.pause();
    }

    if (playingPiece && isAudioPlaying) {
      if (!playerRef.current.src.includes(playingPiece.audio)) {
        playerRef.current.src = playingPiece.audio;
      }
      playerRef.current.play();
    }

    if (playingPiece && !isAudioPlaying) {
      if (!playerRef.current.src.includes(playingPiece.audio)) {
        playerRef.current.src = playingPiece.audio;
      }
    }
  }, [
    store,
    store.playingPiece,
    store.isAudioPlaying,
    isPlayerOpened,
    playerRef,
  ]);
};
