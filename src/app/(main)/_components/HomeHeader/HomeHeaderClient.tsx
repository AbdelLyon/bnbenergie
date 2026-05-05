"use client";

import { useImageCarousel } from "@/hooks";
import { useEffect } from "react";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";
import { PageHeader, ScrollDownButton, Stats, Title } from "@/components";
import type { Stat } from "@/payload-types";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { ArrowRight, Phone } from "lucide-react";

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
          subtitle={data.subtitle }
          />
            <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
              {data.description}
            </p>
        </div>

        <CTAGroupButtons
          align="center"
          animated
          items={[
            {
              label: data.cta1,
              href: "/contact#contact-form",
              variant: "default",
              size: "lg",
              iconRight: <ArrowRight className="size-4" />,
            },
            {
              label: data.cta2,
              href: data.cta2_href,
              variant: "outline",
              size: "lg",
              iconLeft: <Phone className="size-4" />,
            },
          ]}
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
