import { RefObject } from "react";

export type Props = {
  playerRef: RefObject<HTMLAudioElement | null>;
  openVideoPopup: (url: string) => void;
};
