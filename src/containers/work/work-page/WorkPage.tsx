"use client";
import { Content } from "@/components/layout/content";
import { Page } from "@/components/layout/page";
import { Logo } from "@/components/ui/logo";
import s from "./WorkPage.module.css";

import { Tags } from "@/components/ui/tags";
import { PROJECTS_GENRES } from "@/shared/constants/content";

import { Suspense, useEffect, useRef } from "react";

import { MobilePlayer } from "../mobile-player/MobilePlayer";
import { useRootStore } from "@/shared/contexts/store-context";
import { HTMLAudioTag } from "@/containers/common/HTMLAudioTag";
import { DesktopPlayer } from "../desktop-player/desktop-player/DesktopPlayer";
import { observer } from "mobx-react-lite";
import { Projects } from "../projects/Projects";
import { Modal } from "@/components/ui/popup";
import { YoutubePlayer } from "@/containers/common/youtube-player";

export const WorkPage = observer(() => {
  const { projectsStore } = useRootStore();

  useEffect(
    function resetOnLeave() {
      return () => projectsStore.resetState();
    },
    [projectsStore]
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
        <Logo />
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
      <Suspense>
        <DesktopPlayer playerRef={audioPlayerRef} />
      </Suspense>
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
