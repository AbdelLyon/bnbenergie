"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { CheckCircle2, Sparkles } from "lucide-react";

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-1">
        {benefits.map((benefit, index) => (
          <LazyMotionDiv
            key={`${benefit}-${index}`}
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.3, delay: 0 }}
            className="group flex w-max cursor-pointer items-center gap-3 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="bg-success text-white rounded-full p-1.5 transition-all duration-200 group-hover:scale-105">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <span className="text-base font-semibold text-neutral-800 dark:text-foreground transition-colors duration-300 group-hover:text-secondary">
              {benefit}
            </span>

            <Sparkles className="h-4 w-4 text-secondary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:rotate-6" />
          </LazyMotionDiv>
        ))}
      </div>
    </div>
  );
}
