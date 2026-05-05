"use client";

import { LazyMotionHeader } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS, SPACING } from "@/config/constants";
import { Heading } from "@/components/shared/ui/Heading";
import type { SectionBackground, SectionWidth, TextAlignment } from "@/types";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { Badge } from "../ui/Badge";

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
    white: "bg-background dark:bg-background",
    gray: "bg-default-50 dark:bg-background",
    gradient: "bg-default-50 dark:bg-background",
    dark: "bg-default-900 text-white dark:bg-default-900",
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
      {badge && <Badge variant="warning">{badge}</Badge>}
      <Heading className="my-3 text-2xl md:text-3xl lg:text-4xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-default-500 md:text-base">
          {subtitle}
        </p>
      )}
    </LazyMotionHeader>
  );
}
