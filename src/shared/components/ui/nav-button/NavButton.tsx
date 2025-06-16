import { ReactNode } from "react";
import { LinkComponent } from "../link";
import s from "./NavButton.module.css";

export const NavButton = ({ children }: { children: ReactNode }) => {
  return (
    <LinkComponent className={s.navButton} href="/">
      {children}
    </LinkComponent>
  );
};
