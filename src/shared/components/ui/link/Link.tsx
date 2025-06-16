import Link from "next/link";
import cn from "classnames";
import { FC } from "react";
import { Props } from "./types";
import s from "./Link.module.css";

export const LinkComponent: FC<Props> = ({
  href,
  children,
  className,
  size = "m",
  variant = "primary",
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(s.link, s[`size-${size}`], s[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

LinkComponent.displayName = "Link";
