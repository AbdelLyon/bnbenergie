'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Lazy load des composants lourds avec Framer Motion
export const LazyMotionDiv = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.div as ComponentType<any>,
    })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: '100px' }} />,
  }
);

export const LazyMotionSection = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.section as ComponentType<any>,
    })),
  {
    ssr: false,
    loading: () => <section style={{ minHeight: '100px' }} />,
  }
);

export const LazyMotionSpan = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.span as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionP = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.p as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionH2 = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.h2 as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionH3 = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.h3 as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionArticle = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.article as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);

export const LazyMotionHeader = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.header as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);


export const LazyMotionButton  = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion.button as ComponentType<any>,
    })),
  {
    ssr: false,
  }
);
