'use client';

import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazySection({
  children,
  className = '',
  fallback = <div style={{ minHeight: '200px' }} />,
  threshold = 0.1,
  rootMargin = '100px',
}: LazySectionProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin, triggerOnce: true });

  return (
    <section ref={ref} className={className}>
      {isInView ? children : fallback}
    </section>
  );
}
