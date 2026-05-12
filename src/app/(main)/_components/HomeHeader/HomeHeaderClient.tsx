"use client";

import { useImageCarousel } from "@/hooks";
import { useEffect } from "react";
import { PageHeader, ScrollDownButton, Stats, Title } from "@/components";
import type { Stat } from "@/payload-types";
import { ArrowRight, Phone, Zap } from "lucide-react";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";

interface HeaderData {
  chip?: string;
  title: string[];
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

  const scrollToNext = () => {
    document
      .getElementById("entreprise")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageHeader
      variant="carousel"
      images={data.heroImages}
      imageAlts={data.heroImageAlts}
      currentSlide={currentSlide}
      height="full"
      bottomElement={<ScrollDownButton onClick={scrollToNext} />}
      backgroundVariant="clean"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
        <Zap
          className="h-3 w-3 text-secondary-300"
          fill="currentColor"
          strokeWidth={0}
        />
        {data.chip}
      </span>

      <Title
        staticText={data.title[0] ?? "BNB"}
        animatedText={data.title[1] ?? "ÉNERGIE"}
        subtitle={data.description}
      />

      <CTAGroupButtons
        align="center"
        animated
        items={[
          {
            label: data.cta1,
            href: "/contact#contact-form",
            variant: "default",
            size: "sm",
            iconRight: <ArrowRight className="size-4" />,
            className: "bg-gradient-to-r from-primary to-primary-700",
          },
          {
            label: data.cta2,
            href: data.cta2_href,
            variant: "outline",
            size: "sm",
            iconLeft: <Phone className="size-4" />,
            className: "px-4",
          },
        ]}
      />

      <Stats stats={data.stats} />
    </PageHeader>
  );
}
