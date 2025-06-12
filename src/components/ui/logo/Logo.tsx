import Link from "next/link";
import s from "./Logo.module.css";
import cn from "classnames";
import { Props } from "./types";

export function Logo({ className }: Props) {
  return (
    <Link href="/" className={cn(s.titleContainer, className)}>
      <div className={s.name}>Liza Tikhonova</div>
      <div className={s.job}>composer</div>
    </Link>
  );
}
