import { CloseIcon } from "@/components/icons/close";
import s from "./CloseButton.module.css";
import { Props } from "./types";
import cn from "classnames";

export const CloseButton = ({ className, size = "m", ...rest }: Props) => {
  return (
    <button className={cn(s.button, className, s[`size-${size}`])} {...rest}>
      <CloseIcon />
    </button>
  );
};
