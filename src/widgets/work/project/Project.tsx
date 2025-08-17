import s from "./Project.module.css";
import cn from "classnames";
import { ButtonVertical } from "@/shared/components/ui/button-vertical";
import { DesktopPlayerTracklist } from "@/features/player/projects-player/desktop/player-tracklist";
import Image from "next/image";
import { Props } from "./types";

export const ProjectComponent = ({
  index,
  project,
  selected,
  selectedRef,
  isMobile,
  onTrackClick,
  onPlayClick,
  onVideoClick,
}: Props) => {
  const { title, image } = project;
  return (
    <div
      className={s.project}
      ref={title === selected ? selectedRef : null}
      key={title}
    >
      <div className={s.imageWrapper}>
        {isMobile && (
          <div
            className={cn(s.buttons, {
              [s.visible]: title === selected,
            })}
          >
            <ButtonVertical onClick={() => onPlayClick(title)}>
              play
            </ButtonVertical>
            <ButtonVertical onClick={onVideoClick}>watch</ButtonVertical>
          </div>
        )}

        {!isMobile && (
          <DesktopPlayerTracklist index={index} openVideoPopup={onVideoClick} />
        )}
        <Image
          priority={index < 4}
          loading="eager"
          src={image}
          alt={title}
          className={s.image}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 188px, 15vw"
          quality={75}
          onClick={() => onTrackClick(title)}
        />
      </div>
    </div>
  );
};
