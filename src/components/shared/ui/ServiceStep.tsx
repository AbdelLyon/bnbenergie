"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";
import { Heading } from "@/components/shared/ui/Heading";
import type { BaseCardProps } from "@/types";
import { SCROLL_VIEWPORT } from "@/utils/animations";
import {  Clock } from "lucide-react";

interface ServiceStepProps extends BaseCardProps {
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  duration?: string;
  gradient?: string;
  isEven?: boolean;
}

export function ServiceStep({

  title,
  subtitle,
  description,
  items,
  duration,
  isEven = false,
  className = "",
}: ServiceStepProps) {

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: ANIMATION_DURATIONS.medium, delay: 0 }}
      className={`group relative ${className}`}
    >
      <div className="border-b border-neutral-200 pb-8 last:border-b-0 md:pb-10">
        

          <div className="flex-1">
            <div className="mb-3">
              <span className="mb-2 inline-block text-sm font-semibold text-primary-700">
                {subtitle}
              </span>
              <Heading as="h3" className="mb-2 text-[clamp(1rem,2vw,1.5rem)] leading-[1.05] text-neutral-900">
                {title}
              </Heading>
              {duration && (
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
            </div>

            <p className="mb-5 max-w-3xl leading-relaxed text-neutral-600">
              {description}
            </p>

            {items && items.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
    </LazyMotionDiv>
  );
}
