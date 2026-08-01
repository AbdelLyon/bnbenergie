"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { TRANSITIONS } from "@/config/constants";
import type { BaseCardProps } from "@/types";
import { getLucideIcon } from "@/utils/getLucideIcon";
import { cn } from "@/utils/classenames";
import { ReactNode } from "react";

interface FeatureCardProps extends BaseCardProps {
  icon: string;
  title: string;
  description: string;
  items?: string[];
  gradient?: string;
  iconColor?: string;
  children?: ReactNode;
  stat?: string;
  statLabel?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  items,
  iconColor = "text-neutral-600",
  className,
  children,
  stat,
  statLabel,
}: FeatureCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 0 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-content2 bg-white dark:bg-content1 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className,
      )}
    >
      <LazyMotionDiv
        className="mb-6 inline-flex rounded-xl bg-neutral-100 p-4 text-neutral-700 dark:bg-content2 dark:text-foreground"
        whileHover={{
          scale: 1.05,
          transition: TRANSITIONS.smooth,
        }}
      >
        <Icon className="h-7 w-7" />
      </LazyMotionDiv>

      <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h3>

      {stat && (
        <div className="absolute top-8 right-8 text-right">
          <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {stat}
          </div>
          {statLabel && (
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
              {statLabel}
            </div>
          )}
        </div>
      )}

      <p className="mb-6 text-base leading-relaxed text-neutral-600 dark:text-default-500">
        {description}
      </p>

      {items && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                <span className={`text-xs ${iconColor}`}>✓</span>
              </div>
              <span className="text-sm text-neutral-700 dark:text-default-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </LazyMotionDiv>
  );
}
