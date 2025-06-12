import { Dispatch, RefObject, SetStateAction } from "react";

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const paddedSecs = secs.toString().padStart(2, "0");
  return `${minutes}:${paddedSecs}`;
}

export const calcRelativeProgress = (
  trackRef: RefObject<HTMLDivElement | null>,
  clientX: number
) => {
  const track = trackRef.current;

  if (track === null) return 0;

  const { left, width } = track.getBoundingClientRect();
  let relativePos = ((clientX - left) / width) * 100;
  if (relativePos < 0) relativePos = 0;
  if (relativePos > 100) relativePos = 100;
  return relativePos;
};

export const seekAudioTo = (
  playerRef: RefObject<HTMLAudioElement | null>,
  relativePos: number,
  progressSetter: Dispatch<SetStateAction<number>>
) => {
  const audio = playerRef.current;

  if (!audio) return null;

  if (audio.duration) {
    audio.currentTime = (relativePos / 100) * audio.duration;
    progressSetter(relativePos);
  }
};
