import { Piece } from "@/shared/types";
import { RefObject } from "react";

export type Props = {
  index: number;
  track: Piece;
  selected: string;
  selectedRef: RefObject<HTMLDivElement | null>;
  isAudioPlaying: boolean;
  playingTrackName: string;
  onTrackClick: (arg: string) => void;
  onPlayClick: (arg: string) => void;
  onVideoClick: (src: string) => void;
};
