import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { Project } from "../types/index";
import { getProjects, getProjectsGenres } from "@/services/projects";
import { filterElementsByTags, filterUnavailableTags } from "@/services/tags";
import { findByTitle } from "@/services/common";

export class ProjectsStore {
  projects: Project[];
  genres: string[];
  rootStore: RootStore;
  isAudioPlaying = false;
  playingProjectData: null | Project = null;
  playingTrackIndex: null | number = null;
  selectedTags: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.projects = getProjects();
    this.genres = getProjectsGenres();
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
    const project = findByTitle(this.projects, title);
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

  setSelectedTags(tags: string[]) {
    this.selectedTags = tags;
  }

  resetTagsClick() {
    this.selectedTags = [];
  }

  get projectsFilteredByTags() {
    return filterElementsByTags(this.projects, this.selectedTags);
  }

  get availableTags() {
    return filterUnavailableTags(this.genres, this.projectsFilteredByTags);
  }
}
