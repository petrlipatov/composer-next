import { makeAutoObservable } from "mobx";
import { PiecesStore } from "./pieces-store";
import { ProjectsStore } from "./projects-store";

class RootStore {
  loaded = false;
  isMobile: boolean = false;
  piecesStore: PiecesStore;
  projectsStore: ProjectsStore;
  constructor() {
    console.log(
      `%cStore создан ${new Date().toUTCString()}`,
      "color: green; font-weight: bold;"
    );

    makeAutoObservable(this);
    this.piecesStore = new PiecesStore(this);
    this.projectsStore = new ProjectsStore(this);
  }

  setLoadedState(state: boolean) {
    this.loaded = state;
  }

  setIsMobile(state: boolean) {
    this.isMobile = state;
  }
}

export const rootStore = new RootStore();
export type { RootStore };
