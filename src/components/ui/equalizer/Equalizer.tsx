import cn from "classnames";
import s from "./Equalizer.module.css";

type Props = {
  color?: "accent" | "primary";
};

export const Equalizer = ({ color = "accent" }: Props) => {
  return (
    <div className={s.equalizer}>
      <div
        className={cn(s.bar, s.bar1, {
          [s.primary]: color === "primary",
          [s.accent]: color === "accent",
        })}
      />
      <div
        className={cn(s.bar, s.bar2, {
          [s.primary]: color === "primary",
          [s.accent]: color === "accent",
        })}
      />
      <div
        className={cn(s.bar, s.bar3, {
          [s.primary]: color === "primary",
          [s.accent]: color === "accent",
        })}
      />
    </div>
  );
};
