import { makeAutoObservable } from "mobx";
import { PiecesStore } from "./pieces-store";
import { ProjectsStore } from "./projects-store";
import { UrlStore } from "./url-store";

class RootStore {
  isClient = false;
  isLoaded = false;
  isMobile: boolean = false;
  piecesStore: PiecesStore;
  projectsStore: ProjectsStore;
  urlStore: UrlStore;
  constructor() {
    makeAutoObservable(this);
    this.piecesStore = new PiecesStore(this);
    this.projectsStore = new ProjectsStore(this);
    this.urlStore = new UrlStore(this);
  }

  setIsLoaded(state: boolean) {
    this.isLoaded = state;
  }

  setIsClient(state: boolean) {
    this.isClient = state;
  }

  setIsMobile(state: boolean) {
    this.isMobile = state;
  }
}

export const rootStore = new RootStore();
export type { RootStore };
