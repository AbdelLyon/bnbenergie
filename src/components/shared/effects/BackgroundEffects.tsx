'use client';

import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  variant?: 'default' | 'gradient' | 'subtle' | 'full';
  particleCount?: number;
}

export function BackgroundEffects({
  variant = 'default',
  particleCount = 15,
}: BackgroundEffectsProps) {
  if (variant === 'default') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary-500/5 absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-secondary-500/5 absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />

      {}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="bg-primary-500/5 absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="bg-secondary-500/5 absolute bottom-0 left-0 h-[800px] w-[800px] -translate-x-1/4 translate-y-1/3 rounded-full blur-[100px]"
      />

      {}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
          className="bg-primary-400/20 absolute h-1 w-1 rounded-full"
        />
      ))}
    </div>
  );
}
