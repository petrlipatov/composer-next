import { Piece } from "@/shared/types";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  isPlayerOpened: boolean;
  isAudioPlaying: boolean;
  playingTrack: Piece;
  handleCloseButton: () => void;
  handlePlayPauseClick: () => void;
  handlePlayNextClick: (arg: "prev" | "next") => void;
  handleArtworkClick: (src: string, blurSrc: string) => void;
};
