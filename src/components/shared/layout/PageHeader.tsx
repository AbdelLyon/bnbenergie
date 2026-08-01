"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { HeaderBackground } from "@/components/shared/effects/HeaderBackground";
import { HeroCanvas } from "@/components/shared/effects/HeroCanvas";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ParticlesEffect = dynamic(
  () =>
    import("@/components/shared/effects/ParticlesEffect").then((m) => ({
      default: m.ParticlesEffect,
    })),
  { ssr: false },
);

interface PageHeaderProps {
  images?: string[];
  imageAlts?: string[];
  currentSlide?: number;
  variant?: "carousel" | "simple";
  height?: "full" | "medium" | "small";
  children: ReactNode;
  bottomElement?: ReactNode;
  backgroundVariant?: "default" | "clean" | "light";
  withParticles?: boolean; // ✅ NEW (optionnel)
  contentAlign?: "center" | "top"; // position verticale du contenu
}

export function PageHeader({
  images = [],
  imageAlts,
  currentSlide = 0,
  variant = "simple",
  height = "full",
  children,
  bottomElement,
  backgroundVariant = "default",
  withParticles = true, // ✅ activé par défaut
  contentAlign = "center",
}: PageHeaderProps) {
  const heightClass = {
    full: "min-h-[100dvh]",
    medium: "min-h-[60vh] md:min-h-[88vh]",
    small: "min-h-[30vh] md:min-h-[40vh]",
  }[height];

  const alignClass = contentAlign === "top" ? "items-start" : "items-center";

  return (
    <section
      className={`relative ${heightClass} flex ${alignClass} justify-center overflow-hidden`}
    >
      {/* Background */}
      {backgroundVariant === "light" ? (
        <div className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>
      ) : (
        <>
          <HeaderBackground
            images={variant === "carousel" && images.length > 0 ? images : []}
            imageAlts={imageAlts}
            currentSlide={currentSlide}
            variant={backgroundVariant}
          />

          {/* Overlay */}
          {backgroundVariant === "default" && (
            <div className="absolute inset-0 z-1 bg-black/50" />
          )}

          {/* ✅ Particles (réintégré proprement) */}
          {backgroundVariant === "default" && withParticles && (
            <ParticlesEffect />
          )}
        </>
      )}

      {/* Content */}
      <div
        className={`relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8 ${
          contentAlign === "top"
            ? "pt-40 pb-16 sm:pt-48 md:pt-56"
            : "py-28 sm:py-32 md:py-40"
        }`}
      >
          {children}
      </div>

      {/* Scroll indicator */}
      {bottomElement && (
        <LazyMotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10"
        >
          {bottomElement}
        </LazyMotionDiv>
      )}

      {/* Bottom gradient (uniquement sur les hero sombres) */}
      {backgroundVariant !== "light" && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-linear-to-t from-black/25 to-transparent" />
      )}
    </section>
  );
}
