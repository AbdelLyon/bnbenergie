'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ReactElement } from 'react';

/**
 * Factory function pour créer des composants Framer Motion lazy-loaded.
 * Réduit la duplication de code en générant dynamiquement les wrappers.
 *
 * @param element - L'élément HTML à wrapper (ex: 'div', 'section', 'button')
 * @param options - Options de configuration pour le lazy loading
 * @returns Composant motion lazy-loaded
 */
function createLazyMotionComponent<T extends string>(
  element: T,
  options?: {
    /** Composant de chargement à afficher pendant le lazy load */
    loading?: () => ReactElement;
    /** Activer le SSR (défaut: false) */
    ssr?: boolean;
  }
): ComponentType<any> {
  const { loading, ssr = false } = options || {};

  return dynamic(
    () =>
      import('framer-motion').then((mod) => ({
        default: (mod.motion as any)[element] as ComponentType<any>,
      })),
    {
      ssr,
      ...(loading && { loading }),
    }
  ) as ComponentType<any>;
}

// Composants avec placeholder de chargement (pour les éléments de layout)
export const LazyMotionDiv = createLazyMotionComponent('div', {
  loading: () => <div style={{ minHeight: '100px' }} />,
});

export const LazyMotionSection = createLazyMotionComponent('section', {
  loading: () => <section style={{ minHeight: '100px' }} />,
});

// Composants sans placeholder (pour les éléments inline)
export const LazyMotionSpan = createLazyMotionComponent('span');
export const LazyMotionP = createLazyMotionComponent('p');
export const LazyMotionH2 = createLazyMotionComponent('h2');
export const LazyMotionH3 = createLazyMotionComponent('h3');
export const LazyMotionArticle = createLazyMotionComponent('article');
export const LazyMotionHeader = createLazyMotionComponent('header');
export const LazyMotionButton = createLazyMotionComponent('button');
