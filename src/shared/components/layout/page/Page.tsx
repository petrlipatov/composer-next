import cn from "classnames";
import s from "./Page.module.css";
import { Props } from "./types";

export const Page = ({ className, children }: Props) => {
  return <div className={cn(s.page, className)}>{children}</div>;
};
