'use client';

import { Title } from '@/components/shared/ui/Title';
import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatsGrid,
  IntroSection,
  FeatureCard,
  WarrantyCard,
  CTASection,
} from '@/components';

import { motion } from 'framer-motion';
import type {
  Warranty,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

interface GarantiesPageContentProps {
  warranties: {
    certifications: Warranty[];
    products: Warranty[];
    commitments: Warranty[];
    process: Warranty[];
  };
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function GarantiesPageContent({
  warranties,
  header,
  siteSettings,
}: GarantiesPageContentProps) {
  return (
    <PageMainWrapper variant="amber">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={header?.title.split(' ') || ['Nos Garanties']}
          subtitle={header?.subtitle || ''}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
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
                value: '10 ans',
                label: 'Garantie Décennale',
                icon: 'Shield',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                value: '25 ans',
                label: 'Garantie Panneaux',
                icon: 'Award',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                value: 'RGE',
                label: 'Certifié QualiPV',
                icon: 'CheckCircle2',
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
                title="Des Garanties Complètes pour Votre Sérénité"
                description="Investir dans le solaire, c'est investir pour l'avenir. Chez BNB ÉNERGIE, nous vous offrons une couverture complète avec nos certifications professionnelles, nos garanties décennales et les garanties constructeurs de matériel premium."
                className="mb-0"
              />
            </div>
          </motion.div>

          {/* Certifications */}
          {warranties.certifications.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
              >
                Nos Certifications Professionnelles
              </motion.h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {warranties.certifications.map((cert, index) => (
                  <FeatureCard
                    key={cert.id}
                    icon={cert.icon}
                    title={cert.title}
                    description={cert.description}
                    gradient={cert.gradient || 'from-blue-500 to-cyan-500'}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Garanties Produits */}
          {warranties.products.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl"
              >
                Garanties Constructeurs & Matériel
              </motion.h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {warranties.products.map((product, index) => (
                  <WarrantyCard
                    key={product.id}
                    icon={product.icon}
                    title={product.title}
                    description={product.description}
                    gradient={product.gradient || 'from-blue-500 to-cyan-500'}
                    warranties={
                      product.warrantyDetails?.map((w: any) => ({
                        label: w.label,
                        duration: w.duration,
                        description: w.description,
                      })) || []
                    }
                    features={product.features?.map((f: any) => f.text) || []}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Engagements */}
          {warranties.commitments.length > 0 && (
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
                {warranties.commitments.map((commitment, index) => (
                  <FeatureCard
                    key={commitment.id}
                    icon={commitment.icon}
                    title={commitment.title}
                    description={commitment.description}
                    gradient="from-blue-500 to-cyan-500"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call-to-Action */}
          <CTASection
            title="Des Questions sur Nos Garanties ?"
            description="Notre équipe est à votre disposition pour vous expliquer en détail toutes nos garanties et certifications"
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
