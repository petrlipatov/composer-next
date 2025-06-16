import s from "./TimeTag.module.css";

type Props = {
  time: string;
};

export const TimeTag = ({ time }: Props) => {
  return <div className={s.timeTag}>{time}</div>;
};
