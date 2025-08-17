import cn from "classnames";
import s from "./BufferedTrack.module.css";
import type { Props } from "./types";

export const BufferedTrack = ({ buffered, keyTag }: Props) => {
  return (
    <div
      key={keyTag}
      className={cn(s.track)}
      style={{ transform: `scaleX(${buffered / 100})` }}
    />
  );
};
