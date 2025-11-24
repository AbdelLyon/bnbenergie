'use client';

import { Title } from '@/app/_components/features/Hero/Title';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { FeatureCard } from '@/app/_components/shared/ui/FeatureCard';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import siteConfig from '@/data/siteConfig.json';
import zonesData from '@/data/zonesData.json';
import zonesHeaderData from '@/data/zonesHeaderData.json';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface ZoneGroup {
  zone: string;
  communes: string[];
  gradient: string;
}

interface Department {
  code: string;
  name: string;
}

interface Advantage {
  title: string;
  icon: string;
  description: string;
}

export default function ZonesPageContent() {
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
          title={zonesHeaderData.title}
          subtitle={zonesHeaderData.subtitle}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {zonesHeaderData.description}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats */}
        <StatsGrid
          stats={zonesData.stats.map((stat) => ({
            ...stat,
            gradient: 'from-blue-500 to-cyan-500',
          }))}
        />

        {/* Introduction */}
        <IntroSection
          title={zonesData.intro.title}
          description={zonesData.intro.description}
        />

        {/* Zones principales */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {zonesData.communes.title}
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {zonesData.communes.groups.map((group: ZoneGroup, index) => {
              return (
                <motion.div
                  key={group.zone}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Icône */}
                  <div
                    className={`mb-6 inline-flex rounded-xl bg-linear-to-br ${group.gradient} p-4`}
                  >
                    <MapPin className="h-8 w-8 text-white" />
                  </div>

                  {/* Titre */}
                  <h3 className="font-display mb-2 text-xl font-bold text-neutral-900">
                    {group.zone}
                  </h3>

                  {/* Description (Liste des communes) */}
                  <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                    {group.communes.join(', ')}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Autres villes */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-8 text-center text-2xl font-bold text-neutral-900 md:text-3xl"
          >
            {zonesData.extended_area.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {zonesData.extended_area.departments.map((dept: Department) => (
              <div
                key={dept.code}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {dept.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Avantages local */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {zonesData.why_local.title}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zonesData.main_area.advantages.map(
              (advantage: Advantage, index) => (
                <FeatureCard
                  key={advantage.title}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                  gradient="from-blue-500 to-cyan-500"
                  index={index}
                />
              )
            )}
          </div>
        </div>

        {/* Call-to-Action */}
        <CTASection
          title={zonesData.cta.title}
          description={zonesData.cta.subtitle}
          phoneNumber={siteConfig.contact.phone}
          primaryButton={{
            text: 'Demander un devis gratuit',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
