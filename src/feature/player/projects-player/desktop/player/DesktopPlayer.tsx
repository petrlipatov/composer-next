import { Artwork } from "@/feature/player/ui/default/artwork/Artwork";
import cn from "classnames";
import s from "./DesktopPlayer.module.css";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { Title } from "@/feature/player/ui/default/title/Title";
import { Controls } from "@/feature/player/ui/default/controls/controls/Controls";
import { TimeTag } from "@/feature/player/ui/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/feature/player/services/helpers/time";
import { useEffect, useRef, useState } from "react";
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
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const DesktopPlayer = observer(({ playerRef }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { projectsStore, isMobile } = useRootStore();

  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isPlayerOpened, deleteSelected, terminatePlayer } =
    useParamsHelpers();

  useLoadingEvents(playerRef, setStatus);
  useProgressTrackUpdate(playerRef, setProgress);
  useBufferedTrackUpdate(playerRef, setBuffered);
  useAudioDuration(playerRef, setDuration);
  useAudioCurrentTime(playerRef, setCurrentTime);

  useProjectsPlayerController(
    playerRef,
    projectsStore,
    isPlayerOpened,
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
    deleteSelected();
    terminatePlayer();
  };

  const handlePlayPauseClick = () => {
    if (!projectsStore.playingTrackIndex) {
      projectsStore.setPlayingTrackIndex(0);
    }
    projectsStore.togglePlaying();
  };

  const playNext = (name: string) => {
    console.log(name);
  };

  const onProgressBarClick = (e: React.MouseEvent) => {
    const pct = calcRelativeProgress(trackRef, e.clientX);
    seekAudioTo(playerRef, pct, setProgress);
  };

  const { playingProjectData, isAudioPlaying, playingTrackIndex } =
    projectsStore;

  if (playingProjectData === null || !isClient) {
    return null;
  }

  return (
    <div className={cn(s.player, { [s.active]: isPlayerOpened && !isMobile })}>
      <Artwork className={s.artwork} src={playingProjectData.image} />
      <CloseButton className={s.closeButton} onClick={handleCloseButton} />

      <Title text={playingProjectData.tracks[playingTrackIndex ?? 0]?.name} />

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
