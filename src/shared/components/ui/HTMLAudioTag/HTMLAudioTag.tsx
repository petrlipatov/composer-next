import { Ref } from "react";

export const HTMLAudioTag = ({ ref }: { ref: Ref<HTMLAudioElement> }) => {
  return (
    <audio preload="metadata" ref={ref}>
      <source type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};
