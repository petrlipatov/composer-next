import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export class UrlStore {
  rootStore: RootStore;
  selected: string | null = null;
  isPlayerOpen = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setSelected(title: string) {
    this.selected = title;
  }

  deleteSelected() {
    this.selected = null;
  }

  setPlayerOpen() {
    this.isPlayerOpen = true;
  }

  setPlayerClosed() {
    this.isPlayerOpen = false;
  }

  reset() {
    this.isPlayerOpen = false;
    this.selected = null;
  }
}
