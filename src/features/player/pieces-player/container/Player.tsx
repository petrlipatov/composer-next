"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState, PointerEvent, MouseEvent } from "react";

import { TimeTag } from "@/features/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/features/player/services/helpers/time";
import { usePiecesPlayerController } from "@/features/player/pieces-player/hooks/usePiecesPlayerController";
import { ProgressBar } from "@/features/player/ui/default/progress-bar/progress-bar/ProgressBar";
import {
  useProgressTrackUpdate,
  useBufferedTrackUpdate,
  useAudioDuration,
  useAudioCurrentTime,
  useBufferedResetOnChange,
  useLoadingEvents,
} from "@/features/player/services/hooks";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/features/player/services/helpers/progress-bar";

import { useRootStore } from "@/shared/contexts/store-context";
import { findByTitle } from "@/services/common";

import PlayerView from "../ui/PlayerView";
import { usePlayNextOnEnd } from "../hooks/usePlayNextOnEnd";

import type { Props } from "./types";
import { getNextTrackIndex } from "../../services/helpers/player-controls";

export const Player = observer(({ playerRef, openImagePopup }: Props) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setStatus] = useState(false);

  const { piecesStore, urlStore } = useRootStore();
  const { playingPiece, isAudioPlaying } = piecesStore;

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
    playingPiece?.title,
    setBuffered,
    setProgress,
    setCurrentTime
  );

  useEffect(() => {
    if (!playingPiece && urlStore.isPlayerOpen && urlStore.selected) {
      piecesStore.setPlayingPiece(urlStore.selected);
    }
  }, [piecesStore, playingPiece, urlStore.isPlayerOpen, urlStore.selected]);

  const handleCloseButton = () => {
    urlStore.deleteSelected();
    urlStore.setPlayerClosed();
    piecesStore.pause();
  };

  const handlePlayPauseClick = () => {
    piecesStore.togglePlaying();
  };

  const onProgressBarClick = (e: MouseEvent) => {
    const updatedPos = calcRelativeProgress(trackRef, e.clientX);
    seekAudioTo(playerRef, updatedPos, setProgress);
  };

  const handleArtworkClick = (src: string, blurSrc: string) => {
    openImagePopup(src, blurSrc);
  };

  const playNext = (direction: "next" | "prev") => {
    const currTrack = findByTitle(
      piecesStore.piecesFilteredByTags,
      piecesStore.playingPiece!.title
    );
    const currTrackIndex = piecesStore.piecesFilteredByTags.indexOf(currTrack!);

    const nextIndex = getNextTrackIndex(
      direction,
      currTrackIndex,
      piecesStore.piecesFilteredByTags.length - 1
    );

    const nextTrack = piecesStore.piecesFilteredByTags[nextIndex];
    piecesStore.setPlayingPiece(nextTrack.title);
    urlStore.setSelected(nextTrack.title);
  };

  const onTrackPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    trackEl.setPointerCapture(e.pointerId);
    setIsSeeking(true);
    onProgressBarClick(e);
  };

  const onTrackPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    onProgressBarClick(e);
  };

  const onTrackPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    trackEl.releasePointerCapture(e.pointerId);
    setIsSeeking(false);
  };

  if (!playingPiece) {
    return null;
  }

  return (
    <PlayerView
      isPlayerOpened={urlStore.isPlayerOpen}
      isAudioPlaying={isAudioPlaying}
      playingTrack={playingPiece}
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
        keyTag={playingPiece.title}
        onTrackClick={onProgressBarClick}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={onTrackPointerUp}
      />
      <TimeTag time={formatTime(duration)} />
    </PlayerView>
  );
});
