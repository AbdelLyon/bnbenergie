"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import Image from "next/image";

export interface HeaderBackgroundProps {
  images: string[];
  imageAlts?: string[];
  currentSlide: number;
  variant?: "default" | "clean";
}

const SHOTS = [
  {
    from: { scale: 1.08, x: "0%", y: "3%", rotate: 0.2 },
    to: { scale: 1.05, x: "0%", y: "-4%", rotate: -0.2 },
    duration: 12,
  },
  {
    from: { scale: 1.08, x: "4%", y: "2%", rotate: 0.15 },
    to: { scale: 1.05, x: "-5%", y: "-3%", rotate: -0.15 },
    duration: 12,
  },
  {
    from: { scale: 1.08, x: "-4%", y: "3%", rotate: -0.15 },
    to: { scale: 1.05, x: "5%", y: "-3%", rotate: 0.15 },
    duration: 12,
  },
] as const;

interface CinematicSlideProps {
  image: string;
  alt: string;
  index: number;
  isActive: boolean;
}

function CinematicSlide({
  image,
  alt,
  index,
  isActive,
}: CinematicSlideProps) {
  const shot = SHOTS[index % SHOTS.length] ?? SHOTS[0];

  return (
    <LazyMotionDiv
      className="absolute inset-0"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        willChange: "opacity",
      }}
    >
      {/* CAMERA MOTION */}
      <LazyMotionDiv
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={isActive ? shot.to : shot.from}
        transition={{
          duration: shot.duration,
          ease: "linear",
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
          priority={isActive}
          loading={isActive ? "eager" : "lazy"}
          quality={85}
          sizes="100vw"
          className="object-cover object-center select-none"
        />

        {/* SUBTLE BREATHING */}
        <LazyMotionDiv
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: isActive ? [1, 1.01, 1] : 1,
          }}
          transition={{
            duration: shot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </LazyMotionDiv>

      {/* LIGHT SWEEP */}
      <LazyMotionDiv
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={
          isActive
            ? {
                x: ["-30%", "30%"],
                opacity: [0, 0.1, 0],
              }
            : {
                opacity: 0,
              }
        }
        transition={{
          duration: shot.duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
          mixBlendMode: "overlay",
          willChange: "transform, opacity",
        }}
      />

      {/* VIGNETTE */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.12), rgba(0,0,0,0.72))",
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
    <div className="absolute inset-0 overflow-hidden bg-black">
      {images.map((image, index) => {
        const isActive = currentSlide === index;
        const isNext = index === (currentSlide + 1) % images.length;

        if (!isActive && !isNext) {
          return null;
        }

        return (
          <CinematicSlide
            key={`${image}-${index}`}
            image={image}
            alt={imageAlts?.[index] ?? `slide ${index + 1}`}
            index={index}
            isActive={isActive}
          />
        );
      })}

      {/* GLOBAL OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.12) 0%,
              rgba(0,0,0,0.42) 55%,
              rgba(0,0,0,0.78) 100%
            )
          `,
        }}
      />
    </div>
  );
}
