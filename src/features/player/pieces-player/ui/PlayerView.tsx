import cn from "classnames";
import { CloseButton } from "@/shared/components/ui/close-button/CloseButton";
import { Artwork } from "../../ui/default/artwork/Artwork";
import { Title } from "../../ui/default/title/Title";
import { Controls } from "../../ui/default/controls/controls/Controls";

import s from "./PlayerView.module.css";
import type { Props } from "./types";

const PlayerView = ({
  children,
  isPlayerOpened,
  isAudioPlaying,
  playingTrack,
  handleCloseButton,
  handlePlayPauseClick,
  handlePlayNextClick,
  handleArtworkClick,
}: Props) => {
  return (
    <div className={cn(s.player, { [s.visible]: isPlayerOpened })}>
      <Artwork
        sizes="(max-width: 899px) 50px, 70px"
        className={s.artwork}
        src={playingTrack.image}
        blurSrc={playingTrack.blurData}
        onClick={handleArtworkClick}
      />

      <CloseButton className={s.closeButton} onClick={handleCloseButton} />
      <Title text={playingTrack.title} />

      <div className={s.controlsProgressContainer}>
        <Controls
          isAudioPlaying={isAudioPlaying}
          playHandler={handlePlayPauseClick}
          playPrev={() => handlePlayNextClick("prev")}
          playNext={() => handlePlayNextClick("next")}
        />

        <div className={s.progressContainer}>{children}</div>
      </div>
    </div>
  );
};

export default PlayerView;
