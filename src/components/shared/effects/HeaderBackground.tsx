"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import Image from "next/image";
import { useState, useEffect } from "react";

export interface HeaderBackgroundProps {
  images: string[];
  imageAlts?: string[];
  currentSlide: number;
  variant?: "default" | "clean";
}

// Uniquement scale + translate : propriétés 100 % composées (GPU)
const SHOTS = [
  // Shot A : Drone approach
  {
    initial: { scale: 1.0,  x: "0%",   y: "2.5%" },
    animate: { scale: 1.18, x: "0%",   y: "-0.5%" },
    duration: 14,
    ease: [0.08, 0, 0.42, 1] as const,
  },
  // Shot B : Orbital sweep
  {
    initial: { scale: 1.08, x: "6%",  y: "0.5%" },
    animate: { scale: 1.14, x: "-5%", y: "-0.5%" },
    duration: 13,
    ease: [0.15, 0, 0.80, 1] as const,
  },
  // Shot C : Tilt-up reveal
  {
    initial: { scale: 1.06, x: "1.5%", y: "5.5%" },
    animate: { scale: 1.16, x: "-1%",  y: "-2%" },
    duration: 13,
    ease: [0.12, 0, 0.65, 1] as const,
  },
  // Shot D : Pull-back drift
  {
    initial: { scale: 1.22, x: "-2%", y: "1%" },
    animate: { scale: 1.02, x: "3%",  y: "-0.5%" },
    duration: 12,
    ease: [0.0, 0, 0.55, 1] as const,
  },
] as const;

function CinematicSlide({
  image,
  alt,
  index,
  isActive,
}: {
  image: string;
  alt: string;
  index: number;
  isActive: boolean;
}) {
  // Incrémenté uniquement quand le slide (re)devient actif → remet l'image à initial
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (isActive) setAnimKey((k) => k + 1);
  }, [isActive]);

  const shot = SHOTS[index % SHOTS.length] ?? SHOTS[0];

  return (
    /* Couche opacity : slide 0 visible immédiatement (LCP), les autres fondent */
    <LazyMotionDiv
      initial={{ opacity: index === 0 ? 1 : 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{
        opacity: {
          duration: isActive ? 0.45 : 1.1,
          ease: isActive ? [0.0, 0, 0.25, 1] : [0.55, 0, 1, 1],
        },
      }}
      className="absolute inset-0"
    >
      <LazyMotionDiv
        key={`${index}-${animKey}`}
        className="absolute inset-[-18%] w-[136%] h-[136%]"
        initial={shot.initial}
        animate={shot.animate}
        transition={{ duration: shot.duration, ease: shot.ease }}
        style={{ willChange: "transform" }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={index === 0}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-center"
        />
      </LazyMotionDiv>
    </LazyMotionDiv>
  );
}

export function HeaderBackground({
  images,
  imageAlts,
  currentSlide,
  variant = "default",
}: HeaderBackgroundProps) {
  const overlayStyle =
    variant === "clean"
      ? [
          "linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60))",
          "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 80%)",
          "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.28) 30%, transparent 55%)",
          "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 22%)",
        ].join(", ")
      : [
          "linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62))",
          "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.58) 80%)",
          "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 45%)",
        ].join(", ");

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {images.map((image, index) => (
        <CinematicSlide
          key={image}
          image={image}
          alt={
            imageAlts?.[index] ??
            `BNB ÉNERGIE — Installation panneaux solaires Bourg-en-Bresse — Vue ${index + 1}`
          }
          index={index}
          isActive={currentSlide === index}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayStyle }}
      />
    </div>
  );
}
