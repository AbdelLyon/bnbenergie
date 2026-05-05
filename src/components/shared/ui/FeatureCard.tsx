"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { Heading } from "@/components/shared/ui/Heading";
import type { BaseCardProps } from "@/types";
import { getLucideIcon } from "@/utils/getLucideIcon";
import { cn } from "@/utils/cn";
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
  className,
  children,
  stat,
  statLabel,
}: FeatureCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-2xl border border-default-200 bg-content1 p-7 shadow-small transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      {stat && (
        <div className="absolute top-7 right-7 text-right">
          <div className="font-display text-3xl font-black text-secondary">
            {stat}
          </div>
          {statLabel && (
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-default-400">
              {statLabel}
            </div>
          )}
        </div>
      )}

      <Heading as="h3" className="mb-2 text-base font-bold text-foreground">
        {title}
      </Heading>

      <p className="text-sm leading-relaxed text-default-500">{description}</p>

      {items && items.length > 0 && (
        <ul className="mt-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-bold text-primary">
                ✓
              </span>
              <span className="text-default-600">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </LazyMotionDiv>
  );
}
