import { Logo } from "../logo";
import { NavButton } from "../nav-button/NavButton";
import s from "./Navigation.module.css";
import type { Props } from "./types";

export const Navigation = ({ children }: Props) => {
  return (
    <nav className={s.nav}>
      <NavButton>{children}</NavButton>
      <Logo />
    </nav>
  );
};
