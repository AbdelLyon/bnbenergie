'use client';

import {
  StatsGrid,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  IntroSection,
  FeatureCard,
  CTASection,
  ServiceStep,
} from '@/components';
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
  const steps = services.slice(0, 5);
  const guarantees = services.slice(5);

  return (
    <PageMainWrapper variant="green">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={header?.title.split(' ') || ['Nos Services']}
          subtitle={header?.subtitle || ''}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          {header?.description || ''}
        </motion.p>
      </PageHeader>

      <div className="relative z-10">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto mb-24 max-w-5xl overflow-hidden rounded-3xl bg-white dark:bg-content1 p-12 shadow-xl border border-neutral-100 dark:border-white/5"
          >
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <IntroSection
                title="Un Accompagnement Complet de A à Z"
                description=""
                className="mb-0"
              />
              <p className="mb-4 text-xl font-medium text-neutral-700 dark:text-default-600">
                Notre mission : transformer votre projet solaire en réalité
              </p>
              <p className="leading-relaxed text-neutral-500 dark:text-default-400 max-w-2xl mx-auto">
                Chez BNB ÉNERGIE, nous gérons l'intégralité de votre projet
                d'installation de panneaux solaires, de l'étude initiale à la
                maintenance.
              </p>
            </div>
          </motion.div>

          <div className="mb-20 space-y-12">
            {steps.map((step, index) => (
              <ServiceStep
                key={step.id}
                number={step.number}
                icon={step.icon}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                items={
                  step.highlights?.map(
                    (h: { text?: string }) => h.text || ''
                  ) || []
                }
                duration={step.duration}
                gradient={step.gradient}
                isEven={index % 2 === 0}
                index={index}
              />
            ))}
          </div>

          {guarantees.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
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

          <CTASection
            title="Prêt à Passer à l'Énergie Solaire ?"
            description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
            phoneNumber={siteSettings.contactPhone || '07 81 25 11 25'}
            primaryButton={{
              text: 'Obtenir un devis',
              href: '/contact',
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
