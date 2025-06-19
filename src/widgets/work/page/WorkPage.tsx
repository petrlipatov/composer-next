"use client";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import { Content } from "@/shared/components/layout/content";
import { Page } from "@/shared/components/layout/page";

import { Modal } from "@/shared/components/ui/modal";
import { Tags } from "@/shared/components/ui/tags";
import { PROJECTS_GENRES } from "@/shared/constants/content";

import { MobilePlayer } from "@/feature/player/projects-player/mobile";
import { useRootStore } from "@/shared/contexts/store-context";
import { HTMLAudioTag } from "@/feature/player/HTMLAudioTag";
import { DesktopPlayer } from "@/feature/player/projects-player/desktop/player";
import { YoutubePlayer } from "@/feature/youtube-player";

import { Projects } from "../projects/Projects";
import s from "./WorkPage.module.css";
import { Navigation } from "@/shared/components/ui/navigation/Navigation";

export const WorkPage = observer(() => {
  const { projectsStore, urlStore } = useRootStore();

  useEffect(
    function resetOnLeave() {
      return () => {
        projectsStore.resetState();
        urlStore.reset();
      };
    },
    [projectsStore, urlStore]
  );

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handleTagClick = (genre: string) => {
    projectsStore.processTagClick(genre);
  };

  const handleResetClick = () => {
    projectsStore.resetTagsClick();
  };

  return (
    <Page className={s.page}>
      <Content className={s.content}>
        <Navigation>&lt; Featured Work</Navigation>
        <Tags
          className={s.tags}
          selectedTags={projectsStore.selectedTags}
          filteredTags={projectsStore.availableTags}
          tags={PROJECTS_GENRES}
          handleTagClick={handleTagClick}
          handleResetClick={handleResetClick}
        />

        <Projects />
      </Content>

      <MobilePlayer playerRef={audioPlayerRef} />
      <DesktopPlayer playerRef={audioPlayerRef} />

      <HTMLAudioTag ref={audioPlayerRef} />
      <Modal
        isOpen={projectsStore.isPopupOpened}
        onClose={() => projectsStore.closePopup()}
      >
        <YoutubePlayer videoID={projectsStore.videoID} />
      </Modal>
    </Page>
  );
});
