export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const paddedSecs = secs.toString().padStart(2, "0");
  return `${minutes}:${paddedSecs}`;
}
