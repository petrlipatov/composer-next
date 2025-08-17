import { Ref, PointerEvent } from "react";

export type Props = {
  keyTag?: string;
  progress: number;
  buffered: number;
  isLoading: boolean;
  onTrackClick: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: PointerEvent<HTMLDivElement>) => void;
  barRef: Ref<HTMLDivElement>;
};
