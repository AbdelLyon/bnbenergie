'use client';

import { ANIMATION_DURATIONS } from '@/config/constants';
import { cn } from '@heroui/theme';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description: string;
  phoneNumber: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'gradient' | 'solid' | 'minimal';
  className?: string;
}

export function CTASection({
  title,
  description,
  phoneNumber,
  primaryButton,
  secondaryButton,
  variant = 'gradient',
  className,
}: CTASectionProps) {
  const variants = {
    gradient: 'bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 dark:from-blue-700 dark:via-blue-800 dark:to-cyan-700',
    solid: 'bg-neutral-900 dark:bg-neutral-950',
    minimal: 'bg-neutral-50 dark:bg-content1 border border-neutral-200 dark:border-content2',
  };

  const textColors = {
    gradient: 'text-white',
    solid: 'text-white',
    minimal: 'text-neutral-900 dark:text-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 shadow-2xl md:p-12 lg:p-16 mb-20',
        variants[variant],
        className
      )}
    >
      {/* Effet de fond animé */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Titre */}
          <h2
            className={cn(
              'font-display mb-6 text-3xl font-bold md:text-4xl lg:text-5xl',
              textColors[variant]
            )}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className={cn(
              'mb-10 text-base leading-relaxed md:text-lg',
              variant === 'minimal'
                ? 'text-neutral-600 dark:text-default-500'
                : 'text-white/90'
            )}
          >
            {description}
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className={cn(
                  'group flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto',
                  variant === 'minimal'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    : 'bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600'
                )}
              >
                {primaryButton.text}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className={cn(
                  'group flex w-full items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 sm:w-auto',
                  variant === 'minimal'
                    ? 'border-neutral-300 dark:border-default-200 bg-white dark:bg-content1 text-neutral-900 dark:text-foreground hover:border-neutral-400 dark:hover:border-default-300'
                    : 'border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                )}
              >
                <Phone className="h-5 w-5" />
                {phoneNumber}
              </a>
            )}

            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className={cn(
                  'group flex w-full items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 sm:w-auto',
                  variant === 'minimal'
                    ? 'border-neutral-300 dark:border-default-200 text-neutral-700 dark:text-default-600 hover:border-neutral-400 dark:hover:border-default-300 hover:bg-neutral-100 dark:hover:bg-content2'
                    : 'border-white/30 text-white hover:bg-white/10'
                )}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
