import cn from "classnames";
import s from "./Title.module.css";
import type { Props } from "./types";

export const Title = ({ text, className }: Props) => {
  return <div className={cn(s.defaultStyles, className)}>{text}</div>;
};
