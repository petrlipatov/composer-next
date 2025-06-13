import s from "./Project.module.css";
import cn from "classnames";
import { ButtonVertical } from "@/components/ui/button-vertical";
import { DesktopPlayerTracklist } from "../desktop-player/desktop-player-tracklist/DesktopPlayerTracklist";
import Image from "next/image";
import { Props } from "./types";

export const ProjectComponent = ({
  project,
  selected,
  selectedRef,
  isMobile,
  index,
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
            <ButtonVertical onClick={onPlayClick}>play</ButtonVertical>
            <ButtonVertical onClick={onVideoClick}>watch</ButtonVertical>
          </div>
        )}

        {!isMobile && <DesktopPlayerTracklist index={index} />}
        <Image
          priority
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
