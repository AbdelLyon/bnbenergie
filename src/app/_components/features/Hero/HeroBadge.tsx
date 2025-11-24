'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface HeroBadgeProps {
  text: string;
}

export function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
    >
      <Zap className="h-3 w-3 text-amber-300 sm:h-4 sm:w-4" />
      {text}
    </motion.div>
  );
}
