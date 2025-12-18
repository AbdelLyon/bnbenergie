'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  StatCard,
  ProjectCard,
  SectionWrapper,
  BackgroundEffects,
} from '@/components';
import { ReviewsSection } from '@/components/shared/ui/ReviewsSection';

import type {
  Project,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

/* =========================================================
   CONSTANTES
========================================================= */

const STATS = [
  { value: '100+', label: 'Installations Réalisées', icon: 'CircleCheck' },
  { value: '15+', label: "Ans d'Expérience", icon: 'Award' },
  { value: '100%', label: 'Clients Satisfaits', icon: 'Star' },
] as const;

// TESTIMONIALS supprimés - maintenant gérés par ReviewsSection avec les vraies données Google

/* =========================================================
   HELPERS
========================================================= */

const extractKw = (value?: string | number | null): number | null => {
  if (!value) return null;
  if (typeof value === 'number') return value;

  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : null;
};

/* =========================================================
   TYPES
========================================================= */

interface RealisationsPageContentProps {
  projects: Project[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function RealisationsPageContent({
  projects,
  header,
  siteSettings,
}: RealisationsPageContentProps) {
  const POWERS = ['all', ...projects.map((project) => project.power)] as const;
  type PowerFilter = (typeof POWERS)[number];

  const [selectedPower, setSelectedPower] = useState<PowerFilter>('all');

  /* ------------------ FILTER HANDLER ------------------ */
  const handleSelectPower = (power: PowerFilter) => {
    setSelectedPower(power);
  };

  /* ------------------ FILTERED PROJECTS ------------------ */
  const filteredProjects = useMemo(() => {
    if (selectedPower === 'all') return projects;

    const selectedKw = extractKw(selectedPower);
    if (!selectedKw) return projects;

    return projects.filter((project) => {
      const projectKw = extractKw(project.power) ?? extractKw(project.power);

      return projectKw === selectedKw;
    });
  }, [projects, selectedPower]);

  return (
    <PageMainWrapper variant="transparent">
      <div className="relative z-10">
        {/* ================= HEADER ================= */}
        <PageHeader variant="simple" height="medium">
          <Title
            title={header?.title.split(' ') || ['Nos', 'Réalisations']}
            subtitle={header?.subtitle || ''}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="max-w-4xl px-4 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            {header?.description || ''}
          </motion.p>
        </PageHeader>

        <SectionContainer>
          {/* ================= STATS ================= */}
          <div className="relative z-20 -mt-20 mb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>

          {/* ================= INTRO ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Nos Projets Photovoltaïques dans l&apos;Ain
            </h2>
            <p className="text-lg text-neutral-600 dark:text-default-500">
              Découvrez quelques-unes de nos installations certifiées RGE
              QualiPV, classées par puissance.
            </p>
          </motion.div>

          {/* ================= FILTER ================= */}
          <div className="mb-6 flex flex-wrap gap-3">
            {POWERS.map((power) => (
              <button
                key={power}
                onClick={() => handleSelectPower(power)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all
                  ${
                    selectedPower === power
                      ? 'bg-primary text-white'
                      : 'bg-neutral-200 hover:bg-neutral-200 dark:bg-content1'
                  }`}
              >
                {power === 'all' ? 'Tous les projets' : power}
              </button>
            ))}
          </div>

          {/* ================= PROJECTS ================= */}
          <section className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <p className="mt-16 text-center text-neutral-500">
                Aucun projet disponible pour cette puissance.
              </p>
            )}
          </section>

          {/* ================= TESTIMONIALS ================= */}
          <div className="my-32">
            <ReviewsSection
              title="Ce Que Disent Nos Clients"
              subtitle="Découvrez les avis de nos clients satisfaits dans l'Ain"
              showStats={true}
              autoPlay={true}
              autoPlayInterval={10000}
            />
          </div>
        </SectionContainer>

        {/* ================= CTA ================= */}
        <SectionWrapper background="gradient">
          <BackgroundEffects />
          <SectionContainer>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Votre Projet Solaire Nous Attend !
              </h2>
              <p className="mb-8 text-lg">
                Rejoignez nos 100+ clients satisfaits.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact#contact-form"
                  className="rounded-xl bg-content1 px-8 py-4 font-bold text-primary border border-primary/70"
                >
                  Demander mon devis
                </Link>

                <Link
                  href={`tel:${
                    siteSettings.contactPhone?.replace(/\s/g, '') ||
                    '0781251125'
                  }`}
                  className="rounded-xl bg-primary px-8 py-4 font-bold text-white"
                >
                  <Phone className="mr-2 inline h-5 w-5" />
                  {siteSettings.contactPhone || '07 81 25 11 25'}
                </Link>
              </div>
            </div>
          </SectionContainer>
        </SectionWrapper>
      </div>
    </PageMainWrapper>
  );
}
