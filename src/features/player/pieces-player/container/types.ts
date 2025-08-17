import { RefObject } from "react";

export type Props = {
  playerRef: RefObject<HTMLAudioElement | null>;
  openImagePopup: (url: string, blurUrl: string) => void;
};
