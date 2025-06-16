import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./Preloader.module.css";
import cn from "classnames";

export const ImageLoader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalImages);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.loaderContainer}>
      {[...Array(totalImages)].map((_, index) => (
        <Image
          key={index}
          width={300}
          height={300}
          src={`/images/preloader/${index + 1}.webp`}
          alt={`Loading ${index + 1}`}
          className={cn(
            s.loaderImage,
            index === activeIndex ? s.active : s.inactive,
            index < activeIndex && s.hidden
          )}
          style={{ zIndex: index === activeIndex ? totalImages : index }}
        />
      ))}
    </div>
  );
};
