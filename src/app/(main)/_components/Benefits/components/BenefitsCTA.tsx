"use client";

import {
  LazyMotionDiv,
  LazyMotionH3,
  LazyMotionP,
} from "@/components/LazyComponents";
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
      initial={{ x: 15 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: 0 }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-white shadow-2xl shadow-primary/20 md:p-12">
        <div className="relative z-10">
          <LazyMotionH3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.3 }}
            className="mb-6 text-3xl font-black drop-shadow-lg md:text-4xl"
          >
            {title}
          </LazyMotionH3>
          <LazyMotionP
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.3 }}
            className="mb-10 text-lg text-white/90 drop-shadow"
          >
            {description}
          </LazyMotionP>

          <div className="flex flex-col gap-5 sm:flex-row">
            <LazyMotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/nos-packs"
                className="text-primary inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-extrabold shadow-xl transition-all duration-300 hover:bg-neutral-50 hover:shadow-2xl"
              >
                {button1}
              </Link>
            </LazyMotionDiv>
            <LazyMotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/faq-panneaux-solaires"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-xl"
              >
                {button2}
              </Link>
            </LazyMotionDiv>
          </div>
        </div>
      </div>
    </LazyMotionDiv>
  );
}
