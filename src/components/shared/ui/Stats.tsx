'use client';

import { Stat } from '@/payload-types';
import { getLucideIcon } from '@/utils/getLucideIcon';
import { motion } from 'framer-motion';


interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-4 md:gap-12 lg:gap-16"
      >
        {stats.map((stat, index) => {
          const Icon = getLucideIcon(stat.icon);
          const displayValue = stat.number;
          const displayGradient = stat.color;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="group flex flex-col items-center gap-2 text-center transition-transform hover:scale-110"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${displayGradient} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
                  {displayValue}
                </div>
              </div>
              <div className="text-sm font-medium uppercase tracking-wider text-white/70 md:text-base">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
