import { BufferedTrack } from "../buffered-track/BufferedTrack";
import { Loader } from "../loader/Loader";
import { OutlineTrack } from "../outline-track/OutlineTrack";
import { ProgressTrack } from "../progress-track/ProgressTrack";
import s from "./ProgressBar.module.css";
import type { Props } from "./types";

export const ProgressBar = ({
  progress,
  buffered,
  keyTag,
  barRef,
  onTrackClick,
  isLoading,
}: Props) => {
  return (
    <div className={s.progressBar} ref={barRef} onClick={onTrackClick}>
      {isLoading ? (
        <Loader isLoading={true} />
      ) : (
        <>
          <BufferedTrack buffered={buffered} keyTag={keyTag} />
          <ProgressTrack progress={progress} keyTag={keyTag} />
          <OutlineTrack />
        </>
      )}
    </div>
  );
};
