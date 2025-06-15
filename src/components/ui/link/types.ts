import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

export interface Props
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  className?: string;
  size?: "s" | "m" | "l" | "xl";
  variant?: "primary" | "secondary";
}
