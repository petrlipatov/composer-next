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

  const restart = useCallback(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const state = { value: 0 };
      const height = containerRef.current!.clientHeight;

      gsap.set(barRef.current, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(numberRef.current, { y: 0, xPercent: -50 });

      gsap.to(state, {
        value: 1,
        duration: durationMs / 1000,
        ease: "power2.out",
        onUpdate: () => {
          const p = state.value * 100;
          setPercent(Math.round(p));
          if (barRef.current && numberRef.current) {
            barRef.current.style.transform = `scaleY(${state.value - 0.04})`;
            numberRef.current.style.transform = `translate(-50%, ${
              -height * state.value + 20
            }px)`;
          }
        },
      });
    }, containerRef);

    // возвращаем revert для ручного вызова или автоматической очистки
    return () => ctx.revert();
  }, [durationMs]);

  useGSAP(() => {
    const cleanup = restart();
    return cleanup;
  }, [restart]);

  useLayoutEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setPercent(0);
        restart();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [restart]);

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
