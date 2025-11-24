'use client';

import { Title } from '@/app/_components/features/Hero';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { AidCard } from '@/app/_components/shared/ui/AidCard';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import aidesData from '@/data/aidesData.json';
import aidesHeaderData from '@/data/aidesHeaderData.json';
import siteConfig from '@/data/siteConfig.json';
import { motion } from 'framer-motion';

export default function AidesPageContent() {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={aidesHeaderData.title}
          subtitle={aidesHeaderData.subtitle}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {aidesHeaderData.description}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats flottantes */}
        <StatsGrid
          stats={aidesData.stats.map((stat) => ({
            ...stat,
            gradient: 'from-green-500 to-emerald-500',
          }))}
        />

        {/* Introduction */}
        <IntroSection
          title={aidesData.intro.title}
          description={aidesData.intro.description}
        />

        {/* Aides principales */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {aidesData.main_aids.title}
          </motion.h2>
          <div className="space-y-8">
            {aidesData.main_aids.items.map((aid, index) => (
              <AidCard
                key={aid.title}
                icon={aid.icon}
                badge={aid.badge}
                title={aid.title}
                subtitle={aid.subtitle}
                description={aid.description}
                gradient={aid.gradient}
                conditions={aid.conditions}
                amounts={aid.amounts}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <CTASection
          title={aidesData.cta.title}
          description={aidesData.cta.subtitle}
          phoneNumber={siteConfig.contact.phone}
          primaryButton={{
            text: 'Demander mon devis',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
