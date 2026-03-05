import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
