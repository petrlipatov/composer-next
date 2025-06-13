import { observer } from "mobx-react-lite";
import cn from "classnames";

import s from "./MobilePlayer.module.css";
import { CloseButton } from "@/components/ui/close-button/CloseButton";
import { useRootStore } from "@/shared/contexts/store-context";
import type { Props } from "./types";
import { Controls } from "@/components/ui/player/default/controls/controls/Controls";
import { Title } from "@/components/ui/player/default/title/Title";
import { MouseEvent, useRef, useState } from "react";
import { TimeTag } from "@/components/ui/player/default/progress-bar/time-tag/TimeTag";
import { formatTime } from "@/shared/helpers/player.helpers";
import { ProgressBar } from "@/components/ui/player/default/progress-bar/progress-bar/ProgressBar";
import useLoadingEvents from "@/shared/hooks/player/useLoadingEvents";
import {
  useAudioCurrentTime,
  useAudioDuration,
  useBufferedResetOnChange,
  useBufferedTrackUpdate,
  useProgressTrackUpdate,
} from "@/shared/hooks/player";
import { useProjectsPlayerController } from "@/shared/hooks/player/useProjectsPlayerController";
import { Trackist } from "@/components/ui/player/extented/tracklist/Tracklist";
import { TracklistHeader } from "@/components/ui/player/extented/tracklist-header/TracklistHeader";
import {
  calcRelativeProgress,
  seekAudioTo,
} from "@/shared/helpers/player.helpers";
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const MobilePlayer = observer(({ playerRef }: Props) => {
  // const [isClient, setIsClient] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState(false);
  const { projectsStore, isMobile } = useRootStore();

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

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const handleCloseButton = () => {
    projectsStore.resetState();
    deleteSelected();
    terminatePlayer();
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
    <div className={cn(s.section, { [s.visible]: isPlayerOpened && isMobile })}>
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
