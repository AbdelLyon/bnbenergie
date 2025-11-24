'use client';

import { Title } from '@/app/_components/features/Hero/Title';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { FeatureCard } from '@/app/_components/shared/ui/FeatureCard';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { ServiceStep } from '@/app/_components/shared/ui/ServiceStep';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import servicesData from '@/data/servicesData.json';
import servicesHeaderData from '@/data/servicesHeaderData.json';
import siteConfig from '@/data/siteConfig.json';
import { motion } from 'framer-motion';

export default function ServicesPageContent() {
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
          title={servicesHeaderData.title}
          subtitle={servicesHeaderData.subtitle}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {servicesHeaderData.description}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats */}
        <StatsGrid
          stats={servicesData.stats.map((stat) => ({
            ...stat,
            gradient: 'from-blue-500 to-cyan-500',
          }))}
        />

        {/* Introduction */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <IntroSection
            title={servicesData.intro.title}
            description=""
            className="mb-0"
          />
          <p className="mb-4 text-lg text-neutral-600">
            {servicesData.intro.subtitle}
          </p>
          <p className="leading-relaxed text-neutral-600">
            {servicesData.intro.description}
          </p>
        </div>

        {/* Étapes */}
        <div className="mb-20 space-y-12">
          {servicesData.steps.map((step, index) => (
            <ServiceStep
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              items={step.highlights}
              duration={step.duration}
              gradient={step.gradient}
              isEven={index % 2 === 0}
              index={index}
            />
          ))}
        </div>

        {/* Services supplémentaires */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {servicesData.guarantees.title}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.guarantees.items.map((service: { title: string; icon: string; description: string }, index) => (
              <FeatureCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                gradient="from-blue-500 to-cyan-500"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <CTASection
          title={servicesData.cta.title}
          description={servicesData.cta.subtitle}
          phoneNumber={siteConfig.contact.phone}
          primaryButton={{
            text: 'Obtenir un devis',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
