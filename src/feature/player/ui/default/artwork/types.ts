export type Props = {
  src: string;
  className?: string;
  sizes?: string;
  onClick?: (src: string, blurDataURL: string) => void;
  blurSrc?: string;
};
