import { Track } from "@/shared/types";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Props = [
  playerRef: RefObject<HTMLAudioElement | null>,
  store: {
    playingTrack: Track | null;
    // selectedTrack: Track | null;
    isAudioPlaying: boolean;
    setPlayingTrack: (name: string) => void;
  },
  //   selectedTrack: string | null,
  isPlayerOpened: boolean,
  setBuffered: Dispatch<SetStateAction<number>>,
  setProgress: Dispatch<SetStateAction<number>>
];

export const usePiecesPlayerController = (
  ...[playerRef, store, isPlayerOpened, setProgress, setBuffered]: Props
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
  }, [
    store.playingTrack,
    store.isAudioPlaying,
    store,
    isPlayerOpened,
    playerRef,
    setProgress,
    setBuffered,
  ]);
};
