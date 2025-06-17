import s from "./Project.module.css";
import cn from "classnames";
import { ButtonVertical } from "@/shared/components/ui/button-vertical";
import { DesktopPlayerTracklist } from "@/feature/player/projects-player/desktop/player-tracklist";
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
  return (
    <div
      className={s.project}
      ref={project.name === selected ? selectedRef : null}
      key={project.name}
    >
      <div className={s.imageWrapper}>
        {isMobile && (
          <div
            className={cn(s.buttons, {
              [s.visible]: project.name === selected,
            })}
          >
            <ButtonVertical onClick={() => onPlayClick(project.name)}>
              play
            </ButtonVertical>
            <ButtonVertical onClick={onVideoClick}>watch</ButtonVertical>
          </div>
        )}

        {!isMobile && <DesktopPlayerTracklist index={index} />}
        <Image
          priority={index < 4}
          loading="eager"
          src={project.image}
          alt={project.name}
          className={s.image}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 188px, 15vw"
          quality={75}
          onClick={() => onTrackClick(project.name)}
        />
      </div>
    </div>
  );
};
