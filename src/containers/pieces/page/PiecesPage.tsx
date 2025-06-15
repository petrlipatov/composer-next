"use client";

import { observer } from "mobx-react-lite";
// import { usePathname, useSearchParams } from "next/navigation";
import { Tags } from "@/components/ui/tags";
import { PIECES_GENRES } from "@/shared/constants/content";
import { Logo } from "@/components/ui/logo";
import { Page } from "@/components/layout/page";
import { Content } from "@/components/layout/content";
import s from "./PiecesPage.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import { HTMLAudioTag } from "@/containers/common/HTMLAudioTag";
import { Player } from "@/containers/pieces/player/Player";
import { Tracks } from "../tracks/Tracks";
import { useRootStore } from "@/shared/contexts/store-context";
import { Modal } from "@/components/ui/popup";
import { YoutubePlayer } from "@/containers/common/youtube-player";

export const PiecesPage = observer(() => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const { piecesStore } = useRootStore();

  useEffect(
    function resetOnLeave() {
      return () => piecesStore.resetState();
    },
    [piecesStore]
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
        <Logo />
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
