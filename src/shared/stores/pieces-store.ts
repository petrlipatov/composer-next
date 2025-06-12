import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { PIECES, PIECES_GENRES } from "../constants/content";
import { Track } from "../types/index";

export class PiecesStore {
  rootStore: RootStore;
  isAudioPlaying = false;
  selectedTrack: null | Track = null;
  playingTrack: null | Track = null;
  selectedTags: string[] = [];
  isPopupOpened: boolean = false;
  videoID: string = "";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  togglePlaying() {
    this.isAudioPlaying = !this.isAudioPlaying;
  }

  play() {
    if (!this.isAudioPlaying) {
      this.togglePlaying();
    }
  }

  setSelectedTrackData(name: string) {
    const track = PIECES.find((track) => track.title === name);
    if (track) {
      this.selectedTrack = track;
    }
  }

  setPlayingTrack(name: string) {
    const track = PIECES.find((track) => track.title === name);
    if (track) {
      this.playingTrack = track;
    }
  }

  handleTagClick(genre: string) {
    if (this.selectedTags.includes(genre)) {
      this.selectedTags = this.selectedTags.filter((el) => el !== genre);
    } else {
      this.selectedTags = [...this.selectedTags, genre];
    }
  }

  resetTagsClick() {
    this.selectedTags = [];
  }

  resetState() {
    this.isAudioPlaying = false;
    this.selectedTags = [];
    this.selectedTrack = null;
    this.playingTrack = null;
  }

  get tracksFilteredByTags() {
    const output = PIECES.filter((piece) =>
      this.selectedTags.every((genre) => piece.tags.includes(genre))
    );
    return output;
  }

  openPopup(src: string) {
    this.videoID = src;
    this.isPopupOpened = true;
  }

  closePopup() {
    this.isPopupOpened = false;
  }

  get availableTags() {
    const output = PIECES_GENRES.filter(
      (genre) =>
        !this.tracksFilteredByTags.some((track) => track.tags.includes(genre))
    );
    return output;
  }
}
