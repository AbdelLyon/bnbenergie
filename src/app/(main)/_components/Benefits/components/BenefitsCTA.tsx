"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import Link from "next/link";

interface BenefitsCTAProps {
  title: string;
  description: string;
  button1: string;
  button2: string;
}

export function BenefitsCTA({
  title,
  description,
  button1,
  button2,
}: BenefitsCTAProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: 0 }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white p-10 text-center shadow-sm md:p-12">
        <h3 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          {title}
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/nos-packs"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
          >
            {button1}
          </Link>
          <Link
            href="/faq-panneaux-solaires"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-semibold text-neutral-800 transition-colors duration-200 hover:bg-neutral-50"
          >
            {button2}
          </Link>
        </div>
      </div>
    </LazyMotionDiv>
  );
}
