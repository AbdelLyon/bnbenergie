"use client";

import { useImageCarousel } from "@/hooks";
import { useEffect } from "react";
import { HomeHeaderCTAButtons } from "./HomeHeaderCTAButtons";
import { PageHeader, ScrollDownButton, Stats, Title } from "@/components";
import type { Stat } from "@/payload-types";
import { LazyMotionDiv } from "@/components/LazyComponents";

interface HeaderData {
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
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const scrollToNextSection = () => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageHeader
      variant="carousel"
      images={data.heroImages}
      imageAlts={data.heroImageAlts}
      currentSlide={currentSlide}
      height="full"
      bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      backgroundVariant="clean"
    >
      <LazyMotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0 }}
        className="flex max-w-6xl flex-col items-center gap-6"
      >
        <div className="space-y-6 text-center">
          <Title
            staticText={data.title[0] ?? "BNB"}
            animatedText={data.title[1] ?? "ÉNERGIE"}
            seoTitle={data.seoTitle}
          />

          <div className="mx-auto max-w-4xl space-y-2 lg:space-y-6">
            <h2 className="px-4 font-medium text-white text-lg lg:text-2xl xl:text-3xl">
              {data.subtitle}
            </h2>
            <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
              {data.description}
            </p>
          </div>
        </div>

        <HomeHeaderCTAButtons
          primaryText={data.cta1}
          primaryHref="/contact#contact-form"
          secondaryText={data.cta2}
          secondaryHref={data.cta2_href}
        />

        <LazyMotionDiv
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0 }}
          className="w-full"
        >
          <Stats stats={data.stats} />
        </LazyMotionDiv>
      </LazyMotionDiv>
    </PageHeader>
  );
}
