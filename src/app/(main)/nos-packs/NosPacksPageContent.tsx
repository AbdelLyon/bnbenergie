'use client';

import {
  PageHeader,
  Title,
  ScrollDownButton,
  SectionContainer,
  StatsGrid,
  IntroSection,
  CTASection,
} from '@/components';
import { motion } from 'framer-motion';
import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';
import { ReactNode } from 'react';

interface NosPacksPageContentProps {
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
  children: ReactNode; // Pricing component from server
}

export default function NosPacksPageContent({
  header,
  siteSettings,
  children,
}: NosPacksPageContentProps) {
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
          title={header?.title?.split(' ') || ['Nos', 'Packs']}
          subtitle={header?.subtitle || 'Des Solutions Adaptées à Vos Besoins'}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {header?.description ||
            "Découvrez nos packs d'installation de panneaux solaires personnalisés pour répondre à tous vos besoins énergétiques dans l'Ain. Tarifs transparents, garanties incluses et accompagnement personnalisé."}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats - 3 cards qui remontent (EN DUR comme dans contact) */}
        <StatsGrid
          stats={[
            {
              value: 'Pack 3 kWc',
              label: 'Budget Maîtrisé',
              icon: 'Zap',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              value: 'Pack 6 kWc',
              label: 'Maison Familiale',
              icon: 'Home',
              gradient: 'from-green-500 to-emerald-500',
            },
            {
              value: 'Pack 9 kWc',
              label: 'Performance Max',
              icon: 'TrendingUp',
              gradient: 'from-orange-500 to-yellow-500',
            },
          ]}
        />

        {/* Introduction */}
        <IntroSection
          title="Choisissez le Pack Adapté à Vos Besoins"
          description="Nos packs photovoltaïques sont conçus pour s'adapter à votre consommation énergétique et à votre budget. Installation clé en main avec démarches administratives incluses."
        />

        {/* Section Pricing - Passée en children depuis le serveur */}
        {children}

        {/* Call-to-Action */}
        <CTASection
          title="Prêt à Investir dans l'Énergie Solaire ?"
          description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
          phoneNumber={siteSettings.contact?.phone || '07 81 25 11 25'}
          primaryButton={{
            text: 'Obtenir mon devis',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
