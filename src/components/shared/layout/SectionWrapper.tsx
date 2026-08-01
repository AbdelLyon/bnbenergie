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
    dark: "bg-neutral-900 text-white dark:bg-background",
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
  title: string;
  subtitle?: string;
  align?: TextAlignment;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignments: Record<TextAlignment, string> = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <LazyMotionHeader
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={cn(
        "max-w-3xl",
        SPACING.header.mb,
        alignments[align],
        className,
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-neutral-200 bg-neutral-50/80 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:border-content2 dark:bg-content2 dark:text-default-400">
          {badge}
        </span>
      )}
      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl lg:text-[2.75rem] dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-neutral-500 md:text-lg dark:text-default-500">
          {subtitle}
        </p>
      )}
    </LazyMotionHeader>
  );
}
