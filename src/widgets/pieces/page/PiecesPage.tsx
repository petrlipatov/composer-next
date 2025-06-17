"use client";

import { observer } from "mobx-react-lite";
// import { usePathname, useSearchParams } from "next/navigation";
import { Tags } from "@/shared/components/ui/tags";
import { PIECES_GENRES } from "@/shared/constants/content";
import { Page } from "@/shared/components/layout/page";
import { Content } from "@/shared/components/layout/content";
import s from "./PiecesPage.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import { HTMLAudioTag } from "@/feature/player/HTMLAudioTag";
import { Player } from "@/feature/player/pieces-player";
import { Tracks } from "../tracks/Tracks";
import { useRootStore } from "@/shared/contexts/store-context";
import { Modal } from "@/shared/components/ui/popup";
import { YoutubePlayer } from "@/feature/youtube-player";
import { Navigation } from "@/shared/components/ui/navigation/Navigation";

export const PiecesPage = observer(() => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const { piecesStore, urlStore } = useRootStore();

  useEffect(
    function resetOnLeave() {
      return () => {
        piecesStore.resetState();
        urlStore.reset();
      };
    },
    [piecesStore, urlStore]
  );

  const handleTagClick = (genre: string) => {
    piecesStore.handleTagClick(genre);
  };

  const handleResetTagsClick = () => {
    piecesStore.resetTagsClick();
  };

  return (
    <Page className={s.page}>
      <Content className={s.content}>
        <Navigation />
        <Tags
          className={s.tags}
          selectedTags={piecesStore.selectedTags}
          filteredTags={piecesStore.availableTags}
          tags={PIECES_GENRES}
          handleTagClick={handleTagClick}
          handleResetClick={handleResetTagsClick}
        />

        <Tracks />
      </Content>

      <Player playerRef={audioPlayerRef} />
      <HTMLAudioTag ref={audioPlayerRef} />

      <Modal
        isOpen={piecesStore.isPopupOpened}
        onClose={() => piecesStore.closePopup()}
      >
        <YoutubePlayer videoID={piecesStore.videoID} />
      </Modal>
    </Page>
  );
});
