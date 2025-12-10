'use client';

import { HeaderBackground } from '@/components/shared/effects/HeaderBackground';
import { ParticlesEffect } from '@/components/shared/effects/ParticlesEffect';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
  images?: string[];
  imageAlts?: string[];
  currentSlide?: number;
  variant?: 'carousel' | 'simple';
  height?: 'full' | 'medium' | 'small';
  children: ReactNode;
  bottomElement?: ReactNode;
  backgroundVariant?: 'default' | 'clean';
}

export function PageHeader({
  images = [],
  currentSlide = 0,
  variant = 'simple',
  height = 'full',
  children,
  bottomElement,
  backgroundVariant = 'default',
}: PageHeaderProps) {
  const heightClass = {
    full: 'min-h-[100dvh]',
    medium: 'min-h-[60vh] md:min-h-[88vh]',
    small: 'min-h-[30vh] md:min-h-[40vh]',
  }[height];

  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden bg-black antialiased`}
    >
      {variant === 'carousel' && images.length > 0 ? (
        <HeaderBackground
          images={images}
          currentSlide={currentSlide}
          variant={backgroundVariant}
        />
      ) : (
        <HeaderBackground
          images={[]}
          currentSlide={0}
          variant={backgroundVariant}
        />
      )}

      {backgroundVariant === 'default' && (
        <div className="absolute inset-0 z-1 bg-black/70" />
      )}

      {backgroundVariant === 'default' && <ParticlesEffect />}
      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 py-12 text-center antialiased [text-rendering:optimizeLegibility] sm:px-6 sm:py-16 md:py-20 lg:px-8`}
      >
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8">
          {children}
        </div>

        {}
        {bottomElement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-8"
          >
            {bottomElement}
          </motion.div>
        )}
      </div>
    </section>
  );
}
