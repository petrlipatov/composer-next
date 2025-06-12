import cn from "classnames";
import s from "./Track.module.css";
import { Props } from "./types";
import { Equalizer } from "@/components/ui/equalizer/Equalizer";

export const Track = ({
  index,
  title,
  duration,
  isSelected = false,
  isAudioPlaying = false,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(s.container, {
        [s.selected]: isSelected,
      })}
      key={title}
      onClick={(event) => onClick(event, index)}
    >
      <div className={s.numberTitleContainer}>
        {isAudioPlaying && isSelected ? (
          <Equalizer color={"primary"} />
        ) : (
          <div className={cn(s.text, s.number)}>{index + 1}</div>
        )}

        <div className={s.text}>{title}</div>
      </div>
      <div className={s.text}>{duration}</div>
    </div>
  );
};
