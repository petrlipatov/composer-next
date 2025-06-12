import { Artwork } from "@/components/ui/player/default/artwork/Artwork";
import cn from "classnames";
import s from "./DesktopPlayer.module.css";
import { CloseButton } from "@/components/ui/close-button/CloseButton";
import { Title } from "@/components/ui/player/default/title/Title";
import { Controls } from "@/components/ui/player/default/controls/controls/Controls";
import { TimeTag } from "@/components/ui/player/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/shared/helpers/player.helpers";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "@/components/ui/player/default/progress-bar/progress-bar/ProgressBar";
import { useRootStore } from "@/shared/contexts/store-context";
import { observer } from "mobx-react-lite";
import useLoadingEvents from "@/shared/hooks/player/useLoadingEvents";
import { useProjectsPlayerController } from "@/shared/hooks/player/useProjectsPlayerController";
import {
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/shared/hooks/player";
import type { Props } from "./types";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/shared/helpers/player.helpers";
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
    setProgress
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
