import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };

export type Piece = {
  title: string;
  tags: string[];
  image: string;
  video: string;
  audio: string;
  blurData: string;
};

export type Project = {
  title: string;
  tags: string[];
  image: string;
  video: string;
  genre: string;
  year: string;
  tracks: {
    title: string;
    duration: string;
    audio: string;
  }[];
};
