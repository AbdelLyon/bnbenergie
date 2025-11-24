'use client';

import { ANIMATION_DURATIONS, SPACING } from '@/app/_config/constants';
import type {
  SectionBackground,
  SectionWidth,
  TextAlignment,
} from '@/app/_types';
import { cn } from '@heroui/theme';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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
  background = 'white',
}: SectionWrapperProps) {
  const backgrounds: Record<SectionBackground, string> = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    gradient: 'bg-gradient-subtle',
    dark: 'bg-neutral-900 text-white',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        SPACING.section.py,
        backgrounds[background],
        className
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
  width = 'default',
}: SectionContainerProps) {
  const widths: Record<SectionWidth, string> = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto', SPACING.section.px, widths[width], className)}
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
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignments: Record<TextAlignment, string> = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.medium }}
      className={cn(
        'max-w-3xl',
        SPACING.header.mb,
        alignments[align],
        className
      )}
    >
      {badge && (
        <span className="border-primary-500/30 bg-primary-500/10 text-primary-700 shadow-primary-500/10 mb-4 inline-block rounded-full border px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md md:mb-6 md:px-6 md:py-3 md:text-sm">
          {badge}
        </span>
      )}
      <h2 className="font-display mb-4 text-3xl font-black text-neutral-900 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg lg:text-xl">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
