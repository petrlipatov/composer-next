import { Piece, Project } from "@/shared/types";

export function filterSelectedTags(selectedtags: string[], genre: string) {
  if (selectedtags.includes(genre)) {
    return selectedtags.filter((tag) => tag !== genre);
  } else {
    return [...selectedtags, genre];
  }
}

export function filterElementsByTags(
  elements: Piece[],
  selectedTags: string[]
): Piece[];
export function filterElementsByTags(
  elements: Project[],
  selectedTags: string[]
): Project[];
export function filterElementsByTags(
  elements: Piece[] | Project[],
  selectedTags: string[]
) {
  return elements.filter((el) =>
    selectedTags.every((genre) => el.tags.includes(genre))
  );
}

export function filterUnavailableTags(
  genres: string[],
  elementsFilteredByTags: Piece[] | Project[]
) {
  return genres.filter(
    (genre) =>
      !elementsFilteredByTags.some((piece) => piece.tags.includes(genre))
  );
}
