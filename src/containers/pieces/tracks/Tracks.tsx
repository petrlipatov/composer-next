"use client";

import React, { useEffect, useRef } from "react";
import s from "./Tracks.module.css";
import { useRootStore } from "@/shared/contexts/store-context";

import { TrackComponent } from "../track/Track";
import { observer } from "mobx-react-lite";
import { useParamsHelpers } from "@/shared/hooks/useParamsHelpers";

export const Tracks = observer(() => {
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const { piecesStore } = useRootStore();

  const { selected, addSelected, deleteSelected, activePlayer } =
    useParamsHelpers();

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [selected]);

  useEffect(() => {
    if (selected) {
      piecesStore.setSelectedTrackData(selected);
    }
  }, [piecesStore, selected]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (selected) {
      timerId = setTimeout(() => deleteSelected(), 2500);
    }
    return () => clearTimeout(timerId);
  }, [selected, deleteSelected]);

  const trackClickHandler = (title: string) => {
    console.log("track");
    addSelected(title);
  };

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

  return (
    <div className={s.grid}>
      {piecesStore.tracksFilteredByTags.map((track, i) => (
        <TrackComponent
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
      ))}
    </div>
  );
});
