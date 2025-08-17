import { FC, useState } from "react";
import { Props } from "./types";
import ReactPlayer from "react-player";
import s from "./YoutubePlayer.module.css";

export const YoutubePlayer: FC<Props> = ({ videoID }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={s.container} style={{ position: "relative" }}>
      {!loaded && <span className={s.loader} />}

      <ReactPlayer
        className={s.player}
        height={"100%"}
        width="100%"
        url={`https://www.youtube.com/embed/${videoID}`}
        controls={true}
        onReady={() => setLoaded(true)}
      />
    </div>
  );
};
