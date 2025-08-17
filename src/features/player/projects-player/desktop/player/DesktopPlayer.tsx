import { Artwork } from "@/features/player/ui/default/artwork/Artwork";
import cn from "classnames";
import s from "./DesktopPlayer.module.css";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { Title } from "@/features/player/ui/default/title/Title";
import { Controls } from "@/features/player/ui/default/controls/controls/Controls";
import { TimeTag } from "@/features/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/features/player/services/helpers/time";
import { useRef, useState } from "react";
import { ProgressBar } from "@/features/player/ui/default/progress-bar/progress-bar/ProgressBar";
import { useRootStore } from "@/shared/contexts/store-context";
import { observer } from "mobx-react-lite";

import { useProjectsPlayerController } from "@/features/player/projects-player/hooks/useProjectsPlayerController";
import {
  useLoadingEvents,
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/features/player/services/hooks";
import type { Props } from "./types";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/features/player/services/helpers/progress-bar";
import { usePlayNextOnEnd } from "../../hooks/usePlayNextOnEnd";
import { getNextTrackIndex } from "@/features/player/services/helpers/player-controls";

export const DesktopPlayer = observer(({ playerRef }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { projectsStore, urlStore, isMobile } = useRootStore();
  const [isSeeking, setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState(false);

  useLoadingEvents(playerRef, setStatus);
  useProgressTrackUpdate(playerRef, setProgress);
  useBufferedTrackUpdate(playerRef, setBuffered);
  useAudioDuration(playerRef, setDuration);
  useAudioCurrentTime(playerRef, setCurrentTime);
  usePlayNextOnEnd(playerRef, projectsStore);

  useProjectsPlayerController(
    playerRef,
    projectsStore,
    urlStore.isPlayerOpen,
    setBuffered,
    setProgress
  );

  useBufferedResetOnChange(
    playerRef,
    projectsStore.playingProjectData?.tracks[projectsStore.playingTrackIndex!]
      ?.title,
    setBuffered,
    setProgress,
    setCurrentTime
  );

  const handleCloseButton = () => {
    urlStore.deleteSelected();
    urlStore.setPlayerClosed();
    projectsStore.resetState();
  };

  const handlePlayPauseClick = () => {
    if (!projectsStore.playingTrackIndex) {
      projectsStore.setPlayingTrackIndex(0);
    }
    projectsStore.togglePlaying();
  };

  const onProgressBarClick = (e: React.MouseEvent) => {
    const pct = calcRelativeProgress(trackRef, e.clientX);
    seekAudioTo(playerRef, pct, setProgress);
  };

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    trackEl.setPointerCapture(e.pointerId);
    setIsSeeking(true);
    onProgressBarClick(e);
  };

  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isSeeking) return;

    onProgressBarClick(e);
  };

  const onTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    trackEl.releasePointerCapture(e.pointerId);
    setIsSeeking(false);
  };

  const nextTrack = (direction: "next" | "prev") => {
    const nextIndex = getNextTrackIndex(
      direction,
      projectsStore.playingTrackIndex!,
      projectsStore.playingProjectData!.tracks.length - 1
    );
    projectsStore.setPlayingTrackIndex(nextIndex);
  };

  const { playingProjectData, isAudioPlaying, playingTrackIndex } =
    projectsStore;

  if (playingProjectData === null) {
    return null;
  }

  return (
    <div
      className={cn(s.player, {
        [s.active]: urlStore.isPlayerOpen && !isMobile,
      })}
    >
      <Artwork className={s.artwork} src={playingProjectData.image} />
      <CloseButton className={s.closeButton} onClick={handleCloseButton} />
      <Title text={playingProjectData.tracks[playingTrackIndex ?? 0]?.title} />

      <div className={s.controlsProgressContainer}>
        <Controls
          isAudioPlaying={isAudioPlaying}
          playHandler={handlePlayPauseClick}
          playPrev={() => nextTrack("prev")}
          playNext={() => nextTrack("next")}
        />
        <div className={s.progressContainer}>
          <TimeTag time={formatTime(currentTime)} />
          <ProgressBar
            isLoading={status}
            progress={progress}
            buffered={buffered}
            barRef={trackRef}
            onTrackClick={onProgressBarClick}
            keyTag={playingProjectData.tracks[playingTrackIndex ?? 0]?.title}
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
          />
          <TimeTag time={formatTime(duration)} />
        </div>
      </div>
    </div>
  );
});
