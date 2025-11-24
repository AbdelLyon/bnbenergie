'use client';

import { Title } from '@/app/_components/features/Hero';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { AidCard } from '@/app/_components/shared/ui/AidCard';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
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
          title={[
            'Aides & Financement',
            header?.title || 'Aides & Financement',
          ]}
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
        <IntroSection
          title="Des Aides Attractives pour Votre Transition Énergétique"
          description="L'État français encourage fortement l'installation de panneaux solaires en proposant plusieurs dispositifs d'aides financières. BNB ÉNERGIE, certifié RGE QualiPV, vous permet de bénéficier de toutes ces aides et vous accompagne dans les démarches administratives."
        />

        {/* Aides principales */}
        {aids.main.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
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
                  conditions={aid.conditions?.map((c: any) => c.text) || []}
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

        {/* Aides locales */}
        {aids.local.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Aides Locales & Complémentaires
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {aids.local.map((aid) => (
                <div
                  key={aid.id}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-xl font-bold text-neutral-900">
                    {aid.title}
                  </h3>
                  <p className="text-neutral-600">{aid.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solutions de financement */}
        {aids.financing.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Solutions de Financement
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {aids.financing.map((option) => (
                <div
                  key={option.id}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-xl font-bold text-neutral-900">
                    {option.title}
                  </h3>
                  <p className="mb-4 text-neutral-600">{option.description}</p>
                  {option.features && option.features.length > 0 && (
                    <ul className="space-y-2">
                      {option.features.map((feature: any, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-neutral-600"
                        >
                          <span className="mr-2">✓</span>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call-to-Action */}
        <CTASection
          title="Calculez Vos Aides et Économies"
          description="Demandez votre étude personnalisée gratuite et découvrez combien vous pouvez économiser"
          phoneNumber={siteSettings.contact?.phone || '07 81 25 11 25'}
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
