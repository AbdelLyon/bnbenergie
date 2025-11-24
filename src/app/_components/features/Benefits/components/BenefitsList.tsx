'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-5">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{ x: 8 }}
            className="group flex w-max cursor-pointer items-center gap-4 rounded-2xl transition-colors"
          >
            <div className="bg-success-100 text-success-600 group-hover:bg-success-500 rounded-full p-2 shadow-sm transition-transform group-hover:scale-110 group-hover:text-white">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="group-hover:text-primary-700 text-lg font-bold text-neutral-800">
              {benefit}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
