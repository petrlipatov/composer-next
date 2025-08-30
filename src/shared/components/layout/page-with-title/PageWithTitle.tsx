import { Page } from "@/shared/components/layout/page";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageWithTitle({ title, children, className }: Props) {
  return (
    <Page className={className}>
      <h1 className="visually-hidden">{title}</h1>
      {children}
    </Page>
  );
}
