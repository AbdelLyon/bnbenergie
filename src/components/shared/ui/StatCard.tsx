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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.08)] ${className}`}

    >
     <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-50/50 blur-2xl transition-all group-hover:bg-primary-100/50 " />

      <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 group-hover:scale-110 group-hover:text-primary-700">
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>
      <div className="-mt-10">

      <div className="font-display relative mb-1 text-3xl font-bold tracking-tight text-neutral-900">
        {value}
      </div>

      <div className="relative text-xs font-bold uppercase text-neutral-500">
        {label}
      </div>

      {description && (
        <p className="relative mt-3 text-sm font-medium leading-relaxed text-neutral-600">
          {description}
        </p>
      )}
      </div>
    </LazyMotionDiv>
  );
}

export default StatCard;
