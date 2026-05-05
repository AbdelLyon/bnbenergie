"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { CheckCircle2 } from "lucide-react";

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-1">
      {benefits.map((benefit, index) => (
        <LazyMotionDiv
          key={`${benefit}-${index}`}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-default-50"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-3.5 w-3.5 text-success-600" />
          </div>
          <span className="text-sm font-medium text-foreground">{benefit}</span>
        </LazyMotionDiv>
      ))}
    </div>
  );
}
