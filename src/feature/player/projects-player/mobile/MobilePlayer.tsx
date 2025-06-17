import { observer } from "mobx-react-lite";
import cn from "classnames";

import s from "./MobilePlayer.module.css";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { useRootStore } from "@/shared/contexts/store-context";
import type { Props } from "./types";
import { Controls } from "@/feature/player/ui/default/controls/controls/Controls";
import { Title } from "@/feature/player/ui/default/title/Title";
import { MouseEvent, useRef, useState } from "react";
import { TimeTag } from "@/feature/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/feature/player/services/helpers/time";
import { ProgressBar } from "@/feature/player/ui/default/progress-bar/progress-bar/ProgressBar";
import {
  useLoadingEvents,
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/feature/player/services/hooks";
import { useProjectsPlayerController } from "@/feature/player/projects-player/services/hooks/useProjectsPlayerController";
import { Trackist } from "@/feature/player/ui/extended/tracklist/Tracklist";
import { TracklistHeader } from "@/feature/player/ui/extended/tracklist-header/TracklistHeader";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/feature/player/services/helpers/progress-bar";
import { usePlayNextOnEnd } from "../services/hooks/usePlayNextOnEnd";

export const MobilePlayer = observer(({ playerRef }: Props) => {
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
      ?.name,
    setBuffered,
    setProgress,
    setCurrentTime
  );

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

  const trackClickHandler = (e: MouseEvent<HTMLDivElement>, index: number) => {
    projectsStore.setPlayingTrackIndex(index);
    projectsStore.play();
  };

  const videoClickHandler = () => {
    projectsStore.openPopup(playingProjectData?.video ?? "");
    projectsStore.pause();
    projectsStore.clearPlayingTrackIndex();
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
          playingProjectTitle={playingProjectData.name}
          trackClickHandler={trackClickHandler}
          isAudioPlaying={isAudioPlaying}
        />
      </div>

      <div className={s.player}>
        <Title text={playingProjectData.tracks[playingTrackIndex ?? 0]?.name} />

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
            keyTag={playingProjectData.tracks[playingTrackIndex ?? 0]?.name}
          />
          <TimeTag time={formatTime(duration)} />
        </div>
      </div>
    </div>
  );
});
