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

export function HomeHeaderCTAButtons({
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
      className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
    >
      {/* Bouton principal - plus petit et sympa */}
      <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
        <Button
          as="a"
          href={primaryHref}
          size="md"
          radius="full"
          className="group relative overflow-hidden border-2 border-primary-500 bg-primary-500 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary-600 hover:shadow-lg sm:px-7 sm:text-base"
          endContent={<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />}
        >
          {primaryText}
        </Button>
      </motion.div>

      {/* Bouton secondaire - plus discret */}
      <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
        <Button
          as="a"
          href={secondaryHref}
          size="md"
          variant="bordered"
          radius="full"
          className="group relative overflow-hidden border-2 border-white/40 bg-white/5 px-6 py-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 sm:px-7 sm:text-base"
          startContent={<Phone className="h-4 w-4 sm:h-5 sm:w-5" />}
        >
          {secondaryText}
        </Button>
      </motion.div>
    </motion.div>
  );
}
