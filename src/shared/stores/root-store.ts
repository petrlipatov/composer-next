import { makeAutoObservable } from "mobx";
import { PiecesStore } from "./pieces-store";
import { ProjectsStore } from "./projects-store";

class RootStore {
  isClient = false;
  isLoaded = false;
  isMobile: boolean = false;
  piecesStore: PiecesStore;
  projectsStore: ProjectsStore;
  constructor() {
    makeAutoObservable(this);
    this.piecesStore = new PiecesStore(this);
    this.projectsStore = new ProjectsStore(this);
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
