import { Artwork } from "@/feature/player/ui/default/artwork/Artwork";
import cn from "classnames";
import s from "./DesktopPlayer.module.css";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { Title } from "@/feature/player/ui/default/title/Title";
import { Controls } from "@/feature/player/ui/default/controls/controls/Controls";
import { TimeTag } from "@/feature/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/feature/player/services/helpers/time";
import { useRef, useState } from "react";
import { ProgressBar } from "@/feature/player/ui/default/progress-bar/progress-bar/ProgressBar";
import { useRootStore } from "@/shared/contexts/store-context";
import { observer } from "mobx-react-lite";

import { useProjectsPlayerController } from "@/feature/player/projects-player/services/hooks/useProjectsPlayerController";
import {
  useLoadingEvents,
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/feature/player/services/hooks";
import type { Props } from "./types";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/feature/player/services/helpers/progress-bar";
import { usePlayNextOnEnd } from "../../services/hooks/usePlayNextOnEnd";
// import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const DesktopPlayer = observer(({ playerRef }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { projectsStore, urlStore, isMobile } = useRootStore();
  const [isSeeking, setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState(false);

  // const { isPlayerOpened, deleteSelected, terminatePlayer } =
  //   useParamsHelpers();

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
      ?.name,
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

    // отпускаем указатель
    trackEl.releasePointerCapture(e.pointerId);
    setIsSeeking(false);
  };

  const nextTrack = (direction: "next" | "prev") => {
    switch (direction) {
      case "next": {
        if (
          projectsStore.playingTrackIndex! <
          projectsStore.playingProjectData!.tracks.length - 1
        ) {
          projectsStore.setPlayingTrackIndex(
            projectsStore.playingTrackIndex! + 1
          );
        } else {
          projectsStore.setPlayingTrackIndex(0);
        }
        break;
      }
      case "prev": {
        if (projectsStore.playingTrackIndex! > 0) {
          projectsStore.setPlayingTrackIndex(
            projectsStore.playingTrackIndex! - 1
          );
        } else {
          projectsStore.setPlayingTrackIndex(
            projectsStore.playingProjectData!.tracks.length - 1
          );
        }
        break;
      }
    }
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
      <Title text={playingProjectData.tracks[playingTrackIndex ?? 0]?.name} />

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
            keyTag={playingProjectData.tracks[playingTrackIndex ?? 0]?.name}
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
