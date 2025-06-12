import React from "react";
import { Button } from "../../button";
import { CloseIcon } from "@/components/icons/close";
import s from "./ResetButton.module.css";
import cn from "classnames";

type Props = {
  isActive?: boolean;
  clickHandler: () => void;
};

export const ResetButton = ({ isActive = false, clickHandler }: Props) => {
  return (
    <Button
      className={cn({ [s.active]: isActive }, s.button)}
      variant="text"
      size="s"
      onClick={clickHandler}
      disabled={!isActive}
    >
      <CloseIcon className={cn(s.icon, { [s.active]: isActive })} />
      <p className={s.text}>No Filter</p>
    </Button>
  );
};
