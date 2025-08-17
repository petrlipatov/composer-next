import Scrollbar from "react-scrollbars-custom";
import { Track } from "../track/Track";
import s from "./Tracklist.module.css";
import type { Props } from "./types";

export const Trackist = ({
  projectData,
  playingTrackIndex,
  playingProjectTitle,
  isAudioPlaying,
  trackClickHandler,
}: Props) => {
  return projectData === null ? null : (
    <Scrollbar
      trackYProps={{
        style: {
          padding: 0,
          width: "4px",
          backgroundColor: "var(--background)",
          borderRadius: "0",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: "var(--color-primary)",
          borderRadius: "0px",
        },
      }}
      style={{ flexGrow: 1, width: "90%" }}
    >
      <div className={s.tracklist}>
        {projectData.tracks.map((track, i) => (
          <Track
            key={track.title}
            index={i}
            isSelected={
              playingTrackIndex === i &&
              projectData.title === playingProjectTitle
            }
            duration={track.duration}
            title={track.title}
            onClick={trackClickHandler}
            isAudioPlaying={isAudioPlaying}
          />
        ))}
      </div>
    </Scrollbar>
  );
};
