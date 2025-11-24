'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import statsData from '@/data/statsData.json';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';

export function Stats() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mx-auto grid max-w-4xl grid-cols-3 gap-2 px-2 sm:gap-3 sm:px-4 md:gap-6"
      >
        {statsData.map((stat, index) => {
          const Icon = getLucideIcon(stat.icon);
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
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br sm:h-8 sm:w-8 md:h-10 md:w-10 md:rounded-lg ${stat.color} mb-1 sm:mb-1.5 md:mb-2`}
                  >
                    <Icon className="h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="mb-0.5 text-base font-black text-white drop-shadow-sm sm:text-lg md:mb-1 md:text-3xl">
                    {stat.number}
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
