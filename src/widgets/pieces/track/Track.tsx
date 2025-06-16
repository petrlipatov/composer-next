import cn from "classnames";
import Image from "next/image";
import React from "react";

import { ButtonVertical } from "@/shared/components/ui/button-vertical";
import { Equalizer } from "@/shared/components/ui/equalizer/Equalizer";

import s from "./Track.module.css";
import type { Props } from "./types";

export const TrackView = ({
  track,
  selected,
  selectedRef,
  isAudioPlaying,
  playingTrackName,
  onTrackClick,
  onPlayClick,
  onVideoClick,
}: Props) => {
  return (
    <div key={track.title} className={cn(s.container)}>
      <div
        className={cn(s.wrapper)}
        ref={track.title === selected ? selectedRef : null}
      >
        <div
          className={cn(s.buttons, {
            [s.visible]: track.title === selected,
          })}
        >
          <ButtonVertical onClick={() => onPlayClick(track.title)}>
            play
          </ButtonVertical>
          <ButtonVertical onClick={() => onVideoClick(track.video)}>
            watch
          </ButtonVertical>
        </div>
        <Image
          priority
          className={s.image}
          src={track.image}
          alt={track.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 188px, 15vw"
          onClick={() => onTrackClick(track.title)}
          quality={75}
        />
      </div>
      <div className={s.titleWrapper}>
        <span
          className={cn(s.title, {
            [s.active]: track.title === playingTrackName && isAudioPlaying,
            [s.longTitle]: track.title.length > 20,
            [s.titleAnimation]:
              track.title.length > 20 &&
              track.title === playingTrackName &&
              isAudioPlaying,
          })}
        >
          {track.title}
        </span>
        {track.title === playingTrackName && isAudioPlaying && <Equalizer />}
      </div>
    </div>
  );
};

TrackView.displayName = "Track";
