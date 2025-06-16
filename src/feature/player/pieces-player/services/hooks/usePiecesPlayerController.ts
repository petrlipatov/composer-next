import { Track } from "@/shared/types";
import { RefObject, useEffect } from "react";

type Props = [
  playerRef: RefObject<HTMLAudioElement | null>,
  store: {
    playingTrack: Track | null;
    isAudioPlaying: boolean;
    setPlayingTrack: (name: string) => void;
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

    const { playingTrack, isAudioPlaying } = store;

    if (playingTrack && !isAudioPlaying && !playerRef.current.paused) {
      playerRef.current.pause();
    }

    if (playingTrack && isAudioPlaying) {
      if (!playerRef.current.src.includes(playingTrack.audio)) {
        playerRef.current.src = playingTrack.audio;
      }
      playerRef.current.play();
    }

    if (playingTrack && !isAudioPlaying) {
      if (!playerRef.current.src.includes(playingTrack.audio)) {
        playerRef.current.src = playingTrack.audio;
      }
    }
  }, [
    store.playingTrack,
    store.isAudioPlaying,
    store,
    isPlayerOpened,
    playerRef,
  ]);
};
