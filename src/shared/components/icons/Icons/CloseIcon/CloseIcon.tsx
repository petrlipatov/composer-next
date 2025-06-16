import cn from "classnames";
import s from "./CloseIcon.module.css";
import { Props } from "./types";

export const CloseIcon = ({ color = "#000000", className }: Props) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(s.svg, className)}
    >
      <rect
        transform="rotate(45)"
        ry="0"
        y="-1"
        x="4.3137083"
        height="2"
        width="14"
        style={{ fill: color }}
      />
      <rect
        transform="rotate(-45)"
        ry="0"
        y="10.313708"
        x="-7"
        height="2"
        width="14"
        style={{ fill: color }}
      />
    </svg>
  );
};
