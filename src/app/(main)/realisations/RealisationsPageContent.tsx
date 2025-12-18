'use client';

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
import { LazyMotionDiv, LazyMotionP } from '@/components/LazyComponents';
import { Phone, Star } from 'lucide-react';

/* =========================================================
   CONSTANTES
========================================================= */

const STATS = [
  { value: '100+', label: 'Installations Réalisées', icon: 'CircleCheck' },
  { value: '15+', label: "Ans d'Expérience", icon: 'Award' },
  { value: '100%', label: 'Clients Satisfaits', icon: 'Star' },
] as const;

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

          <LazyMotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="max-w-4xl px-4 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            {header?.description || ''}
          </LazyMotionP>
        </PageHeader>

        {/* ================= STATS CARDS (OVERLAP) ================= */}
        <SectionContainer className="relative">
          <div className="absolute inset-x-0 top-0 z-30 -translate-y-1/2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* ================= PROJECTS SECTION ================= */}
        <SectionWrapper background="white">
          <BackgroundEffects />

          <SectionContainer className="pt-32 pb-20">
            {/* ================= SECTION TITLE ================= */}
            <LazyMotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-12 max-w-4xl text-center"
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Nos Projets Photovoltaïques dans l&apos;Ain
              </h2>
              <p className="text-lg text-neutral-600 dark:text-default-500">
                Découvrez quelques-unes de nos installations certifiées RGE
                QualiPV, classées par puissance.
              </p>
            </LazyMotionDiv>

            {/* ================= FILTERS ================= */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {POWERS.map((power) => (
                <button
                  key={power}
                  onClick={() => handleSelectPower(power)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105
                  ${
                    selectedPower === power
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-neutral-200 hover:bg-neutral-300 dark:bg-content1 dark:hover:bg-content2'
                  }`}
                >
                  {power === 'all' ? 'Tous les projets' : power}
                </button>
              ))}
            </div>

            {/* ================= PROJECTS GRID ================= */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  page="Realisations"
                />
              ))}
            </div>

            {/* ================= EMPTY STATE ================= */}
            {filteredProjects.length === 0 && (
              <div className="mt-20 text-center">
                <p className="text-lg text-neutral-500">
                  Aucun projet disponible pour cette puissance.
                </p>
              </div>
            )}
          </SectionContainer>
        </SectionWrapper>

        {/* ================= REVIEWS SECTION ================= */}
        <SectionWrapper background="white">
          <BackgroundEffects />

          <SectionContainer>
            <ReviewsSection
              title="Ce Que Disent Nos Clients"
              subtitle="Découvrez les avis de nos clients satisfaits dans l'Ain"
              showStats={true}
              autoPlay={true}
              autoPlayInterval={10000}
            />

            {/* ================= CTA SECTION ================= */}
            <div className="mx-auto mt-20 max-w-4xl text-center">
              <LazyMotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Votre Projet Solaire Nous Attend !
                </h2>
                <p className="mb-10 text-lg text-neutral-600 dark:text-default-500">
                  Rejoignez nos 100+ clients satisfaits et bénéficiez d&apos;une
                  installation certifiée RGE.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact#contact-form"
                    className="group rounded-xl border-2 border-primary bg-transparent px-8 py-4 font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    Demander mon devis
                  </Link>

                  <Link
                    href={`tel:${
                      siteSettings.contactPhone?.replace(/\s/g, '') ||
                      '0781251125'
                    }`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{siteSettings.contactPhone || '07 81 25 11 25'}</span>
                  </Link>
                </div>
              </LazyMotionDiv>
            </div>
          </SectionContainer>
        </SectionWrapper>
      </div>
    </PageMainWrapper>
  );
}
