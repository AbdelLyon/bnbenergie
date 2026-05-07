"use client";

import { LazyMotionArticle } from "@/components/LazyComponents";
import { Heading } from "@/components/shared/ui/Heading";
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
      initial={{ x: index % 2 === 0 ? -10 : 10 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full ${className || ""}`}
    >
      <div className="relative h-full rounded-2xl border border-default-200 dark:border-default-700 bg-white dark:bg-content1 p-10 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="relative mb-8 inline-flex">
          <div className="relative bg-secondary text-white inline-flex rounded-2xl p-5 shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Icon className="h-8 w-8" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-right">
          <div className="text-4xl font-black text-secondary">
            {stat}
          </div>
          <div className="mt-1 text-xs font-bold text-secondary/60 uppercase">
            {statLabel}
          </div>
        </div>

        <Heading as="h3" className="mb-5 text-2xl">
          {title}
        </Heading>
        <p className="leading-relaxed text-base opacity-70">{content}</p>
      </div>
    </LazyMotionArticle>
  );
}
