"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface HeaderBackgroundProps {
  images: string[];
  imageAlts?: string[];
  currentSlide: number;
  variant?: "default" | "clean";
}

const SHOTS = [
  {
    initial: { scale: 1.05, x: "0%", y: "3%", rotate: 0.2 },
    animate: { scale: 1.05, x: "0%", y: "-4%", rotate: -0.2 },
    duration: 12.5,
  },
  {
    initial: { scale: 1.05, x: "4%", y: "2%", rotate: 0.15 },
    animate: { scale: 1.05, x: "-5%", y: "-3%", rotate: -0.15 },
    duration: 12.5,
  },
  {
    initial: { scale: 1.05, x: "-4%", y: "3%", rotate: -0.15 },
    animate: { scale: 1.05, x: "5%", y: "-3%", rotate: 0.15 },
    duration: 12.5,
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isActive) setKey((k) => k + 1);
  }, [isActive]);

  const shot = SHOTS[index % SHOTS.length] ?? SHOTS[0];

  return (
    <LazyMotionDiv
      className="absolute inset-0"
      initial={{ opacity: index === 0 ? 1 : 0 }}
      animate={{
        opacity: isActive ? 1 : 0, // 🔥 crossfade plus doux
        scale: isActive ? 1 : 1.02, // micro depth transition
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* 🎥 CAMERA LAYER (mouvement plus “rapide visuellement”) */}
      <LazyMotionDiv
        key={key}
        className="absolute inset-0 w-full h-full"
        initial={shot.initial}
        animate={shot.animate}
        transition={{
          duration: shot.duration,
          ease: [0.22, 0.8, 0.2, 1],
        }}
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={index === 0}
          quality={100}
          className="object-cover object-center"
        />

        <LazyMotionDiv
          className="absolute inset-0"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{
            duration: shot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </LazyMotionDiv>

      <LazyMotionDiv
        className="absolute inset-0 pointer-events-none"
        animate={isActive ? { x: ["-25%", "25%"], opacity: [0, 0.12, 0] } : {}}
        transition={{
          duration: shot.duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%)",
          mixBlendMode: "overlay",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.15), rgba(0,0,0,0.7))",
        }}
      />
    </LazyMotionDiv>
  );
}

export function HeaderBackground({
  images,
  imageAlts,
  currentSlide,
}: HeaderBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black perspective-[1800px]">
      {images.map((image, index) => (
        <CinematicSlide
          key={image}
          image={image}
          alt={imageAlts?.[index] ?? `slide ${index}`}
          index={index}
          isActive={currentSlide === index}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
            linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.75) 100%)
          `,
        }}
      />
    </div>
  );
}
