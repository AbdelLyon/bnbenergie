'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        {benefits.map((benefit, index) => (
          <LazyMotionDiv
            key={`${benefit}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="group relative flex w-max cursor-pointer items-center gap-2 p-2 overflow-hidden rounded-2xl transition-all"
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 -left-4 bg-linear-to-r from-transparent via-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icône avec effet */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative bg-linear-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white rounded-full p-1.5 shadow-lg shadow-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/40">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            {/* Texte avec gradient au hover */}
            <span className="relative text-base font-semibold text-neutral-800 dark:text-foreground transition-all duration-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
              {benefit}
            </span>

            {/* Sparkle au hover */}
            <Sparkles className="h-4 w-4 text-amber-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
          </LazyMotionDiv>
        ))}
      </div>
    </div>
  );
}
