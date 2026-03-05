import cn from "classnames";
import s from "./Page.module.css";
import { Props } from "./types";

export const Page = ({ className, children, ...rest }: Props) => {
  return (
    <div className={cn(s.page, className)} {...rest}>
      {children}
    </div>
  );
};
