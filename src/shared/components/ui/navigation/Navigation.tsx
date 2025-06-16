import { Logo } from "../logo";
import { NavButton } from "../nav-button/NavButton";
import s from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavButton>&lt; back</NavButton>
      <Logo />
    </nav>
  );
};
