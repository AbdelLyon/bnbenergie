'use client';

import { useImageCarousel } from '@/app/_hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PageHeader } from '../../shared/layout/PageHeader';
import { ScrollDownButton } from '../../shared/ui/ScrollDownButton';
import { Stats } from '../../shared/ui/Stats';
import { HeroCTAButtons } from './HeroCTAButtons';
import { Title } from './Title';

interface HeaderData {
  title: string[];
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
  cta2_href: string;
  heroImages: string[];
  heroImageAlts?: string[];
  stats: any[]; // Using any[] for now to avoid strict type checking issues between layers, or import Stat type
}

export function HeroClient({ data }: { data: HeaderData }) {
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
      {/* Titre */}
      <Title title={data.title} subtitle={data.subtitle} />

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="max-w-4xl px-4 text-sm leading-relaxed text-white drop-shadow-sm sm:text-base md:text-lg lg:text-xl"
      >
        {data.description}
      </motion.p>

      {/* Boutons CTA */}
      <HeroCTAButtons
        primaryText={data.cta1}
        primaryHref="#pricing"
        secondaryText={data.cta2}
        secondaryHref={data.cta2_href}
      />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="w-full pt-1 sm:pt-0"
      >
        <Stats stats={data.stats} />
      </motion.div>
    </PageHeader>
  );
}
