import { Project } from "@/shared/types";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}
type Props = [
  playerRef: RefObject<HTMLAudioElement | null>,
  store: {
    playingTrackIndex: number | null;
    isAudioPlaying: boolean;
    playingProjectData: Project | null;
  },
  isPlayerOpened: boolean,
  setBuffered: Dispatch<SetStateAction<number>>,
  setProgress: Dispatch<SetStateAction<number>>
];

export const useProjectsPlayerController = (
  ...[playerRef, store, isPlayerOpened, setBuffered, setProgress]: Props
) => {
  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    if (
      // pause
      isNumber(store.playingTrackIndex) &&
      !store.isAudioPlaying &&
      isPlayerOpened
    ) {
      playerRef.current.pause();
    }

    // console.log("isNumber", isNumber(store.playingTrackIndex));
    // console.log("store.playingProjectData", store.playingProjectData);
    // console.log("store.isAudioPlaying", store.isAudioPlaying);
    // console.log("isPlayerOpened", isPlayerOpened);
    if (
      // play
      // and update source if changed
      isNumber(store.playingTrackIndex) &&
      store.playingProjectData &&
      store.isAudioPlaying &&
      isPlayerOpened
    ) {
      const currAudioSrc =
        store.playingProjectData.tracks[store.playingTrackIndex]?.audio;

      if (!playerRef.current.src.includes(currAudioSrc)) {
        playerRef.current.src = currAudioSrc;
      }

      playerRef.current.play().catch(console.log);
    }

    if (
      // load new source
      // if track was change on pause
      isNumber(store.playingTrackIndex) &&
      store.playingProjectData &&
      !store.isAudioPlaying &&
      isPlayerOpened
    ) {
      const currAudioSrc =
        store.playingProjectData.tracks[store.playingTrackIndex]?.audio;

      if (!playerRef.current.src.includes(currAudioSrc)) {
        playerRef.current.src = currAudioSrc;
        playerRef.current.load();
      }
    }

    // another project clicked
    // and playingTrackIndex reseted
    if (
      !isNumber(store.playingTrackIndex) &&
      !store.isAudioPlaying &&
      store.playingProjectData &&
      isPlayerOpened
    ) {
      playerRef.current.src = "";
      setProgress(0);
      setBuffered(0);
    }

    // remove source and reset player state
    // if player was reset
    if (
      !store.playingTrackIndex &&
      !store.playingProjectData &&
      !store.isAudioPlaying
    ) {
      playerRef.current.src = "";
      setProgress(0);
      setBuffered(0);
    }

    if (
      // remove source and reset player state
      // if player was closed
      !isPlayerOpened
    ) {
      playerRef.current.src = "";
      setProgress(0);
      setBuffered(0);
    }
  }, [
    store.playingProjectData,
    store.playingTrackIndex,
    store.isAudioPlaying,
    store,
    isPlayerOpened,
    playerRef,
    setProgress,
    setBuffered,
  ]);
};
