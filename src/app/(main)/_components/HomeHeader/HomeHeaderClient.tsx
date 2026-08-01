"use client";

import { useImageCarousel } from "@/hooks";
import { useEffect } from "react";
import { PageHeader, Stats, Title } from "@/components";
import type { Stat } from "@/payload-types";
import { LazyMotionDiv } from "@/components/LazyComponents";

interface HeaderData {
  chip?: string;
  title: string[];
  seoTitle: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
  cta2_href: string;
  heroImages: string[];
  heroImageAlts?: string[];
  stats: Stat[];
}

export function HomeHeaderClient({ data }: { data: HeaderData }) {
  const currentSlide = useImageCarousel(data.heroImages.length, 10000);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);


  return (
    <PageHeader
      variant="carousel"
      images={data.heroImages}
      imageAlts={data.heroImageAlts}
      currentSlide={currentSlide}
      height="full"
      contentAlign="top"
      backgroundVariant="light"
    >
      {/* Title */}
      <LazyMotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-3"
      >
        <Title
          staticText={data.title[0] ?? "BNB"}
          animatedText={data.title[1] ?? "ÉNERGIE"}
          seoTitle={data.seoTitle}
          subtitle={data.description}
          tone="onLight"
        />
      </LazyMotionDiv>
      {/* Stats */}
      <LazyMotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="w-full"
      >
        <Stats stats={data.stats} tone="onLight" />
      </LazyMotionDiv>
    </PageHeader>
  );
}
