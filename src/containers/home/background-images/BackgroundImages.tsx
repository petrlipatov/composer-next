import Image from "next/image";
import { HOME_BACKGROUND_IMAGES } from "@/shared/constants/content";

import { useViewportSize } from "@/shared/hooks/useViewportSize";
import s from "./BackgroundImages.module.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export const BackgroundImages = () => {
  const ref = useRef(null);

  const { width } = useViewportSize();
  const imageType = width > 720 ? "desktop" : "mobile";

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: "30px" },
      {
        opacity: 1,
        duration: 0.5,
        y: "0px",
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={ref} className={s.container}>
      {HOME_BACKGROUND_IMAGES.map((img) => (
        <Image
          src={img[imageType]}
          key={img[imageType]}
          className={s.image}
          alt="background-image"
          fill={true}
          style={{ objectFit: "contain", objectPosition: "center" }}
          quality={100}
          priority
        />
      ))}
    </div>
  );
};
