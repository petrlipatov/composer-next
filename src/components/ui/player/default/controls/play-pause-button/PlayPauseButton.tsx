import { PauseIcon } from "@/components/icons/pause";
import { PlayIcon } from "@/components/icons/play";
import s from "./PlayPauseButton.module.css";
import type { Props } from "./types";

export const PlayPauseButton = ({
  handlePlayPauseClick,
  isAudioPlaying,
}: Props) => {
  return (
    <button className={s.button} onClick={handlePlayPauseClick}>
      <PlayIcon isAudioPlaying={isAudioPlaying} />
      <PauseIcon isAudioPlaying={isAudioPlaying} />
    </button>
  );
};
