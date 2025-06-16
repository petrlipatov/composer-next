import { ButtonHTMLAttributes, ReactNode } from "react";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text";
  isLoading?: boolean;
  spinner?: ReactNode;
  spinnerPlacement?: "start" | "end";
};
