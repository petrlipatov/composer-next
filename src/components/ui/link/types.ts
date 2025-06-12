import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface Props extends LinkProps {
  children: ReactNode;
  className?: string;
  size?: "s" | "m" | "l" | "xl";
  variant?: "primary" | "secondary";
}
