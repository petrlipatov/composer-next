"use client";

import { useEffect, useRef } from "react";
import Scrollbar from "react-scrollbars-custom";

import { useRootStore } from "@/shared/contexts/store-context";
import { TrackView } from "../track/Track";
import { observer } from "mobx-react-lite";
import s from "./Tracks.module.css";
import type { Props } from "./types";

export const Tracks = observer(({ openVideoPopup }: Props) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const { piecesStore, urlStore } = useRootStore();

  useEffect(
    function scrollTrackIntoViewport() {
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    },
    [urlStore.selected]
  );

  useEffect(
    function addTrackAsSelectedIfInURL() {
      if (urlStore.selected) {
        piecesStore.setSelectedPiece(urlStore.selected);
      }
    },
    [piecesStore, urlStore.selected]
  );

  useEffect(
    function removeSelectedIn30Sec() {
      let timerId: ReturnType<typeof setTimeout>;
      if (urlStore.selected) {
        timerId = setTimeout(() => urlStore.deleteSelected(), 2500);
      }
      return () => clearTimeout(timerId);
    },
    [urlStore, urlStore.selected]
  );

  useEffect(() => {
    if (piecesStore.playingPiece) {
      urlStore.setSelected(piecesStore.playingPiece.title);
    }
  }, [urlStore, piecesStore.playingPiece]);

  const trackClickHandler = (title: string) => urlStore.setSelected(title);

  const playClickHandler = (title: string) => {
    urlStore.setPlayerOpen();
    piecesStore.setPlayingPiece(title);
    piecesStore.play();
  };

  const videoClickHandler = (url: string) => {
    openVideoPopup(url);
    piecesStore.resetState();
  };

  const tracks = piecesStore.piecesFilteredByTags.map((piece, i) => (
    <TrackView
      key={piece.title}
      index={i}
      track={piece}
      selected={urlStore.selected ?? ""}
      selectedRef={selectedRef}
      isAudioPlaying={piecesStore.isAudioPlaying}
      playingTrackName={piecesStore.playingPiece?.title ?? ""}
      onTrackClick={trackClickHandler}
      onPlayClick={playClickHandler}
      onVideoClick={videoClickHandler}
    />
  ));

  return (
    <Scrollbar
      noDefaultStyles
      disableTracksWidthCompensation
      className={s.scrollbarContainer}
      wrapperProps={{
        className: s.scrollbarInnerWrapper,
      }}
      contentProps={{ className: s.scrollbarContent }}
      trackYProps={{
        className: s.scrollbarTrack,
      }}
      thumbYProps={{
        className: s.scrollbarThumb,
      }}
    >
      {tracks}
    </Scrollbar>
  );
});
