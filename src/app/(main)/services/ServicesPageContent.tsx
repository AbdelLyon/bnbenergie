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
import { motion } from 'framer-motion';
import type {
  Service,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

interface ServicesPageContentProps {
  services: Service[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function ServicesPageContent({
  services,
  header,
  siteSettings,
}: ServicesPageContentProps) {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group services data (first 5 are steps, rest are guarantees)
  const steps = services.slice(0, 5);
  const guarantees = services.slice(5);

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={['Nos Services', header?.title || 'Nos Services']}
          subtitle={header?.subtitle || ''}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {header?.description || ''}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats */}
        <StatsGrid
          stats={steps.slice(0, 3).map((step) => ({
            value: step.number,
            label: step.title,
            icon: step.icon,
            gradient: 'from-blue-500 to-cyan-500',
          }))}
        />

        {/* Introduction */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <IntroSection
            title="Un Accompagnement Complet de A à Z"
            description=""
            className="mb-0"
          />
          <p className="mb-4 text-lg text-neutral-600">
            Notre mission : transformer votre projet solaire en réalité
          </p>
          <p className="leading-relaxed text-neutral-600">
            Chez BNB ÉNERGIE, nous gérons l'intégralité de votre projet
            d'installation de panneaux solaires.
          </p>
        </div>

        {/* Étapes */}
        <div className="mb-20 space-y-12">
          {steps.map((step, index) => (
            <ServiceStep
              key={step.id}
              number={step.number}
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              items={step.highlights?.map((h: any) => h.text) || []}
              duration={step.duration}
              gradient={step.gradient}
              isEven={index % 2 === 0}
              index={index}
            />
          ))}
        </div>

        {/* Services supplémentaires */}
        {guarantees.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Nos Engagements Qualité
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guarantees.map((service, index) => (
                <FeatureCard
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  gradient="from-blue-500 to-cyan-500"
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call-to-Action */}
        <CTASection
          title="Prêt à Passer à l'Énergie Solaire ?"
          description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
          phoneNumber={siteSettings.contact?.phone || '07 81 25 11 25'}
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
