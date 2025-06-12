import { Project } from "@/shared/types";
import { RefObject } from "react";

export type Props = {
  index: number;
  project: Project;
  selected: string;
  selectedRef: RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  onTrackClick: (arg: string) => void;
  onPlayClick: () => void;
  onVideoClick: () => void;
};
