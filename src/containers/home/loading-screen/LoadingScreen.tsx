import NextImage from "next/image";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useImagePreloader } from "@/shared/hooks/useImagePreloader";
import { PIECES } from "@/shared/constants/content";

export const IMAGES = [
  "/images/pieces/dance-ballet.webp",
  "/images/pieces/day-in-may.webp",
  "/images/pieces/pulse.webp",
  "/images/pieces/revival-of-the-unknown.webp",
  "/images/pieces/tomorrow.webp",
  "/images/pieces/death-and-stuff.webp",
  "/images/pieces/eldorado.webp",
];

const IMAGES_TO_PRELOAD = PIECES.map((piece) => piece.image);

gsap.registerPlugin(useGSAP);

export function LoadingScreen({ interval = 100, durationMs = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  const barRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImagePreloader(IMAGES_TO_PRELOAD);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % IMAGES.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  useGSAP(() => {
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

    return () => tween.kill();
  }, [durationMs]);

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
        sizes="(max-width: 768px) 45px 100px"
        quality={40}
        priority
        style={{ zIndex: 5 }}
      />
      <NextImage
        width={75}
        height={75}
        src={IMAGES[1]}
        sizes="(max-width: 768px) 45px 100px"
        alt="preloaded-source"
        style={{ visibility: "hidden", position: "absolute" }}
        quality={40}
        priority
      />
      <NextImage
        width={75}
        height={75}
        src={IMAGES[2]}
        sizes="(max-width: 768px) 45px 100px"
        alt="preloaded-source"
        style={{ visibility: "hidden", position: "absolute" }}
        quality={40}
        priority
      />
      <NextImage
        width={75}
        height={75}
        sizes="(max-width: 768px) 45px 100px"
        src={IMAGES[3]}
        alt="preloaded-source"
        style={{ visibility: "hidden", position: "absolute" }}
        quality={40}
        priority
      />

      <div
        ref={barRef}
        style={{
          bottom: "0",
          position: "absolute",
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
          left: "50%",
          bottom: 0,
          transform: "translate(-30%, 0)",
          fontWeight: "800",
          fontSize: "18px",
          color: "#e7397a",
        }}
      >
        {Math.floor(percent)}%
      </span>
    </div>
  );
}
