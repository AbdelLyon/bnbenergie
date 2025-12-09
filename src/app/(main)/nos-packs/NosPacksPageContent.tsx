'use client';

import {
  PageHeader,
  PageMainWrapper,
  Title,
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
  return (
    <PageMainWrapper variant="blue">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={header?.title?.split(' ') || ['Nos', 'Packs']}
          subtitle={header?.subtitle || 'Des Solutions Adaptées à Vos Besoins'}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          {header?.description ||
            "Découvrez nos packs d'installation de panneaux solaires personnalisés pour répondre à tous vos besoins énergétiques dans l'Ain. Tarifs transparents, garanties incluses et accompagnement personnalisé."}
        </motion.p>
      </PageHeader>

      <div className="relative z-10">
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

          {/* Introduction avec background amélioré */}
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
                title="Choisissez le Pack Adapté à Vos Besoins"
                description="Nos packs photovoltaïques sont conçus pour s'adapter à votre consommation énergétique et à votre budget. Installation clé en main avec démarches administratives incluses."
                className="mb-0"
              />
            </div>
          </motion.div>

          {/* Section Pricing - Passée en children depuis le serveur */}
          {children}

          {/* Call-to-Action */}
          <CTASection
            title="Prêt à Investir dans l'Énergie Solaire ?"
            description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
            phoneNumber={siteSettings.contactPhone || '07 81 25 11 25'}
            primaryButton={{
              text: 'Obtenir mon devis',
              href: '/contact',
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
