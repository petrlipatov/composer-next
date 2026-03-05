import { Page } from "@/shared/components/layout/page";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageWithTitle({ title, children, className, ...rest }: Props) {
  return (
    <Page className={className} {...rest}>
      <h1 className="visually-hidden">{title}</h1>
      {children}
    </Page>
  );
}
