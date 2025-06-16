import cn from "classnames";
import s from "./Contents.module.css";
import { Props } from "./types";

export const Content = ({ children, className }: Props) => {
  return <div className={cn(s.content, className)}>{children}</div>;
};
