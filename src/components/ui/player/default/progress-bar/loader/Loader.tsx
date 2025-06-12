import cn from "classnames";
import s from "./Loader.module.css";

type Props = {
  isLoading: boolean;
};

export const Loader = ({ isLoading }: Props) => (
  <div className={cn(s.loader, isLoading ? s.active : "")}></div>
);
