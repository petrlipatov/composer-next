import NextImage from "next/image";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useImagePreloader } from "@/shared/hooks/useImagePreloader";
import { PIECES, PROJECTS } from "@/shared/constants/content";

export const IMAGES = [
  "/images/pieces/dance-ballet.webp",
  "/images/pieces/day-in-may.webp",
  "/images/pieces/pulse.webp",
  "/images/pieces/revival-of-the-unknown.webp",
  "/images/pieces/tomorrow.webp",
  "/images/pieces/death-and-stuff.webp",
  "/images/pieces/eldorado.webp",
];

const PIECES_IMAGES_TO_PRELOAD = PIECES.map((piece) => piece.image);
const PROJECTS_IMAGES_TO_PRELOAD = PROJECTS.map((project) => project.image);

gsap.registerPlugin(useGSAP);

export function LoadingScreen({ interval = 100, durationMs = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  const barRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Прелоадим картинки
  useImagePreloader(PIECES_IMAGES_TO_PRELOAD);
  useImagePreloader(PROJECTS_IMAGES_TO_PRELOAD);

  // Карусель картинок
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % IMAGES.length);
    }, interval);
    return () => clearInterval(intervalID);
  }, [interval]);

  const restartAnimation = useCallback(() => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const state = { value: 0 };

    gsap.set(barRef.current, {
      scaleY: 0,
      transformOrigin: "bottom center",
    });
    gsap.set(numberRef.current, {
      y: 0,
      xPercent: -50,
    });

    gsap.killTweensOf(state);

    const tween = gsap.to(state, {
      value: 1,
      duration: durationMs / 1000,
      ease: "power2.out",
      onUpdate: () => {
        const p = state.value * 100;
        setPercent(Math.round(p));

        if (barRef.current && numberRef.current) {
          barRef.current.style.transform = `scaleY(${state.value - 0.04})`;
          numberRef.current.style.transform = `translate(-50%, ${
            -containerHeight * state.value + 20
          }px)`;
        }
      },
    });

    return tween; // возвращаем ссылку на анимацию
  }, [durationMs]);

  useGSAP(() => {
    const tween = restartAnimation();
    return () => {
      tween.kill();
    };
  }, [restartAnimation]);

  useLayoutEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setPercent(0);
        restartAnimation();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [restartAnimation]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#d6d6d6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        zIndex: 10,
      }}
    >
      <NextImage
        width={75}
        height={75}
        src={IMAGES[currentIndex]}
        alt="preloader-image"
        quality={40}
        priority
        style={{ zIndex: 5 }}
      />

      {IMAGES.slice(1, 4).map((src, i) => (
        <NextImage
          key={i}
          width={75}
          height={75}
          src={src}
          alt="preloaded-source"
          quality={40}
          priority
          style={{ visibility: "hidden", position: "absolute" }}
        />
      ))}

      <div
        ref={barRef}
        style={{
          bottom: 0,
          position: "absolute",
          zIndex: 2,
          width: "1px",
          height: "100%",
          background: "#e7397a",
          transform: "scaleY(0)",
        }}
      />

      <span
        ref={numberRef}
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          bottom: 0,
          transform: "translate(-50%, 0)",
          fontWeight: 800,
          fontSize: "18px",
          color: "#e7397a",
          backgroundColor: "var(--background)",
        }}
      >
        {percent}%
      </span>
    </div>
  );
}
