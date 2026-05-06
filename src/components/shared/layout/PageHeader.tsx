'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import { HeaderBackground } from '@/components/shared/effects/HeaderBackground';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const ParticlesEffect = dynamic(
  () =>
    import('@/components/shared/effects/ParticlesEffect').then((m) => ({
      default: m.ParticlesEffect,
    })),
  { ssr: false }
);

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
  imageAlts,
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
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden antialiased`}
    >
      {/* Background */}
      {variant === 'carousel' && images.length > 0 ? (
        <HeaderBackground
          images={images}
          imageAlts={imageAlts}
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
        <div className="absolute inset-0 z-1 bg-black/50" />
      )}

      {backgroundVariant === 'default' && <ParticlesEffect />}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 text-center sm:px-6 py-28">
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-7 md:gap-8">
          {children}
        </div>

        {bottomElement && (
          <LazyMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
            className="absolute left-1/2 -translate-x-1/2 sm:bottom-20"
          >
            {bottomElement}
          </LazyMotionDiv>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full">
        <div className="h-px w-full bg-linear-to-r from-blue-400/10 via-blue-400/40 to-blue-400/10 dark:via-blue-400/40" />
      </div>
    </section>
  );
}
