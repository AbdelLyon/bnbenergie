'use client';

import { StatCard } from './StatCard';

interface Stat {
  icon: string;
  value: string;
  label: string;
  gradient?: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
  elevated?: boolean;
}

export function StatsGrid({
  stats,
  className = '',
  elevated = true,
}: StatsGridProps) {
  return (
    <div
      className={`${elevated ? 'relative z-20 -mt-20 mb-20' : 'mb-16'} ${className}`}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            gradient={stat.gradient}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
