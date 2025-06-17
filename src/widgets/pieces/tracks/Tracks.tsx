"use client";

import React, { useEffect, useRef } from "react";
import s from "./Tracks.module.css";
import { useRootStore } from "@/shared/contexts/store-context";

import { TrackView } from "../track/Track";
import { observer } from "mobx-react-lite";

export const Tracks = observer(() => {
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
        piecesStore.setSelectedTrackData(urlStore.selected);
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
    if (piecesStore.playingTrack) {
      urlStore.setSelected(piecesStore.playingTrack.title);
    }
  }, [urlStore, piecesStore.playingTrack]);

  const trackClickHandler = (title: string) => urlStore.setSelected(title);

  const playClickHandler = (title: string) => {
    urlStore.setPlayerOpen();
    piecesStore.setPlayingTrack(title);
    piecesStore.play();
  };

  const videoClickHandler = (src: string) => {
    piecesStore.openPopup(src);
    piecesStore.resetState();
  };

  const tracks = piecesStore.tracksFilteredByTags.map((track, i) => (
    <TrackView
      key={track.title}
      index={i}
      track={track}
      selected={urlStore.selected ?? ""}
      selectedRef={selectedRef}
      isAudioPlaying={piecesStore.isAudioPlaying}
      playingTrackName={piecesStore.playingTrack?.title ?? ""}
      onTrackClick={trackClickHandler}
      onPlayClick={playClickHandler}
      onVideoClick={videoClickHandler}
    />
  ));

  return <div className={s.grid}>{tracks}</div>;
});
