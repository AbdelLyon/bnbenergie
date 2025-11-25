'use client';

import { getLucideIcon } from '@/app/_utils/getLucideIcon';
import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  icon: string;
  gradient?: string;
  number?: string; // For backward compatibility or if the API returns 'number' instead of 'value'
  color?: string; // For backward compatibility
}

interface StatsProps {
  stats: StatItem[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mx-auto grid max-w-4xl grid-cols-3 gap-2 px-2 sm:gap-3 sm:px-4 md:gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = getLucideIcon(stat.icon);
          // Handle both 'number' (from JSON) and 'value' (potential Payload field)
          const displayValue = stat.number || stat.value;
          // Handle both 'color' (from JSON) and 'gradient' (potential Payload field)
          const displayGradient = stat.color || stat.gradient;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="group rounded-lg border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10 sm:rounded-xl"
            >
              <Card className="bg-transparent">
                <CardBody className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4">
                  <div
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br sm:h-8 sm:w-8 md:h-10 md:w-10 md:rounded-lg ${displayGradient} mb-1 sm:mb-1.5 md:mb-2`}
                  >
                    <Icon className="h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="mb-0.5 text-base font-black text-white drop-shadow-sm sm:text-lg md:mb-1 md:text-3xl">
                    {displayValue}
                  </div>
                  <div className="text-center text-[10px] leading-tight font-medium text-white drop-shadow-sm sm:text-xs md:text-sm">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
