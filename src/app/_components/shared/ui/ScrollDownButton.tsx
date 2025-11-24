'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ScrollDownButtonProps {
  onClick?: () => void;
}

export function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to the next section
      const nextSection = document.querySelector('main > div');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="mt-2 flex w-max cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-blue-500/40 via-cyan-500/20 to-yellow-400/20 p-2 transition-all hover:from-blue-500/60 hover:via-cyan-500/40 hover:to-yellow-400/40 md:mt-6"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="h-5 w-5 text-white md:h-6 md:w-6" />
      </motion.button>
    </div>
  );
}
