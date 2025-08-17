import { Project } from "@/shared/types";
import { MouseEvent } from "react";

export type Props = {
  projectData: Project | null;
  playingTrackIndex: number | null;
  playingProjectTitle: string;
  isAudioPlaying: boolean;
  trackClickHandler: (e: MouseEvent<HTMLDivElement>, i: number) => void;
};
