import { NextIcon } from "@/components/icons/next/NextIcon";
import s from "./NextButton.module.css";
import type { Props } from "./types";

export const NextButton = ({ isRotated = false, onClick }: Props) => {
  return (
    <button className={s.button} onClick={onClick}>
      <NextIcon isRotated={isRotated} />
    </button>
  );
};
