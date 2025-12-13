'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { useRef, useState } from 'react';

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
import Link from 'next/link';

interface RealisationsPageContentProps {
  projects: Project[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

const stats = [
  { value: '100+', label: 'Installations Réalisées', icon: 'CircleCheck' },
  { value: '15+', label: "Ans d'Expérience", icon: 'Award' },
  { value: '100%', label: 'Clients Satisfaits', icon: 'Star' },
];

export default function RealisationsPageContent({
  projects,
  header,
  siteSettings,
}: RealisationsPageContentProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToProject = (power: string) => {
    setSelectedFilter(power);

    requestAnimationFrame(() => {
      projectRefs.current[power]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const powers = ['all', '3 kWc', '4.5 kWc', '6 kWc', '7.5 kWc', '9 kWc'];

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.power === selectedFilter);

  return (
    <PageMainWrapper variant="blue">
      <div className="relative z-10">
        {/* Header */}
        <PageHeader variant="simple" height="medium">
          <Title
            title={header?.title.split(' ') || ['Nos Réalisations']}
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

        <SectionContainer>
          {/* Stats */}
          <div className="relative z-20 -mt-20 mb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <h2 className="font-display mb-6 text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl">
              Nos Projets Photovoltaïques dans l&apos;Ain
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600 dark:text-default-500">
              Depuis plus de 15 ans, nous accompagnons les particuliers et
              professionnels de l&apos;Ain dans leur transition énergétique.
              Découvrez quelques-unes de nos installations certifiées RGE
              QualiPV.
            </p>
            <div className="mb-20 space-y-20">
              {powers
                .filter((p) => p !== 'all')
                .map((power) => (
                  <div
                    key={power}
                    ref={(el) => {
                      projectRefs.current[power] = el;
                    }}
                  >
                    <h3 className="mb-8 text-2xl font-bold">{power}</h3>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {projects
                        .filter((p) => p.power === power)
                        .map((project, index) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Projets */}
          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Témoignages (statiques pour l'instant) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl">
              Ce Que Disent Nos Clients
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: 'M. et Mme Durand',
                  location: 'Bourg-en-Bresse',
                  rating: 5,
                  comment:
                    "Installation impeccable, équipe professionnelle. Notre facture d'électricité a baissé de 60% !",
                  project: '6 kWc',
                },
                {
                  name: 'M. Lefebvre',
                  location: 'Oyonnax',
                  rating: 5,
                  comment:
                    'Service de qualité du début à la fin. Je recommande vivement BNB ÉNERGIE pour leur sérieux.',
                  project: '9 kWc',
                },
                {
                  name: 'Mme Rousseau',
                  location: 'Viriat',
                  rating: 5,
                  comment:
                    "Très satisfaite de mon installation. L'équipe a été réactive et à l'écoute de mes besoins.",
                  project: '3 kWc',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  onClick={() => scrollToProject(testimonial.project)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl bg-white dark:bg-content1 p-8 shadow-lg border border-neutral-100 dark:border-white/5 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-base leading-relaxed text-neutral-600 dark:text-default-500 italic relative z-10">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-white/10">
                    <div>
                      <p className="text-sm font-bold text-neutral-900 dark:text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-default-400 font-medium">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30">
                      {testimonial.project}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionContainer>

        {/* CTA */}
        <SectionWrapper
          background="gradient"
          className="relative overflow-hidden"
        >
          <BackgroundEffects variant="default" />
          <SectionContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative z-10 mx-auto max-w-4xl text-center"
            >
              <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
                Votre Projet Solaire Nous Attend !
              </h2>
              <p className="mb-8 text-lg">
                Rejoignez nos 100+ clients satisfaits et profitez d&apos;une
                installation de qualité certifiée RGE QualiPV
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact#contact-form"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-content1 px-8 py-4 text-lg font-bold text-blue-600 dark:text-blue-400 shadow-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-content2 hover:shadow-xl"
                  >
                    Demander mon devis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`tel:${
                      siteSettings.contactPhone?.replace(/\s/g, '') ||
                      '0781251125'
                    }`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary border-2 border-white dark:border-content2/30 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-content2 dark:bg-content1/20 dark:hover:bg-content1/30"
                  >
                    <Phone className="h-5 w-5" />
                    {siteSettings.contactPhone || '07 81 25 11 25'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </SectionContainer>
        </SectionWrapper>
      </div>
    </PageMainWrapper>
  );
}
