"use client";

import { useRootStore } from "@/shared/contexts/store-context";
import cn from "classnames";
import { PROJECTS } from "@/shared/constants/content";
import { observer } from "mobx-react-lite";
import { TracklistHeader } from "@/features/player/ui/extended/tracklist-header/TracklistHeader";
import { Trackist } from "@/features/player/ui/extended/tracklist/Tracklist";
import s from "./DesktopPlayerTracklist.module.css";
import { Props } from "./types";
import { MouseEvent, useEffect, useState } from "react";

export const DesktopPlayerTracklist = observer(
  ({ index, openVideoPopup }: Props) => {
    const [isClient, setIsClient] = useState(false);

    const currentProject = PROJECTS[index];

    useEffect(() => {
      setIsClient(true);
    }, []);

    const { projectsStore, urlStore } = useRootStore();

    const isVisible =
      projectsStore.playingProjectData?.title === currentProject.title;

    const listClickHandler = (title: string) => {
      if (
        // if playing project is not the clicked one
        // then delete Playing Track Index
        // and pause
        projectsStore.playingProjectData &&
        projectsStore.playingProjectData.title !== currentProject.title
      ) {
        projectsStore.clearPlayingTrackIndex();
        projectsStore.pause();
      }

      urlStore.setSelected(title);
      projectsStore.setPlayingProjectData(title);
      urlStore.setPlayerOpen();
    };

    const trackClickHandler = (
      e: MouseEvent<HTMLDivElement>,
      index: number
    ) => {
      e.stopPropagation();

      if (
        !projectsStore.playingProjectData ||
        projectsStore.playingProjectData.title !== currentProject.title
      ) {
        projectsStore.setPlayingProjectData(currentProject.title);
        urlStore.setSelected(currentProject.title);
      }

      urlStore.setPlayerOpen();
      projectsStore.setPlayingTrackIndex(index);
      projectsStore.play();
    };

    const videoClickHandler = () => {
      openVideoPopup(currentProject.video);
      projectsStore.pause();
      projectsStore.clearPlayingTrackIndex();
    };

    if (!isClient) {
      return null;
    }

    return (
      <div
        className={cn(s.container, { [s.active]: isVisible })}
        onClick={() => listClickHandler(currentProject.title)}
      >
        <TracklistHeader
          projectData={currentProject}
          videoClickHandler={videoClickHandler}
        />
        <Trackist
          isAudioPlaying={projectsStore.isAudioPlaying}
          projectData={PROJECTS[index]}
          playingTrackIndex={projectsStore.playingTrackIndex}
          playingProjectTitle={projectsStore.playingProjectData?.title ?? ""}
          trackClickHandler={trackClickHandler}
        />
      </div>
    );
  }
);
