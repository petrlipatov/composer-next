import { Ref } from "react";

export type Props = {
  keyTag?: string;
  progress: number;
  buffered: number;
  isLoading: boolean;
  onTrackClick: (e: React.MouseEvent) => void;
  barRef: Ref<HTMLDivElement>;
};
