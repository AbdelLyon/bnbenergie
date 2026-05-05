"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { Stat } from "@/payload-types";
import { getLucideIcon } from "@/utils/getLucideIcon";

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex flex-wrap items-center justify-center divide-x divide-white/15 rounded-2xl border border-white/12 bg-white/8 backdrop-blur-md"
    >
      {stats.map((stat) => {
        const Icon = getLucideIcon(stat.icon);
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 px-6 py-4 sm:px-8"
          >
            <div className="flex items-center gap-2">
              <Icon
                className="h-4 w-4 text-secondary-300 shrink-0"
                strokeWidth={2}
              />
              <span className="font-display text-2xl font-black text-white sm:text-3xl">
                {stat.number}
              </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/75 sm:text-xs">
              {stat.label}
            </span>
          </div>
        );
      })}
    </LazyMotionDiv>
  );
}
