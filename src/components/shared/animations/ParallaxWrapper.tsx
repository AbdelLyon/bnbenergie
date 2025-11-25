'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  className = '',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-15 * speed, 15 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

interface ImageParallaxProps {
  children: ReactNode;
  className?: string;
}

export function ImageParallax({
  children,
  className = '',
}: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
