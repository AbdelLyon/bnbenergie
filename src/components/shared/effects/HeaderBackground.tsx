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

/**
 * 4 shots cinématiques 3D cohérents.
 *
 * Principe de cohérence physique :
 *   - Image qui se déplace vers la DROITE (x croissant) = caméra à gauche, regarde à droite
 *     → côté droit du sujet vers le spectateur → rotateY finit NÉGATIF
 *   - Image qui monte (y décroissant) = caméra en bas qui regarde vers le haut
 *     → rotateX finit POSITIF (haut de l'image vers spectateur)
 *   - Push-in (scale croissant) = caméra qui s'approche, se stabilise
 *     → rotateX part positif (légère plongée), revient à 0
 *
 * Règle critique : `animate` pointe TOUJOURS vers la destination finale.
 * La `key` gère le reset au moment où le slide redevient actif.
 * → Jamais de mouvement en arrière pendant le fondu de sortie.
 */
const SHOTS = [
  // ─── Shot A : Drone approach ────────────────────────────────────────────
  // Caméra avance vers le sujet en se stabilisant (ouverture de spot TV)
  {
    initial: {
      scale: 1.0,
      x: "0%",
      y: "2.5%",
      rotateX: 3,
      rotateY: 0,
      transformPerspective: 1300,
    },
    animate: {
      scale: 1.20,
      x: "0%",
      y: "-0.5%",
      rotateX: -0.4,
      rotateY: 0,
      transformPerspective: 1300,
    },
    duration: 14,
    ease: [0.08, 0, 0.42, 1] as const,
  },

  // ─── Shot B : Orbital sweep ──────────────────────────────────────────────
  // Panoramique de droite vers gauche. Image part à droite (x=+7%) → va à gauche (x=-5%).
  // Caméra part de la gauche (regarde à droite = rotateY +3.5)
  // → arrive à droite (regarde à gauche = rotateY -2.5)
  {
    initial: {
      scale: 1.08,
      x: "7%",
      y: "0.5%",
      rotateY: 3.5,
      rotateX: 0.8,
      transformPerspective: 950,
    },
    animate: {
      scale: 1.14,
      x: "-5%",
      y: "-0.5%",
      rotateY: -2.5,
      rotateX: -0.3,
      transformPerspective: 950,
    },
    duration: 13,
    ease: [0.15, 0, 0.80, 1] as const,
  },

  // ─── Shot C : Tilt-up reveal ─────────────────────────────────────────────
  // Image part basse (y=+6%), caméra regarde en bas → rotateX négatif (haut s'éloigne).
  // Monte vers y=-2% : caméra regarde vers le haut → rotateX positif (haut se rapproche).
  {
    initial: {
      scale: 1.06,
      x: "1.5%",
      y: "6%",
      rotateX: -3.2,
      rotateY: 1.2,
      transformPerspective: 1050,
    },
    animate: {
      scale: 1.17,
      x: "-1%",
      y: "-2%",
      rotateX: 0.6,
      rotateY: -0.5,
      transformPerspective: 1050,
    },
    duration: 13,
    ease: [0.12, 0, 0.65, 1] as const,
  },

  // ─── Shot D : Pull-back drift ────────────────────────────────────────────
  // Recule (scale 1.24→1.02) en dérivant vers la droite (x: -2%→+3%).
  // Caméra part à droite (regarde à gauche = rotateY -2) → finit à gauche (regarde à droite = rotateY +1.5).
  {
    initial: {
      scale: 1.24,
      x: "-2%",
      y: "1%",
      rotateX: 1.8,
      rotateY: -2,
      transformPerspective: 1100,
    },
    animate: {
      scale: 1.02,
      x: "3%",
      y: "-0.5%",
      rotateX: 0,
      rotateY: 1.5,
      transformPerspective: 1100,
    },
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
    /* Couche opacity : entrée franche (0.45s), dissolution lente (1.1s) */
    <LazyMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{
        opacity: {
          duration: isActive ? 0.45 : 1.1,
          ease: isActive ? [0.0, 0, 0.25, 1] : [0.55, 0, 1, 1],
        },
      }}
      className="absolute inset-0"
    >
      {/*
       * Zone élargie → les rotations 3D ne dévoilent jamais les bords noirs.
       * `animate` pointe TOUJOURS vers shot.animate, jamais en arrière.
       * La key gère seule le reset vers shot.initial lors du prochain passage.
       */}
      <LazyMotionDiv
        key={`${index}-${animKey}`}
        className="absolute inset-[-18%] w-[136%] h-[136%]"
        initial={shot.initial}
        animate={shot.animate}
        transition={{ duration: shot.duration, ease: shot.ease }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={index === 0}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-center"
          style={{ willChange: "transform" }}
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
