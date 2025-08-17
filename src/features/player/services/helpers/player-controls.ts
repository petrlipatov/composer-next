export function getNextTrackIndex(
  direction: "next" | "prev",
  currTrackIndex: number,
  lastTrackIndex: number
) {
  switch (direction) {
    case "next": {
      if (currTrackIndex < lastTrackIndex) {
        return currTrackIndex + 1;
      } else {
        return 0;
      }
    }
    case "prev": {
      if (currTrackIndex > 0) {
        return currTrackIndex - 1;
      } else {
        return lastTrackIndex;
      }
    }
  }
}
