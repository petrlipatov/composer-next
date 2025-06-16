import { MouseEvent } from "react";

export type Props = {
  index: number;
  duration: string;
  title: string;
  isSelected: boolean;
  isAudioPlaying: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>, arg: number) => void;
};
