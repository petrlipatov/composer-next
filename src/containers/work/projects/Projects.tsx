import React, { useLayoutEffect, useRef, useState } from "react";
import s from "./Projects.module.css";

import { useRootStore } from "@/shared/contexts/store-context";
import { ProjectComponent } from "../project/Project";
import { observer } from "mobx-react-lite";
import cn from "classnames";
// import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const Projects = observer(() => {
  const [isClient, setIsClient] = useState(false);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  const { projectsStore, isMobile } = useRootStore();

  // const {
  //   selected,
  //   isPlayerOpened,
  //   addSelected,
  //   deleteSelected,
  //   activePlayer,
  // } = useParamsHelpers();

  const isPlayerOpened = false;
  const selected = null;

  // useEffect(() => {
  //   if (selectedRef.current) {
  //     selectedRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "nearest",
  //     });
  //   }
  // }, [selected]);

  // useEffect(() => {
  //   let timerId: ReturnType<typeof setTimeout>;
  //   if (selected && !isPlayerOpened) {
  //     timerId = setTimeout(() => deleteSelected(), 2500);
  //   }
  //   return () => clearTimeout(timerId);
  // }, [selected, isPlayerOpened, deleteSelected]);

  // useEffect(() => {
  //   if (selected) {
  //     projectsStore.setPlayingProjectData(selected);
  //   }
  // }, [projectsStore, selected]);

  const handleTrackClick = (title: string) => {
    console.log(title);
    // addSelected(title);
  };

  const handlePlayClick = () => {
    // activePlayer();
  };

  const handleVideoClick = (src: string) => {
    console.log(src);
    // projectsStore.openPopup(src);
    // projectsStore.pause();
    // projectsStore.clearPlayingTrackIndex();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className={cn(s.grid, { [s.visible]: !isPlayerOpened || !isMobile })}>
      {projectsStore.projectsFilteredByTags.map((project, i) => (
        <ProjectComponent
          key={project.name}
          project={project}
          selected={selected ?? ""}
          selectedRef={selectedRef}
          isMobile={isMobile}
          onPlayClick={handlePlayClick}
          onTrackClick={handleTrackClick}
          onVideoClick={() => handleVideoClick(project.video)}
          index={i}
        />
      ))}
    </div>
  );
});
