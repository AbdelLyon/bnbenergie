'use client';

import { Phone, Star } from 'lucide-react';
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

import type {
  Project,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';
import { LazyMotionDiv, LazyMotionP } from '@/components/LazyComponents';

/* =========================================================
   CONSTANTES
========================================================= */

const STATS = [
  { value: '100+', label: 'Installations Réalisées', icon: 'CircleCheck' },
  { value: '15+', label: "Ans d'Expérience", icon: 'Award' },
  { value: '100%', label: 'Clients Satisfaits', icon: 'Star' },
] as const;

const TESTIMONIALS = [
  {
    name: 'M. et Mme Durand',
    location: 'Bourg-en-Bresse',
    rating: 5,
    comment: 'Installation impeccable, équipe professionnelle.',
    project: '6 kWc',
  },
  {
    name: 'M. Lefebvre',
    location: 'Oyonnax',
    rating: 5,
    comment: 'Service de qualité du début à la fin.',
    project: '9 kWc',
  },
  {
    name: 'Mme Rousseau',
    location: 'Viriat',
    rating: 5,
    comment: 'Très satisfaite de mon installation.',
    project: '3 kWc',
  },
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
    <PageMainWrapper variant="blue">
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
          <LazyMotionDiv
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
          </LazyMotionDiv>

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
          <LazyMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="my-32"
          >
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Ce Que Disent Nos Clients
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <LazyMotionDiv
                  key={testimonial.name}
                  onClick={() =>
                    handleSelectPower(testimonial.project as PowerFilter)
                  }
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer relative rounded-2xl bg-white border border-default/80 hover:border-default dark:border-amber-500/20 p-8 shadow-lg dark:bg-content1"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="mb-6 italic opacity-80">
                    “{testimonial.comment}”
                  </p>
                  <div className="flex justify-between absolute bottom-4 gap-2 right-4 text-sm font-bold opacity-70">
                    <span>{testimonial.name}</span>
                    <span className="text-primary">{testimonial.project}</span>
                  </div>
                </LazyMotionDiv>
              ))}
            </div>
          </LazyMotionDiv>
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
                  className="rounded-xl bg-white px-8 py-4 font-bold text-primary"
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
