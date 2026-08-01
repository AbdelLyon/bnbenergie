"use client";

import { LazyMotionHeader } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS, SPACING } from "@/config/constants";
import type { SectionBackground, SectionWidth, TextAlignment } from "@/types";
import { cn } from "@/utils/classenames";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: SectionBackground;
}

export function SectionWrapper({
  children,
  id,
  className,
  background = "white",
}: SectionWrapperProps) {
  const backgrounds: Record<SectionBackground, string> = {
    white: "bg-[var(--bg-card)]",
    gray: "bg-[var(--bg-section)]",
    gradient: "bg-[var(--bg-section)]",
    dark: "bg-neutral-900 text-white",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        SPACING.section.py,
        backgrounds[background],
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  width?: SectionWidth;
}

export function SectionContainer({
  children,
  className,
  width = "default",
}: SectionContainerProps) {
  const widths: Record<SectionWidth, string> = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn("mx-auto", SPACING.section.px, widths[width], className)}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: TextAlignment;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <LazyMotionHeader
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={cn("text-left", SPACING.header.mb, className)}
    >
      {badge && (
        <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.16em] text-secondary-600">
          {badge}
        </p>
      )}

      {/* Titre à gauche + trait qui file vers la droite (façon rifanor) */}
      <div className="flex items-end gap-5">
    <h2 className="max-w-[18ch] text-[clamp(1.375rem,2.75vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-900">
  {title}
</h2>
        <span
          aria-hidden="true"
          className="mb-2.5 hidden h-px flex-1 bg-neutral-200 md:block"
        />
      </div>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-neutral-500 md:text-lg">
          {subtitle}
        </p>
      )}
    </LazyMotionHeader>
  );
}
