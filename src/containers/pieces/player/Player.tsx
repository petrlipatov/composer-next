"use client";
import { observer } from "mobx-react-lite";
import s from "./Player.module.css";
import type { Props } from "./types";
import { useRootStore } from "@/shared/contexts/store-context";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { CloseButton } from "@/components/ui/close-button/CloseButton";
import { Artwork } from "@/components/ui/player/default/artwork/Artwork";
import { Title } from "@/components/ui/player/default/title/Title";
import { TimeTag } from "@/components/ui/player/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/shared/helpers/player.helpers";
import { ProgressBar } from "@/components/ui/player/default/progress-bar/progress-bar/ProgressBar";
import {
  useProgressTrackUpdate,
  useBufferedTrackUpdate,
  useAudioDuration,
  useAudioCurrentTime,
  useBufferedResetOnChange,
} from "@/shared/hooks/player";
import { Controls } from "@/components/ui/player/default/controls/controls/Controls";
import useLoadingEvents from "@/shared/hooks/player/useLoadingEvents";
import { PIECES } from "@/shared/constants/content";
import { usePiecesPlayerController } from "@/shared/hooks/player/usePiecesPlayerController";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/shared/helpers/player.helpers";
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const Player = observer(({ playerRef }: Props) => {
  const { piecesStore } = useRootStore();

  const {
    selected,
    isPlayerOpened,
    addSelected,
    deleteSelected,
    terminatePlayer,
  } = useParamsHelpers();

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setStatus] = useState(false);

  useLoadingEvents(playerRef, setStatus);
  useProgressTrackUpdate(playerRef, setProgress);
  useBufferedTrackUpdate(playerRef, setBuffered);
  useAudioDuration(playerRef, setDuration);
  useAudioCurrentTime(playerRef, setCurrentTime);

  usePiecesPlayerController(
    playerRef,
    piecesStore,
    isPlayerOpened,
    setBuffered,
    setProgress
  );

  useBufferedResetOnChange(
    playerRef,
    piecesStore.playingTrack?.title,
    setBuffered,
    setProgress
  );

  useEffect(() => {
    if (!piecesStore.playingTrack && isPlayerOpened && selected) {
      piecesStore.setPlayingTrack(selected);
    }
  }, [piecesStore, piecesStore.playingTrack, isPlayerOpened, selected]);

  const handleCloseButton = () => {
    deleteSelected();
    terminatePlayer();
    if (piecesStore.isAudioPlaying) {
      piecesStore.togglePlaying();
    }
  };

  const handlePlayPauseClick = () => {
    piecesStore.togglePlaying();
  };

  const onProgressBarClick = (e: React.MouseEvent) => {
    const updatedPos = calcRelativeProgress(trackRef, e.clientX);
    seekAudioTo(playerRef, updatedPos, setProgress);
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
    addSelected(nextTrack.title);
  };

  const { playingTrack, isAudioPlaying } = piecesStore;

  if (!playingTrack) {
    return null;
  }

  return (
    <div className={cn(s.player, { [s.visible]: isPlayerOpened })}>
      <Artwork
        sizes={"(max-width: 900px) 10vw, 5vw"}
        className={s.artwork}
        src={playingTrack.image}
      />

      <CloseButton className={s.closeButton} onClick={handleCloseButton} />
      <Title text={playingTrack.title} />

      <div className={s.controlsProgressContainer}>
        <Controls
          isAudioPlaying={isAudioPlaying}
          playHandler={handlePlayPauseClick}
          playPrev={() => playNext("prev")}
          playNext={() => playNext("next")}
        />

        <div className={s.progressContainer}>
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
        </div>
      </div>
    </div>
  );
});
