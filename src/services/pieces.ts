import { fetchPieces, fetchPiecesGenres } from "@/api/pieces";

export function getPieces() {
  return fetchPieces();
}

export function getPiecesGenres() {
  return fetchPiecesGenres();
}
