"use client";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/shared/contexts/store-context";
import { useEffect, useRef, useState } from "react";
import { TimeTag } from "@/feature/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/feature/player/services/helpers/time";
import { ProgressBar } from "@/feature/player/ui/default/progress-bar/progress-bar/ProgressBar";
import {
  useProgressTrackUpdate,
  useBufferedTrackUpdate,
  useAudioDuration,
  useAudioCurrentTime,
  useBufferedResetOnChange,
  useLoadingEvents,
} from "@/feature/player/services/hooks";

import { PIECES } from "@/shared/constants/content";
import { usePiecesPlayerController } from "@/feature/player/pieces-player/services/hooks/usePiecesPlayerController";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/feature/player/services/helpers/progress-bar";
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";
import PlayerView from "../view/PlayerView";

import type { Props } from "./types";
import { usePlayNextOnEnd } from "../services/hooks/usePlayNextOnEnd";

export const Player = observer(({ playerRef }: Props) => {
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setStatus] = useState(false);

  const { piecesStore, urlStore } = useRootStore();
  const { playingTrack, isAudioPlaying } = piecesStore;

  const {
    // selected,
    // isPlayerOpened,
    // addSelected,
    // deleteSelected,
    // terminatePlayer,
  } = useParamsHelpers();

  const trackRef = useRef<HTMLDivElement>(null);

  useLoadingEvents(playerRef, setStatus);
  useProgressTrackUpdate(playerRef, setProgress);
  useBufferedTrackUpdate(playerRef, setBuffered);
  useAudioDuration(playerRef, setDuration);
  useAudioCurrentTime(playerRef, setCurrentTime);

  usePiecesPlayerController(playerRef, piecesStore, urlStore.isPlayerOpen);
  usePlayNextOnEnd(playerRef, piecesStore);

  useBufferedResetOnChange(
    playerRef,
    playingTrack?.title,
    setBuffered,
    setProgress,
    setCurrentTime
  );

  useEffect(() => {
    if (!playingTrack && urlStore.isPlayerOpen && urlStore.selected) {
      piecesStore.setPlayingTrack(urlStore.selected);
    }
  }, [piecesStore, playingTrack, urlStore.isPlayerOpen, urlStore.selected]);

  const handleCloseButton = () => {
    urlStore.deleteSelected();
    urlStore.setPlayerClosed();
    piecesStore.pause();
  };

  const handlePlayPauseClick = () => {
    piecesStore.togglePlaying();
  };

  const onProgressBarClick = (e: React.MouseEvent) => {
    const updatedPos = calcRelativeProgress(trackRef, e.clientX);
    seekAudioTo(playerRef, updatedPos, setProgress);
  };

  const handleArtworkClick = (src: string) => {
    piecesStore.openImagePopup(src);
  };

  const playNext = (direction: "next" | "prev") => {
    const currTrack = piecesStore.tracksFilteredByTags.find(
      (track) => track.title === piecesStore.playingTrack!.title
    );
    const currTrackIndex = piecesStore.tracksFilteredByTags.indexOf(currTrack!);

    let nextIndex: number;

    switch (direction) {
      case "next": {
        if (currTrackIndex < piecesStore.tracksFilteredByTags.length - 1) {
          nextIndex = currTrackIndex + 1;
        } else {
          nextIndex = 0;
        }
        break;
      }
      case "prev": {
        if (currTrackIndex > 0) {
          nextIndex = currTrackIndex - 1;
        } else {
          nextIndex = PIECES.length - 1;
        }
        break;
      }
    }

    const nextTrack = piecesStore.tracksFilteredByTags[nextIndex];
    piecesStore.setPlayingTrack(nextTrack.title);
    urlStore.setSelected(nextTrack.title);
  };

  if (!playingTrack) {
    return null;
  }

  return (
    <PlayerView
      isPlayerOpened={urlStore.isPlayerOpen}
      isAudioPlaying={isAudioPlaying}
      playingTrack={playingTrack}
      handleCloseButton={handleCloseButton}
      handlePlayPauseClick={handlePlayPauseClick}
      handlePlayNextClick={playNext}
      handleArtworkClick={handleArtworkClick}
    >
      <TimeTag time={formatTime(currentTime)} />
      <ProgressBar
        isLoading={loading}
        progress={progress}
        buffered={buffered}
        barRef={trackRef}
        keyTag={playingTrack.title}
        onTrackClick={onProgressBarClick}
      />
      <TimeTag time={formatTime(duration)} />
    </PlayerView>
  );
});
