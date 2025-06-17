"use client";

import React, { useEffect, useRef } from "react";
import s from "./Tracks.module.css";
import { useRootStore } from "@/shared/contexts/store-context";

import { TrackView } from "../track/Track";
import { observer } from "mobx-react-lite";
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const Tracks = observer(() => {
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const { piecesStore } = useRootStore();

  const { selected, addSelected, deleteSelected, activePlayer } =
    useParamsHelpers();

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
    [selected]
  );

  useEffect(
    function addTrackAsSelectedIfInURL() {
      if (selected) {
        piecesStore.setSelectedTrackData(selected);
      }
    },
    [piecesStore, selected]
  );

  useEffect(
    function removeSelectedIn30Sec() {
      let timerId: ReturnType<typeof setTimeout>;
      if (selected) {
        timerId = setTimeout(() => deleteSelected(), 2500);
      }
      return () => clearTimeout(timerId);
    },
    [selected, deleteSelected]
  );

  // useEffect(() => {
  //   if (piecesStore.playingTrack) {
  //     addSelected(piecesStore.playingTrack.title);
  //   }
  // }, [piecesStore.playingTrack]);

  const trackClickHandler = (title: string) => addSelected(title);

  const playClickHandler = (title: string) => {
    addSelected(title);
    piecesStore.setPlayingTrack(title);
    piecesStore.play();
    activePlayer();
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
      selected={selected ?? ""}
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
