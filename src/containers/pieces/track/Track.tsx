import cn from "classnames";
import Image from "next/image";
import React, { RefObject } from "react";
import type { Track } from "@/shared/types";
import s from "./Track.module.css";
import { ButtonVertical } from "@/components/ui/button-vertical";
import { Equalizer } from "@/components/ui/equalizer/Equalizer";

type Props = {
  index: number;
  track: Track;
  selected: string;
  selectedRef: RefObject<HTMLDivElement | null>;
  isAudioPlaying: boolean;
  playingTrackName: string;
  onTrackClick: (arg: string) => void;
  onPlayClick: (arg: string) => void;
  onVideoClick: (src: string) => void;
};

export const TrackComponent = ({
  index,
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
          // fetchPriority={"high"}
          priority={index < 6}
          className={s.image}
          src={track.image}
          alt={track.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 50vw, 15vw"
          onClick={() => onTrackClick(track.title)}
          quality={100}
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

TrackComponent.displayName = "Track";
