import cn from "classnames";
import s from "./PlayIcon.module.css";
import { Props } from "./types";

export const PlayIcon = ({
  isAudioPlaying,
  className,
  isFilled = false,
}: Props) => {
  return (
    <svg
      viewBox="3 2 20 20"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        s.defaultStyles,
        className,
        isAudioPlaying ? s.disabled : ""
      )}
    >
      <polygon points="5 3 5 21 19 12 5 3" />
    </svg>
  );
};
