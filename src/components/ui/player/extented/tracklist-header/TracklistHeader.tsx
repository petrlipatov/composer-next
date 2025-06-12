import s from "./TracklistHeader.module.css";
import { Artwork } from "../../default/artwork/Artwork";
import { Props } from "./types";
import { Button } from "@/components/ui/button";

export const TracklistHeader = ({ projectData, videoClickHandler }: Props) => {
  if (!projectData) {
    return null;
  }

  return (
    <div className={s.content}>
      <Artwork
        sizes="(max-width: 900px) 10vw, 5vw"
        className={s.imageContainer}
        src={projectData.image}
      />
      <div className={s.infoContainer}>
        <div className={s.text}>{projectData.name}</div>
        <div className={s.text}>{projectData.genre}</div>
        <div className={s.text}>{projectData.year}</div>

        <Button
          onClick={videoClickHandler}
          size="s"
          variant="text"
          className={s.button}
        >
          watch
        </Button>
      </div>
    </div>
  );
};
