"use client";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import { Content } from "@/shared/components/layout/content";
import { Modal } from "@/shared/components/ui/modal";
import { Tags } from "@/shared/components/ui/tags";
import { HTMLAudioTag } from "@/shared/components/ui/HTMLAudioTag";

import { DesktopPlayer } from "@/features/player/projects-player/desktop/player";
import { MobilePlayer } from "@/features/player/projects-player/mobile";
import { YoutubePlayer } from "@/features/youtube-player";

import { Projects } from "../projects/Projects";

import { useRootStore } from "@/shared/contexts/store-context";
import { Navigation } from "@/shared/components/ui/navigation/Navigation";
import { filterSelectedTags } from "@/services/tags";
import s from "./WorkPage.module.css";
import type { VideoPopupState } from "./types";
import { PageWithTitle } from "@/shared/components/layout/page-with-title";

export const WorkPage = observer(() => {
  const { projectsStore, urlStore, isMobile } = useRootStore();
  const [videoPopup, setVideoPopup] = useState<VideoPopupState>({
    isOpen: false,
    url: "",
  });

  useEffect(
    function resetOnLeave() {
      return () => {
        projectsStore.resetState();
        urlStore.reset();
      };
    },
    [projectsStore, urlStore],
  );

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handleTagClick = (genre: string) => {
    const filtered = filterSelectedTags(projectsStore.selectedTags, genre);
    projectsStore.setSelectedTags(filtered);
  };

  const handleResetClick = () => {
    projectsStore.resetTagsClick();
  };

  const openPopup = (url: string) => {
    setVideoPopup({ isOpen: true, url });
  };
  const closePopup = () => {
    setVideoPopup({ isOpen: false, url: "" });
  };

  return (
    <PageWithTitle
      title="Featured Work and Soundtracks by Liza Tikhonova"
      className={s.page}
      data-testid="work-page"
    >
      <Content
        className={cn(s.content, {
          [s.clamped]: urlStore.isPlayerOpen && isMobile,
        })}
      >
        <Navigation>&lt; Featured Work</Navigation>
        <Tags
          className={s.tags}
          selectedTags={projectsStore.selectedTags}
          filteredTags={projectsStore.availableTags}
          tags={projectsStore.genres}
          handleTagClick={handleTagClick}
          handleResetClick={handleResetClick}
        />

        <Projects openVideoPopup={openPopup} />
      </Content>

      <MobilePlayer playerRef={audioPlayerRef} openVideoPopup={openPopup} />
      <DesktopPlayer playerRef={audioPlayerRef} />

      <HTMLAudioTag ref={audioPlayerRef} />
      <Modal isOpen={videoPopup.isOpen} onClose={closePopup}>
        <YoutubePlayer videoID={videoPopup.url} />
      </Modal>
    </PageWithTitle>
  );
});
