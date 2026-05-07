"use client";

import { HeaderBackground } from "@/components/shared/effects/HeaderBackground";
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
  backgroundVariant?: "default" | "clean";
  withParticles?: boolean; // ✅ NEW (optionnel)
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
}: PageHeaderProps) {
  const heightClass = {
    full: "min-h-[100dvh]",
    medium: "min-h-[60vh] md:min-h-[88vh]",
    small: "min-h-[30vh] md:min-h-[40vh]",
  }[height];

  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}
    >
      {/* Background */}
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
      {backgroundVariant === "default" && withParticles && <ParticlesEffect />}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-28 text-center sm:px-8 sm:py-32 md:py-40">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-6 md:gap-8">
          {children}
        </div>
      </div>

      {/* Scroll indicator */}
      {bottomElement && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10">
          {bottomElement}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-linear-to-t from-black/25 to-transparent" />
    </section>
  );
}
