
"use client";

import { Heading } from "@/components/shared/ui/Heading";
import { LazyMotionDiv } from "@/components/LazyComponents";
import {
  ANIMATION_DURATIONS,
  TRANSITIONS,
} from "@/config/constants";
import type { BaseCardProps } from "@/types";
import { getLucideIcon } from "@/utils/getLucideIcon";
import { Check } from "lucide-react";

interface AidAmount {
  range?: string;
  power?: string;
  amount: string;
  example?: string;
  bestFor?: string;
}

interface AidCardProps extends BaseCardProps {
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  conditions?: string[];
  amounts?: AidAmount[];
}

export function AidCard({
  icon,
  badge,
  title,
  subtitle,
  description,
  gradient,
  conditions,
  amounts,
  className = "",
}: AidCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 0 }}
      className={`bg-white transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col gap-6 md:flex-row">
        <LazyMotionDiv
          className={`shrink-0 self-start rounded-2xl bg-linear-to-br ${gradient} p-3 text-white shadow-sm`}
          whileHover={{
            scale: 1.05,
            transition: TRANSITIONS.smooth,
          }}
        >
          <Icon className="size-4" />
        </LazyMotionDiv>

        <div className="min-w-0 flex-1">
          <div className="mb-4">
            <span
              className={`mb-2 inline-block bg-linear-to-r ${gradient} bg-clip-text text-xs font-bold text-transparent`}
            >
              {badge}
            </span>

            <Heading
              as="h3"
              className="mb-2 text-sm leading-[1.05] tracking-[-0.04em] text-neutral-900"
            >
              {title}
            </Heading>

            <p
              className={`mb-4 bg-linear-to-r ${gradient} bg-clip-text text-sm font-semibold text-transparent`}
            >
              {subtitle}
            </p>
          </div>

          <p className="mb-6 leading-relaxed text-neutral-600">
            {description}
          </p>

          {conditions && conditions.length > 0 && (
            <div className="mb-6">
              <Heading
                as="h4"
                className="mb-3 text-sm text-neutral-900"
              >
                Conditions d&apos;éligibilité :
              </Heading>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {conditions.map((condition, index) => (
                  <LazyMotionDiv
                    key={`${condition}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: ANIMATION_DURATIONS.fast,
                      delay: 0,
                    }}
                    className="flex items-start gap-2"
                  >
                         <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500">
            <Check className={`h-3 w-3 text-white`} />
          </span>
                    <span className="text-sm text-neutral-700">
                      {condition}
                    </span>
                  </LazyMotionDiv>
                ))}
              </div>
            </div>
          )}

          {amounts && amounts.length > 0 && (
            <div className="mb-4 rounded-xl bg-linear-to-br from-neutral-50 to-blue-50 p-6">
              <Heading
                as="h4"
                className="mb-4 text-sm text-neutral-900"
              >
                Montants 2026 :
              </Heading>

              <div className="space-y-3">
                {amounts.map((amount, index) => (
                  <div
                    key={`${amount.range ?? amount.power ?? "amount"}-${index}`}
                    className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-neutral-700">
                      {amount.range ?? amount.power}
                    </span>

                    <span className="shrink-0 text-base font-bold text-blue-600">
                      {amount.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </LazyMotionDiv>
  );
}

