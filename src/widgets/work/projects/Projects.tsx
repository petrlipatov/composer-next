import React, { useEffect, useRef } from "react";
import cn from "classnames";
import { useRootStore } from "@/shared/contexts/store-context";
import { ProjectComponent } from "../project/Project";
import { observer } from "mobx-react-lite";
import s from "./Projects.module.css";

export const Projects = observer(() => {
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const { projectsStore, urlStore, isMobile } = useRootStore();

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [urlStore.selected]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (urlStore.selected && !urlStore.isPlayerOpen) {
      timerId = setTimeout(() => urlStore.deleteSelected(), 2500);
    }
    return () => clearTimeout(timerId);
  }, [urlStore, urlStore.isPlayerOpen, urlStore.selected]);

  const handleTrackClick = (title: string) => urlStore.setSelected(title);

  const handlePlayClick = (title: string) => {
    projectsStore.setPlayingProjectData(title);
    urlStore.setPlayerOpen();
  };

  const handleVideoClick = (src: string) => {
    projectsStore.openPopup(src);
    projectsStore.pause();
    projectsStore.clearPlayingTrackIndex();
  };

  return (
    <div
      className={cn(s.grid, {
        [s.visible]: !urlStore.isPlayerOpen || !isMobile,
      })}
    >
      {projectsStore.projectsFilteredByTags.map((project, i) => (
        <ProjectComponent
          key={project.name}
          project={project}
          selected={urlStore.selected ?? ""}
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
