'use client';

import { useImageCarousel } from '@/hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { HomeHeaderCTAButtons } from './HomeHeaderCTAButtons';
import { PageHeader, ScrollDownButton, Stats, Title } from '@/components';
import type { Stat } from '@/payload-types';

interface HeaderData {
  title: string[];
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
  const currentSlide = useImageCarousel(data.heroImages.length, 5000);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const scrollToNextSection = () => {
    const section = document.getElementById('pricing');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="flex max-w-5xl flex-col items-center gap-10 md:gap-12 lg:gap-14">
        <div className="space-y-4 text-center">
          <Title title={data.title} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-4xl space-y-2"
          >
            <p className="px-4 text-lg font-medium uppercase leading-relaxed tracking-wide text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-xl md:text-2xl lg:text-3xl">
              {data.subtitle}
            </p>
            <p className="px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl">
              {data.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HomeHeaderCTAButtons
            primaryText={data.cta1}
            primaryHref="#pricing"
            secondaryText={data.cta2}
            secondaryHref={data.cta2_href}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full"
        >
          <Stats stats={data.stats} />
        </motion.div>
      </div>
    </PageHeader>
  );
}
