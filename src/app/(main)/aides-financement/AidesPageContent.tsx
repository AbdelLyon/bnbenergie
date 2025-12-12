'use client';

import {
  AidCard,
  CTASection,
  IntroSection,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from '@/components';
import { StatsGrid } from '@/components/shared/ui/StatsGrid';
import { motion } from 'framer-motion';
import type {
  FinancialAid,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

interface AidesPageContentProps {
  aids: {
    main: FinancialAid[];
    local: FinancialAid[];
    financing: FinancialAid[];
    roi: FinancialAid[];
  };
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function AidesPageContent({
  aids,
  header,
  siteSettings,
}: AidesPageContentProps) {
  return (
    <PageMainWrapper variant="purple">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={header?.title.split(' ') || ['Aides Financement']}
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
            stats={[
              {
                value: "Jusqu'à 2 520€",
                label: 'Prime Autoconsommation',
                icon: 'DollarSign',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                value: '0,13€/kWh',
                label: 'Tarif de Rachat EDF',
                icon: 'TrendingUp',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                value: '20-30%',
                label: "Économies d'Électricité",
                icon: 'PiggyBank',
                gradient: 'from-orange-500 to-yellow-500',
              },
            ]}
          />

          {/* Introduction */}
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-24 overflow-hidden rounded-3xl bg-white dark:bg-content1 p-12 shadow-xl border border-neutral-100 dark:border-white/5"
          >
            {/* Pattern decoratif subtil */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <IntroSection
                title="Des Aides Attractives pour Votre Transition Énergétique"
                description="L'État français encourage fortement l'installation de panneaux solaires en proposant plusieurs dispositifs d'aides financières. BNB ÉNERGIE, certifié RGE QualiPV, vous permet de bénéficier de toutes ces aides et vous accompagne dans les démarches administratives."
                className="mb-0"
              />
            </div>
          </motion.div>

          {/* Aides principales */}
          {aids.main.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
              >
                Les Principales Aides Disponibles
              </motion.h2>
              <div className="space-y-8">
                {aids.main.map((aid, index) => (
                  <AidCard
                    key={aid.id}
                    icon={aid.icon}
                    badge={aid.badge || ''}
                    title={aid.title}
                    subtitle={aid.subtitle || ''}
                    description={aid.description}
                    gradient={aid.gradient || 'from-green-500 to-emerald-500'}
                    conditions={
                      aid.conditions?.map(
                        (c: { text?: string }) => c.text ?? ''
                      ) || []
                    }
                    amounts={
                      aid.amounts?.map((a) => ({
                        power: a.power,
                        amount: a.amount,
                        example: a.example || undefined,
                        bestFor: a.bestFor || undefined,
                      })) || []
                    }
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {aids.local.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
              >
                Aides Locales & Complémentaires
              </motion.h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.local.map((aid) => (
                  <div
                    key={aid.id}
                    className="rounded-2xl border border-neutral-100 dark:border-white/5 bg-white dark:bg-content1 p-8 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-foreground">
                      {aid.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-default-500 leading-relaxed">
                      {aid.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aids.financing.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
              >
                Solutions de Financement
              </motion.h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.financing.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-2xl border border-neutral-100 dark:border-white/5 bg-white dark:bg-content1 p-8 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-foreground">
                      {option.title}
                    </h3>
                    <div className="mb-6 text-neutral-600 dark:text-default-500 leading-relaxed">
                      {option.features && option.features.length > 0 && (
                        <ul className="space-y-3">
                          {option.features.map(
                            (feature: { text?: string }, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-neutral-600 dark:text-default-500"
                              >
                                <span className="mr-3 text-green-500 dark:text-green-400 font-bold">
                                  ✓
                                </span>
                                {feature.text}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CTASection
            title="Calculez Vos Aides et Économies"
            description="Demandez votre étude personnalisée gratuite et découvrez combien vous pouvez économiser"
            phoneNumber={siteSettings.contactPhone || '07 81 25 11 25'}
            primaryButton={{
              text: 'Demander mon devis',
              href: '/contact',
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
