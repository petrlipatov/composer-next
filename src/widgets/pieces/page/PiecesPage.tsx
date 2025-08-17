"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Tags } from "@/shared/components/ui/tags";
import { Page } from "@/shared/components/layout/page";
import { Content } from "@/shared/components/layout/content";
import { HTMLAudioTag } from "@/shared/components/ui/HTMLAudioTag";
import { Player } from "@/features/player/pieces-player";
import { Tracks } from "../tracks/Tracks";
import { useRootStore } from "@/shared/contexts/store-context";
import { Modal } from "@/shared/components/ui/modal";
import { YoutubePlayer } from "@/features/youtube-player";
import { Navigation } from "@/shared/components/ui/navigation/Navigation";
import { ImagePopup } from "@/shared/components/ui/image-popup/ImagePopup";
import { filterSelectedTags } from "@/services/tags";
import s from "./PiecesPage.module.css";
import type { ImagePopupState, VideoPopupState } from "./types";

export const PiecesPage = observer(() => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const { piecesStore, urlStore } = useRootStore();

  const [videoPopup, setVideoPopup] = useState<VideoPopupState>({
    isOpen: false,
    url: "",
  });

  const [imagePopup, setImagePopup] = useState<ImagePopupState>({
    isOpen: false,
    url: "",
    blurUrl: "",
  });

  const openPopup = (url: string) => {
    setVideoPopup({ isOpen: true, url });
  };
  const closePopup = () => {
    setVideoPopup({ isOpen: false, url: "" });
  };

  const openImagePopup = (url: string, blurUrl: string) => {
    setImagePopup({ isOpen: true, url, blurUrl });
  };

  const closeImagePopup = () => {
    setImagePopup({ isOpen: false, url: "", blurUrl: "" });
  };

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
    const filtered = filterSelectedTags(piecesStore.selectedTags, genre);
    piecesStore.setSelectedTags(filtered);
  };

  const handleResetTagsClick = () => {
    piecesStore.resetTagsClick();
  };

  return (
    <Page className={s.page}>
      <Content className={s.content}>
        <Navigation>&lt; Pieces</Navigation>
        <Tags
          className={s.tags}
          tags={piecesStore.genres}
          selectedTags={piecesStore.selectedTags}
          filteredTags={piecesStore.availableTags}
          handleTagClick={handleTagClick}
          handleResetClick={handleResetTagsClick}
        />
        <Tracks openVideoPopup={openPopup} />
      </Content>

      <Player playerRef={audioPlayerRef} openImagePopup={openImagePopup} />
      <HTMLAudioTag ref={audioPlayerRef} />

      <Modal isOpen={videoPopup.isOpen} onClose={closePopup}>
        <YoutubePlayer videoID={videoPopup.url} />
      </Modal>

      <ImagePopup
        src={imagePopup.url}
        blurDataURL={imagePopup.blurUrl}
        isOpen={imagePopup.isOpen}
        onClose={closeImagePopup}
      />
    </Page>
  );
});
