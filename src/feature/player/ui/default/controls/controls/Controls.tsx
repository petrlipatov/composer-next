import React from "react";
import { NextButton } from "../next-button/NextButton";
import { PlayPauseButton } from "../play-pause-button/PlayPauseButton";
import s from "./Controls.module.css";

type Props = {
  isAudioPlaying: boolean;
  playHandler: () => void;
  playNext: () => void;
  playPrev: () => void;
};

export const Controls = ({
  isAudioPlaying,
  playHandler,
  playNext,
  playPrev,
}: Props) => {
  return (
    <div className={s.controls}>
      <NextButton isRotated={true} onClick={playPrev} />
      <PlayPauseButton
        isAudioPlaying={isAudioPlaying}
        handlePlayPauseClick={playHandler}
      />
      <NextButton onClick={playNext} />
    </div>
  );
};
