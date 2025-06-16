import { ButtonHTMLAttributes, ReactNode } from "react";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text";
  size?: "s" | "m" | "l" | "xl";
  isLoading?: boolean;
  loadingText?: string;
  spinner?: ReactNode;
  spinnerPlacement?: "start" | "end";
};
