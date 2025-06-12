import Scrollbar from "react-scrollbars-custom";

import s from "./Tracklist.module.css";
import type { Props } from "./types";
import { Track } from "../track/Track";

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
          backgroundColor: "#eee",
          borderRadius: "0",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: "#888",
          borderRadius: "0px",
        },
      }}
      style={{ flexGrow: 1, width: "90%" }}
    >
      <div className={s.tracklist}>
        {projectData.tracks.map((track, i) => (
          <Track
            key={track.name}
            index={i}
            isSelected={
              playingTrackIndex === i &&
              projectData.name === playingProjectTitle
            }
            duration={track.duration}
            title={track.name}
            onClick={trackClickHandler}
            isAudioPlaying={isAudioPlaying}
          />
        ))}
      </div>
    </Scrollbar>
  );
};
