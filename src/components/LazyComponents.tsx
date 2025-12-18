'use client';

import dynamic from 'next/dynamic';
import type { HTMLMotionProps } from 'framer-motion';
import type { ComponentType } from 'react';

// Lazy load des composants lourds avec Framer Motion
export const LazyMotionDiv = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.div as ComponentType<HTMLMotionProps<'div'>>,
    })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: '100px' }} />,
  }
);

export const LazyMotionSection = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.section as ComponentType<HTMLMotionProps<'section'>>,
    })),
  {
    ssr: false,
    loading: () => <section style={{ minHeight: '100px' }} />,
  }
);

export const LazyMotionSpan = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.span as ComponentType<HTMLMotionProps<'span'>>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionP = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.p as ComponentType<HTMLMotionProps<'p'>>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionH2 = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.h2 as ComponentType<HTMLMotionProps<'h2'>>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionH3 = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.h3 as ComponentType<HTMLMotionProps<'h3'>>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionArticle = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.article as ComponentType<HTMLMotionProps<'article'>>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionHeader = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.header as ComponentType<HTMLMotionProps<'header'>>,
    })),
  {
    ssr: false,
  }
);


export const LazyMotionButton  = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.button as ComponentType<HTMLMotionProps<'button'>>,
    })),
  {
    ssr: false,
  }
);
