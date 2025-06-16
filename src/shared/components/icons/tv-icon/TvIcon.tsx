import { Props } from "./types";

export const TvIcon = ({ className, isFilled = false }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="1 0 22 18"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="miter"
      className={className}
    >
      <rect x="2" y="1" width="20" height="16" rx="0" />
      <line x1="2" y1="6.5" x2="22" y2="6.5" />
      <line x1="10" y1="1.5" x2="7" y2="6" strokeLinecap="round" />
      <line x1="17" y1="1.5" x2="14" y2="6" strokeLinecap="round" />
    </svg>
  );
};
