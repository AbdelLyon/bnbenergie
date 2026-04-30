"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { CheckCircle2, Sparkles } from "lucide-react";

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {benefits.map((benefit, index) => (
          <LazyMotionDiv
            key={`${benefit}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
            className="group relative flex w-max cursor-pointer items-center gap-3 p-3 overflow-hidden rounded-2xl transition-all duration-200 hover:scale-[1.01]"
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 -left-4 bg-linear-to-r from-transparent via-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icône avec effet */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative bg-linear-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white rounded-full p-1.5 shadow-lg shadow-green-500/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-green-500/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            {/* Texte avec gradient au hover */}
            <span className="relative text-base font-semibold text-neutral-800 dark:text-foreground transition-all duration-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
              {benefit}
            </span>

            {/* Sparkle au hover */}
            <Sparkles className="h-4 w-4 text-amber-500 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:rotate-6" />
          </LazyMotionDiv>
        ))}
      </div>
    </div>
  );
}
