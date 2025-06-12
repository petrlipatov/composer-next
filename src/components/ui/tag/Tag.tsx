import cn from "classnames";
import { Props } from "./type";
import { Button } from "@/components/ui/button";
import s from "./Tag.module.css";

export const Tag = ({ children, isSelected, isDisabled, onClick }: Props) => {
  return (
    <Button
      size="s"
      className={cn(s.tag, {
        [s.selected]: isSelected,
        [s.disabled]: isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};
