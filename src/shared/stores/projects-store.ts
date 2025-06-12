import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { PROJECTS, PROJECTS_GENRES } from "../constants/content";
import { Project } from "../types/index";

export class ProjectsStore {
  rootStore: RootStore;
  isAudioPlaying = false;
  playingProjectData: null | Project = null;
  playingTrackIndex: null | number = null;
  selectedTags: string[] = [];

  isPopupOpened: boolean = false;
  videoID: string = "";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // reaction(
    //   () => this.playingProjectData,
    //   (project, prevProject) => {
    //     if (prevProject !== undefined && prevProject !== project) {
    //       this.playingTrackIndex = null;
    //     }
    //   },
    //   { fireImmediately: false }
    // );
  }

  togglePlaying() {
    this.isAudioPlaying = !this.isAudioPlaying;
  }

  pause() {
    this.isAudioPlaying = false;
  }

  play() {
    this.isAudioPlaying = true;
  }

  resetState() {
    this.isAudioPlaying = false;
    this.playingProjectData = null;
    this.playingTrackIndex = null;
    this.selectedTags = [];
  }

  setPlayingProjectData(title: string) {
    const project = PROJECTS.find((project) => project.name === title);
    if (project) {
      this.playingProjectData = project;
    }
  }

  setPlayingTrackIndex(index: number) {
    this.playingTrackIndex = index;
  }

  clearPlayingTrackIndex() {
    this.playingTrackIndex = null;
  }

  processTagClick(genre: string) {
    if (this.selectedTags.includes(genre)) {
      this.selectedTags = this.selectedTags.filter((el) => el !== genre);
    } else {
      this.selectedTags = [...this.selectedTags, genre];
    }
  }

  resetTagsClick() {
    this.selectedTags = [];
  }

  openPopup(src: string) {
    this.videoID = src;
    this.isPopupOpened = true;
  }

  closePopup() {
    this.isPopupOpened = false;
  }

  get projectsFilteredByTags() {
    const output = PROJECTS.filter((project) =>
      this.selectedTags.every((genre) => project.tags.includes(genre))
    );
    return output;
  }

  get availableTags() {
    const output = PROJECTS_GENRES.filter(
      (genre) =>
        !this.projectsFilteredByTags.some((track) => track.tags.includes(genre))
    );
    return output;
  }
}
