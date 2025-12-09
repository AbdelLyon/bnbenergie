'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/10 dark:bg-blue-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-400/10 dark:bg-amber-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 dark:bg-cyan-500/20 blur-3xl"
      />
    </div>
  );
}
