import { ProjectsStore } from "@/shared/stores/projects-store";
import { RefObject, useEffect } from "react";

export const usePlayNextOnEnd = (
  playerRef: RefObject<HTMLAudioElement | null>,
  projectsStore: ProjectsStore
) => {
  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    const playNext = () => {
      console.log("cb");
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
    };

    player.addEventListener("ended", playNext);
    return () => player.removeEventListener("ended", playNext);
  });
};
