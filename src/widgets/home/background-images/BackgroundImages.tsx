import { HOME_BACKGROUND_IMAGES } from "@/shared/constants/content";
import s from "./BackgroundImages.module.css";

export const BackgroundImages = () => {
  return (
    <div className={s.container}>
      {HOME_BACKGROUND_IMAGES.map((img, index) => (
        <picture key={index}>
          <source media="(min-width: 721px)" srcSet={img.desktop} />
          <source media="(max-width: 720px)" srcSet={img.mobile} />
          <img
            src={img.mobile}
            alt="background image"
            loading="eager"
            className={s.image}
          />
        </picture>
      ))}
    </div>
  );
};
