"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import type { BaseCardProps } from "@/types";
import { getLucideIcon } from "@/utils/getLucideIcon";

interface StatCardProps extends BaseCardProps {
  icon: string;
  value: string;
  label: string;
  gradient?: string;
  description?: string;
}

export function StatCard({
  icon,
  value,
  label,
  description,
  className = "",
}: StatCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className={`group ds-card relative flex flex-col items-center justify-center overflow-hidden p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-50/50 blur-2xl transition-all group-hover:bg-primary-100/50 dark:bg-primary-900/10" />

      <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 group-hover:scale-110 group-hover:text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>

      <div className="font-display relative mb-1 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {value}
      </div>

      <div className="relative text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">
        {label}
      </div>

      {description && (
        <p className="relative mt-3 text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </LazyMotionDiv>
  );
}

export default StatCard;
