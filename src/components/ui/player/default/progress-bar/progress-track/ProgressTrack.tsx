import { Props } from "./types";
import s from "./ProgressTrack.module.css";

export const ProgressTrack = ({ progress, keyTag }: Props) => {
  return (
    <div
      key={keyTag}
      className={s.track}
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
};
