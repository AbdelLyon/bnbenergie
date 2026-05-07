"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { TRANSITIONS } from "@/config/constants";
import { Heading } from "@/components/shared/ui/Heading";
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
  iconBg?: string;
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
  iconBg = "bg-secondary",
  iconColor = "text-foreground/60",
  className,
  children,
  stat,
  statLabel,
}: FeatureCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 0 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        className,
      )}
    >
      <LazyMotionDiv
        className={`mb-6 inline-flex rounded-xl ${iconBg} p-4`}
        whileHover={{ scale: 1.1, rotate: 5, transition: TRANSITIONS.smooth }}
      >
        <Icon className="h-8 w-8 text-white" />
      </LazyMotionDiv>

      <Heading as="h3" className="mb-4 text-xl text-neutral-900 dark:text-foreground">
        {title}
      </Heading>

      {stat && (
        <div className="absolute top-8 right-8 text-right">
          <div className="text-4xl font-black text-secondary">
            {stat}
          </div>
          {statLabel && (
            <div className="mt-1 text-xs font-bold text-secondary/60 uppercase">
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
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
                <span className="text-xs text-white">✓</span>
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
