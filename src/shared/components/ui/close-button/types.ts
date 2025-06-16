import { ButtonHTMLAttributes } from "react";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "s" | "m" | "l" | "xl";
};
