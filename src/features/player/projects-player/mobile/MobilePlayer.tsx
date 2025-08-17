import { observer } from "mobx-react-lite";
import cn from "classnames";

import s from "./MobilePlayer.module.css";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { useRootStore } from "@/shared/contexts/store-context";
import type { Props } from "./types";
import { Controls } from "@/features/player/ui/default/controls/controls/Controls";
import { Title } from "@/features/player/ui/default/title/Title";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { TimeTag } from "@/features/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/features/player/services/helpers/time";
import { ProgressBar } from "@/features/player/ui/default/progress-bar/progress-bar/ProgressBar";
import {
  useLoadingEvents,
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/features/player/services/hooks";
import { useProjectsPlayerController } from "@/features/player/projects-player/hooks/useProjectsPlayerController";
import { Trackist } from "@/features/player/ui/extended/tracklist/Tracklist";
import { TracklistHeader } from "@/features/player/ui/extended/tracklist-header/TracklistHeader";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/features/player/services/helpers/progress-bar";
import { usePlayNextOnEnd } from "../hooks/usePlayNextOnEnd";
import { getNextTrackIndex } from "../../services/helpers/player-controls";

export const MobilePlayer = observer(({ playerRef, openVideoPopup }: Props) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { projectsStore, urlStore, isMobile } = useRootStore();

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

  useEffect(() => {
    if (
      !projectsStore.playingProjectData &&
      urlStore.isPlayerOpen &&
      urlStore.selected
    ) {
      projectsStore.setPlayingProjectData(urlStore.selected);
    }
  }, [
    projectsStore.playingProjectData,
    urlStore.isPlayerOpen,
    urlStore.selected,
    projectsStore,
  ]);

  const handleCloseButton = () => {
    projectsStore.resetState();
    urlStore.deleteSelected();
    urlStore.setPlayerClosed();
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

  const nextTrack = (direction: "next" | "prev") => {
    const nextIndex = getNextTrackIndex(
      direction,
      projectsStore.playingTrackIndex!,
      projectsStore.playingProjectData!.tracks.length - 1
    );
    projectsStore.setPlayingTrackIndex(nextIndex);
  };

  const trackClickHandler = (e: MouseEvent<HTMLDivElement>, index: number) => {
    projectsStore.setPlayingTrackIndex(index);
    projectsStore.play();
  };

  const videoClickHandler = () => {
    openVideoPopup(playingProjectData?.video ?? "");
    projectsStore.pause();
    projectsStore.clearPlayingTrackIndex();
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

  const { playingProjectData, playingTrackIndex, isAudioPlaying } =
    projectsStore;

  if (!playingProjectData) {
    return null;
  }

  return (
    <div
      className={cn(s.section, {
        [s.visible]: urlStore.isPlayerOpen && isMobile,
      })}
    >
      <CloseButton className={s.closeButton} onClick={handleCloseButton} />

      <div className={s.project}>
        <TracklistHeader
          projectData={playingProjectData}
          videoClickHandler={videoClickHandler}
        />
        <Trackist
          projectData={playingProjectData}
          playingTrackIndex={playingTrackIndex}
          playingProjectTitle={playingProjectData.title}
          trackClickHandler={trackClickHandler}
          isAudioPlaying={isAudioPlaying}
        />
      </div>

      <div className={s.player}>
        <Title
          text={playingProjectData.tracks[playingTrackIndex ?? 0]?.title}
        />

        <Controls
          isAudioPlaying={projectsStore.isAudioPlaying}
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
