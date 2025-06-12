import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };

export type Track = {
  title: string;
  tags: string[];
  image: string;
  video: string;
  audio: string;
};

export type Project = {
  name: string;
  tags: string[];
  image: string;
  video: string;
  genre: string;
  year: string;
  tracks: {
    name: string;
    duration: string;
    audio: string;
  }[];
};
