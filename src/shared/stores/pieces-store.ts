import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { filterElementsByTags, filterUnavailableTags } from "@/services/tags";
import { getPieces, getPiecesGenres } from "@/services/pieces";
import type { Piece } from "../types/index";
import { findByTitle } from "@/services/common";

export class PiecesStore {
  rootStore: RootStore;
  pieces: Piece[];
  genres: string[];
  isAudioPlaying: boolean = false;
  selectedPiece: null | Piece = null;
  playingPiece: null | Piece = null;
  selectedTags: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.pieces = getPieces();
    this.genres = getPiecesGenres();
  }

  togglePlaying() {
    this.isAudioPlaying = !this.isAudioPlaying;
  }

  play() {
    if (!this.isAudioPlaying) {
      this.togglePlaying();
    }
  }

  pause() {
    if (this.isAudioPlaying) {
      this.togglePlaying();
    }
  }

  setSelectedPiece(title: string) {
    const piece = findByTitle(this.pieces, title);
    if (piece) {
      this.selectedPiece = piece;
    }
  }

  setPlayingPiece(title: string) {
    const piece = findByTitle(this.pieces, title);
    if (piece) {
      this.playingPiece = piece;
    }
  }

  setSelectedTags(tags: string[]) {
    this.selectedTags = tags;
  }

  resetTagsClick() {
    this.selectedTags = [];
  }

  resetState() {
    this.selectedTags = [];
    this.isAudioPlaying = false;
    this.selectedPiece = null;
    this.playingPiece = null;
  }

  get piecesFilteredByTags() {
    return filterElementsByTags(this.pieces, this.selectedTags);
  }

  get availableTags() {
    return filterUnavailableTags(this.genres, this.piecesFilteredByTags);
  }
}
