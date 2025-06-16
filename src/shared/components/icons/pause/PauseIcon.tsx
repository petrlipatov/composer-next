import cn from "classnames";
import s from "./PauseIcon.module.css";
import { Props } from "./types";

export const PauseIcon = ({
  isAudioPlaying,
  className,
  isFilled = false,
}: Props) => {
  return (
    <svg
      viewBox="0 0 20 18"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      className={cn(
        s.defaultStyles,
        className,
        isAudioPlaying ? "" : s.disabled
      )}
    >
      <rect x="2" y="1" width="5" height="14" rx="0" />
      <rect x="10" y="1" width="5" height="14" rx="0" />
    </svg>
  );
};
