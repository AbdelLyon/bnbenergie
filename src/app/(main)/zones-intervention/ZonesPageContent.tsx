'use client';

import { Title } from '@/app/_components/features/Hero/Title';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { FeatureCard } from '@/app/_components/shared/ui/FeatureCard';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type {
  InterventionZone,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

interface ZonesPageContentProps {
  zones: InterventionZone[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function ZonesPageContent({
  zones,
  header,
  siteSettings,
}: ZonesPageContentProps) {
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
            "Zones d'Intervention",
            header?.title || "Zones d'Intervention",
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
              value: '50 km',
              label: "Rayon d'Intervention",
              icon: 'Map',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              value: '48h',
              label: 'Délai de Réponse',
              icon: 'Clock',
              gradient: 'from-green-500 to-emerald-500',
            },
            {
              value: '100%',
              label: 'Proximité Client',
              icon: 'Users',
              gradient: 'from-orange-500 to-yellow-500',
            },
          ]}
        />

        {/* Introduction */}
        <IntroSection
          title="Un Installateur Local au Plus Proche de Vous"
          description="Basés à Bourg-en-Bresse, nous intervenons dans tout le département de l'Ain pour vous garantir un service de proximité, réactif et de qualité. Notre ancrage local nous permet d'assurer un suivi personnalisé et une maintenance rapide de vos installations."
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
            Nos Secteurs d'Intervention
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {zones.map((group, index) => {
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Icône */}
                  <div
                    className={`mb-6 inline-flex rounded-xl bg-linear-to-br ${group.gradient || 'from-blue-500 to-cyan-500'} p-4`}
                  >
                    <MapPin className="h-8 w-8 text-white" />
                  </div>

                  {/* Titre */}
                  <h3 className="font-display mb-2 text-xl font-bold text-neutral-900">
                    {group.zone}
                  </h3>

                  {/* Description (Liste des communes) */}
                  <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                    {group.communes?.map((c: any) => c.name).join(', ')}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Autres villes (statique pour l'instant car non migré dans une collection spécifique) */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-8 text-center text-2xl font-bold text-neutral-900 md:text-3xl"
          >
            Également présents dans les départements limitrophes
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              'Saône-et-Loire (71)',
              'Jura (39)',
              'Rhône (69)',
              'Isère (38)',
              'Savoie (73)',
              'Haute-Savoie (74)',
            ].map((dept) => (
              <div
                key={dept}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {dept}
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
            Pourquoi Choisir un Installateur Local ?
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Réactivité Maximale',
                icon: 'Zap',
                description:
                  'Intervention rapide en cas de panne ou de besoin de maintenance.',
              },
              {
                title: 'Connaissance du Terrain',
                icon: 'Map',
                description:
                  'Maîtrise des spécificités climatiques et administratives locales.',
              },
              {
                title: 'Relation de Confiance',
                icon: 'Heart',
                description:
                  'Un interlocuteur unique et disponible près de chez vous.',
              },
            ].map((advantage, index) => (
              <FeatureCard
                key={advantage.title}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
                gradient="from-blue-500 to-cyan-500"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <CTASection
          title="Votre Projet Solaire Commence Ici"
          description="Vérifiez si vous êtes dans notre zone d'intervention et demandez votre devis gratuit"
          phoneNumber={siteSettings.contact?.phone || '07 81 25 11 25'}
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
