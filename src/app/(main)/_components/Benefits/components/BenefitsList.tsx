"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { CheckCircle2 } from "lucide-react";

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
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
            className="group flex w-max items-center gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-content2"
          >
            <div className="rounded-full bg-green-50 p-1.5 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <span className="text-base font-medium text-neutral-800 dark:text-foreground">
              {benefit}
            </span>
          </LazyMotionDiv>
        ))}
      </div>
    </div>
  );
}
