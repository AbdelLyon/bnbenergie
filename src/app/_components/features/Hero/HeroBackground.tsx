'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export interface HeroBackgroundProps {
  images: string[];
  imageAlts?: string[];
  currentSlide: number;
  variant?: 'default' | 'clean';
}

export function HeroBackground({
  images,
  imageAlts,
  currentSlide,
  variant = 'default',
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Images de fond */}
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity:
              currentSlide === index ? (variant === 'clean' ? 1 : 0.7) : 0,
            scale: currentSlide === index ? 1.1 : 1,
          }}
          style={{
            y: currentSlide === index ? y : 0,
          }}
          transition={{
            opacity: { duration: 2.0, ease: [0.4, 0, 0.2, 1] }, // Fade plus doux et cinématique
            scale: { duration: 10, ease: 'linear' }, // Effet Ken Burns (zoom lent)
          }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={image}
            alt={
              imageAlts?.[index] ||
              `Installation panneaux solaires BNB ÉNERGIE ${index + 1}`
            }
            fill
            priority={index === 0}
            quality={75}
            sizes="100vw"
            className="object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      ))}

      {/* Overlay principal */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: variant === 'clean' ? 0.8 : 0.6 }}
      />

      {/* Effets additionnels (seulement si default) */}
      {variant === 'default' && (
        <>
          <div
            className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700"
            style={{
              opacity: 0.15,
            }}
          />

          <div
            className="absolute top-1/3 left-0 rounded-full bg-blue-500 blur-3xl will-change-transform"
            style={{
              width: '400px',
              height: '400px',
              opacity: 0.3,
            }}
          />
          <div
            className="absolute right-0 bottom-1/3 rounded-full bg-cyan-400 blur-3xl will-change-transform"
            style={{
              width: '400px',
              height: '400px',
              opacity: 0.25,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 blur-3xl will-change-transform"
            style={{
              width: '300px',
              height: '300px',
              opacity: 0.2,
            }}
          />

          <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100px_100px]" />
        </>
      )}
    </div>
  );
}
