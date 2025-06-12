import cn from "classnames";
import s from "./NextIcon.module.css";
import { Props } from "./types";

export const NextIcon = ({
  className,
  isRotated = false,
  isFilled = false,
}: Props) => {
  return (
    <svg
      viewBox="3 3 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(s.defaultStyles, className)}
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
      style={{ transform: isRotated ? "rotate(180deg)" : "none" }}
    >
      <polygon points="4 4 4 20 16 12 4 4" />
      <line x1="20" y1="4" x2="20" y2="20" />
    </svg>
  );
};
