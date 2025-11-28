'use client';

import {
  PageHeader,
  Title,
  ScrollDownButton,
  SectionContainer,
  StatsGrid,
  IntroSection,
  FeatureCard,
  CTASection,
} from '@/components';
import { motion } from 'framer-motion';
import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';
import { ReactNode } from 'react';

interface PacksPageData {
  stats: any[];
  intro: any[];
  advantages: any[];
  process: any[];
}

interface NosPacksPageContentProps {
  header: PageHeaderType | null;
  packsContent: PacksPageData;
  siteSettings: SiteSetting;
  children: ReactNode; // Pricing component from server
}

export default function NosPacksPageContent({
  header,
  packsContent,
  siteSettings,
  children,
}: NosPacksPageContentProps) {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Préparer les stats pour StatsGrid (les 3 premières)
  const stats = packsContent.stats.slice(0, 3).map((stat) => ({
    value: stat.value || '',
    label: stat.title || '',
    icon: stat.icon || 'Zap',
    gradient: stat.gradient || 'from-blue-500 to-cyan-500',
  }));

  // Intro section
  const introSection = packsContent.intro[0];

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={header?.title?.split(' ') || ['Nos', 'Packs', 'Photovoltaïques']}
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
        {/* Stats - 3 cards qui remontent */}
        {stats.length > 0 && <StatsGrid stats={stats} />}

        {/* Introduction */}
        {introSection && (
          <IntroSection
            title={introSection.title || 'Choisissez le Pack Adapté à Vos Besoins'}
            description={introSection.description || ''}
          />
        )}

        {/* Section Pricing - Passée en children depuis le serveur */}
        {children}

        {/* Avantages de nos packs */}
        {packsContent.advantages.length > 0 && (
          <div className="mb-20 mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Pourquoi Choisir Nos Packs ?
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packsContent.advantages.map((advantage: any, index: number) => (
                <FeatureCard
                  key={advantage.id || index}
                  icon={advantage.icon || 'CheckCircle2'}
                  title={advantage.title || ''}
                  description={advantage.description || ''}
                  gradient={advantage.gradient || 'from-blue-500 to-cyan-500'}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Notre processus */}
        {packsContent.process.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display mb-4 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Notre Accompagnement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-12 text-center text-lg text-neutral-600"
            >
              De la prise de contact à la mise en service, nous gérons tout
            </motion.p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {packsContent.process.map((step: any, index: number) => (
                <motion.div
                  key={step.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <FeatureCard
                    icon={step.icon || 'CheckCircle2'}
                    title={step.title || ''}
                    description={step.description || ''}
                    gradient={step.gradient || 'from-blue-500 to-cyan-500'}
                    index={index}
                  />
                  {/* Numéro de l'étape */}
                  <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-lg font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
