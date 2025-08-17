import { fetchProjects, fetchProjectsGenres } from "@/api/projects";

export function getProjects() {
  return fetchProjects();
}

export function getProjectsGenres() {
  return fetchProjectsGenres();
}
