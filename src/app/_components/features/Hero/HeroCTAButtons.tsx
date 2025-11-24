'use client';

import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

interface HeroCTAButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}

export function HeroCTAButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: HeroCTAButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="flex w-full flex-col gap-4 px-4 sm:w-auto sm:flex-row sm:gap-5 sm:px-0"
    >
      {}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          as="a"
          href={primaryHref}
          size="lg"
          radius="full"
          className="group bg-primary-500 shadow-primary-500/25 hover:bg-primary-600 hover:shadow-primary-500/40 border-primary-500 relative overflow-hidden border-1 px-8 py-6 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:px-10 sm:py-6 sm:text-lg"
          endContent={<ArrowRight className="h-5 w-5 sm:h-5 sm:w-5" />}
        >
          <span className="relative z-10">{primaryText}</span>

          <motion.div
            className="bg-linear-gradient-to-r absolute inset-0 from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </Button>
      </motion.div>

      {}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          as="a"
          href={secondaryHref}
          size="lg"
          variant="bordered"
          radius="full"
          className="group relative overflow-hidden border-1 border-white/50 bg-white/10 px-8 py-6 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 sm:px-10 sm:py-6 sm:text-lg"
          startContent={<Phone className="h-5 w-5 sm:h-5 sm:w-5" />}
        >
          <span className="relative z-10">{secondaryText}</span>

          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
}
