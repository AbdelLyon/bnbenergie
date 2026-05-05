"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { HeaderBackground } from "@/components/shared/effects/HeaderBackground";
import { ReactNode } from "react";

interface PageHeaderProps {
  images?: string[];
  imageAlts?: string[];
  currentSlide?: number;
  variant?: "carousel" | "simple";
  height?: "full" | "medium" | "small";
  children: ReactNode;
  bottomElement?: ReactNode;
  backgroundVariant?: "default" | "clean";
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
      <HeaderBackground
        images={variant === "carousel" && images.length > 0 ? images : []}
        imageAlts={imageAlts}
        currentSlide={currentSlide}
        variant={backgroundVariant}
      />

      {backgroundVariant === "default" && (
        <div className="absolute inset-0 z-1 bg-black/50" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-28 text-center sm:px-8 sm:py-32 md:py-40">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-6 md:gap-8">
          {children}
        </div>
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

      {/* Bottom gradient fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-linear-to-t from-black/25 to-transparent" />
    </section>
  );
}
