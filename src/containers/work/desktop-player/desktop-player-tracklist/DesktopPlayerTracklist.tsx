"use client";

import { useRootStore } from "@/shared/contexts/store-context";
import cn from "classnames";
import { PROJECTS } from "@/shared/constants/content";
import { observer } from "mobx-react-lite";
import { TracklistHeader } from "@/components/ui/player/extented/tracklist-header/TracklistHeader";
import { Trackist } from "@/components/ui/player/extented/tracklist/Tracklist";
import s from "./DesktopPlayerTracklist.module.css";
import { Props } from "./types";
import { MouseEvent, useEffect, useState } from "react";
// import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const DesktopPlayerTracklist = observer(({ index }: Props) => {
  const [isClient, setIsClient] = useState(false);

  const currentProject = PROJECTS[index];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { projectsStore } = useRootStore();
  // const { selected, isPlayerOpened, addSelected, activePlayer } =
  //   useParamsHelpers();

  // const isVisible = isPlayerOpened && selected === currentProject.name;

  const isVisible = false;

  const listClickHandler = (title: string) => {
    // addSelected(title);

    if (
      // if playing project is not the clicked one
      // then delete Playing Track Index
      // and pause
      projectsStore.playingProjectData &&
      projectsStore.playingProjectData.name !== currentProject.name
    ) {
      projectsStore.clearPlayingTrackIndex();
      projectsStore.pause();
    }

    console.log(title);

    // if (!isPlayerOpened) {
    //   activePlayer();
    // }
  };

  const trackClickHandler = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();

    if (
      !projectsStore.playingProjectData ||
      projectsStore.playingProjectData.name !== currentProject.name
    ) {
      // addSelected(currentProject.name);
    }

    // if (!isPlayerOpened) {
    //   activePlayer();
    // }

    projectsStore.setPlayingTrackIndex(index);
    projectsStore.play();
  };

  const videoClickHandler = () => {
    projectsStore.openPopup(currentProject.video);
    projectsStore.pause();
    projectsStore.clearPlayingTrackIndex();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={cn(s.container, { [s.active]: isVisible })}
      onClick={() => listClickHandler(currentProject.name)}
    >
      <TracklistHeader
        projectData={currentProject}
        videoClickHandler={videoClickHandler}
      />
      <Trackist
        isAudioPlaying={projectsStore.isAudioPlaying}
        projectData={PROJECTS[index]}
        playingTrackIndex={projectsStore.playingTrackIndex}
        playingProjectTitle={projectsStore.playingProjectData?.name ?? ""}
        trackClickHandler={trackClickHandler}
      />
    </div>
  );
});
