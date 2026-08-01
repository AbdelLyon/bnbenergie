"use client";

import { LazyMotionArticle } from "@/components/LazyComponents";
import type { BaseCardProps, IconCard } from "@/types";
import { getLucideIcon } from "@/utils/getLucideIcon";

interface AboutCardProps extends BaseCardProps, IconCard {}

export function AboutCard({
  icon,
  title,
  content,
  stat,
  statLabel,
  index,
  className,
}: AboutCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionArticle
      initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.35,
        delay: 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative h-full ${className || ""}`}
    >
      <div className="relative h-full rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="mb-6 inline-flex rounded-xl bg-amber-50 p-4 text-amber-600">
          <Icon className="h-7 w-7" />
        </div>

        <div className="absolute top-8 right-8 text-right">
          <div className="text-3xl font-bold tracking-tight text-neutral-900">
            {stat}
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
            {statLabel}
          </div>
        </div>

        <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-neutral-600">
          {content}
        </p>
      </div>
    </LazyMotionArticle>
  );
}
