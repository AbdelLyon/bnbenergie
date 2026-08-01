"use client";

import {
  SectionContainer,
  SectionWrapper,
} from "@/components/shared/layout/SectionWrapper";
import { LazyMotionDiv } from "@/components/LazyComponents";
import type { AboutData } from "@/types";

export function AboutClient({ data }: { data: AboutData }) {
  const title = Array.isArray(data.header.title)
    ? data.header.title.join(" ")
    : data.header.title;

  return (
    <SectionWrapper id="entreprise" background="white">
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
          {/* Colonne gauche : titre + intro (sticky, façon rifanor) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-secondary-600">
                {data.header.badge}
              </p>
              <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-4xl">
                {title}
              </h2>
              <span
                aria-hidden="true"
                className="mt-6 hidden h-px w-16 bg-secondary-500 md:block"
              />
              <p className="mt-6 max-w-[46ch] text-base leading-[1.75] text-neutral-600">
                {data.header.description}
              </p>
            </div>
          </div>

          {/* Colonne droite : liste éditoriale séparée par des filets (pas de cartes) */}
          <div className="lg:col-span-6 lg:col-start-7">
            {data.seoContent?.map((item, index) => (
              <LazyMotionDiv
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-b border-neutral-200 py-8 first:pt-0 last:border-0"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
                    {item.title}
                  </h3>
                  {item.stat && (
                    <div className="shrink-0 text-right">
                      <div className="text-2xl font-semibold leading-none tracking-tight text-secondary-600 md:text-[1.75rem]">
                        {item.stat}
                      </div>
                      {item.statLabel && (
                        <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                          {item.statLabel}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.7] text-neutral-600">
                  {item.content}
                </p>
              </LazyMotionDiv>
            ))}
          </div>
        </div>
      </SectionContainer>
    </SectionWrapper>
  );
}
