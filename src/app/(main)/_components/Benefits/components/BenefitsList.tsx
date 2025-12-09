'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-5">
        {benefits.map((benefit, index) => (
          <motion.div
            key={`${benefit}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{ x: 8 }}
            className="group relative flex w-max cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border-2 border-transparent transition-all hover:border-amber-200 dark:hover:border-amber-500/30"
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 -left-4 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icône avec effet */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white rounded-full p-2.5 shadow-lg shadow-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/40">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            {/* Texte avec gradient au hover */}
            <span className="relative text-lg font-bold text-neutral-800 dark:text-foreground transition-all duration-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
              {benefit}
            </span>

            {/* Sparkle au hover */}
            <Sparkles className="h-4 w-4 text-amber-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
