"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { HeaderBackground } from "@/components/shared/effects/HeaderBackground";
import { HeroCanvas } from "@/components/shared/effects/HeroCanvas";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ParticlesEffect = dynamic(
  () =>
    import("@/components/shared/effects/ParticlesEffect").then((module) => ({
      default: module.ParticlesEffect,
    })),
  {
    ssr: false,
  },
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
  withParticles?: boolean;
  contentAlign?: "center" | "top";
}

const HEIGHT_CLASSES: Record<
  NonNullable<PageHeaderProps["height"]>,
  string
> = {
  full: "min-h-[100dvh]",
  medium: "min-h-[60vh] md:min-h-[88vh]",
  small: "min-h-[30vh] md:min-h-[40vh]",
};

export function PageHeader({
  images = [],
  imageAlts,
  currentSlide = 0,
  variant = "simple",
  height = "full",
  children,
  bottomElement,
  backgroundVariant = "default",
  withParticles = true,
  contentAlign = "center",
}: PageHeaderProps) {
  const heightClass = HEIGHT_CLASSES[height];

  const alignClass =
    contentAlign === "top" ? "items-start" : "items-center";

  const contentSpacingClass =
    contentAlign === "top"
      ? "pt-40 pb-16 sm:pt-48 md:pt-56"
      : "py-28 sm:py-32 md:py-40";

  const hasCarouselImages =
    variant === "carousel" && images.length > 0;

  const isLightBackground = backgroundVariant === "light";
  const isDefaultBackground = backgroundVariant === "default";

  return (
    <section
      className={`relative flex ${heightClass} ${alignClass} justify-center overflow-hidden`}
    >
      {isLightBackground ? (
        <div className="absolute inset-0 z-0 bg-neutral-50 shadow-2xl">
          <HeroCanvas />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
            <div className="h-px w-full bg-linear-to-r from-transparent via-amber-400/70 to-transparent" />
          </div>
        </div>
      ) : (
        <>
          <HeaderBackground
            images={hasCarouselImages ? images : []}
            imageAlts={imageAlts}
            currentSlide={currentSlide}
            variant={backgroundVariant}
          />

          {isDefaultBackground && (
            <div className="absolute inset-0 z-1 bg-black/50" />
          )}

          {isDefaultBackground && withParticles && <ParticlesEffect />}
        </>
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8 ${contentSpacingClass}`}
      >
        {children}
      </div>

      {bottomElement && (
        <LazyMotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.8,
          }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10"
        >
          {bottomElement}
        </LazyMotionDiv>
      )}

      {!isLightBackground && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-black/25 to-transparent" />
      )}
    </section>
  );
}