"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import type { BaseCardProps } from "@/types";
import { cn } from "@/utils/classenames";
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
  gradient = "from-primary-300 to-amber-200",
  className,
}: StatCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex min-h-47.5 flex-col overflow-hidden rounded-2xl",
        "border border-neutral-200/70 bg-white/95 p-5",
        "shadow-[0_8px_30px_-18px_rgba(15,23,42,0.22)]",
        "backdrop-blur-sm",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "hover:shadow-[0_20px_45px_-24px_rgba(15,23,42,0.28)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full",
          "bg-linear-to-br opacity-[0.04] blur-3xl",
          "transition-all duration-500 ease-out",
          "group-hover:scale-110 group-hover:opacity-[0.08]",
          gradient,
        )}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 h-16 w-2/3 -translate-x-1/2",
          "bg-linear-to-b opacity-[0.02] blur-2xl",
          gradient,
        )}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-1 rounded-xl bg-linear-to-br opacity-10 blur-md",
              "transition-all duration-300",
              "group-hover:scale-105 group-hover:opacity-15",
              gradient,
            )}
          />

          <div
            className={cn(
              "relative flex size-11 shrink-0 items-center justify-center rounded-xl",
              "border border-amber-200/60 bg-amber-50/70 text-amber-600",
              "shadow-[0_8px_20px_-12px_rgba(217,119,6,0.4)]",
              "transition-all duration-300 ease-out",
              "group-hover:scale-105",
              "group-hover:border-amber-300/60",
              "group-hover:bg-amber-100/60",
              "group-hover:text-amber-700",
            )}
          >
            <Icon
              className="size-5 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={2.2}
            />
          </div>
        </div>

        <div className="relative mt-1.5 flex size-3 items-center justify-center">
          <span className="absolute size-3 rounded-full bg-amber-400/15 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

          <span className="relative size-2 rounded-full bg-amber-500/80 shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600" />
        </div>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <div className="font-display text-[2rem] font-bold leading-none tracking-[-0.045em] text-neutral-950">
          {value}
        </div>

        <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
          {label}
        </div>

        {description && (
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-neutral-600">
            {description}
          </p>
        )}
      </div>

    </LazyMotionDiv>
  );
}

export default StatCard;