import Image from "next/image";
import { Props } from "./types";
import s from "./Artwork.module.css";
import cn from "classnames";

export const Artwork = ({ src, className, sizes }: Props) => {
  return (
    <div className={cn(s.container, className)}>
      <Image className={s.image} fill src={src} alt="artwork" sizes={sizes} />;
    </div>
  );
};
