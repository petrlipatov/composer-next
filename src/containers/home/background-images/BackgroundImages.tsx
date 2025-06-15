import Image from "next/image";
import { HOME_BACKGROUND_IMAGES } from "@/shared/constants/content";

import { useViewportSize } from "@/shared/hooks/useViewportSize";
import s from "./BackgroundImages.module.css";
// import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useRouter } from "next/router";
import { useRootStore } from "@/shared/contexts/store-context";

gsap.registerPlugin(useGSAP);

export const BackgroundImages = () => {
  const { width } = useViewportSize();
  const imageType = width > 720 ? "desktop" : "mobile";
  const { isClient } = useRootStore();

  if (!isClient) {
    return null;
  }

  return (
    <div className={s.container}>
      {HOME_BACKGROUND_IMAGES.map((img) => (
        <Image
          src={img[imageType]}
          key={img[imageType]}
          className={s.image}
          alt="background-image"
          fill={true}
          style={{ objectFit: "contain", objectPosition: "center" }}
          quality={60}
          priority
        />
      ))}
    </div>
  );
};
