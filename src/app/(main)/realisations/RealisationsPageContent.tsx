'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { Title } from '@/app/_components/features/Hero/Title';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatCard } from '@/app/_components/shared/ui/StatCard';
import {
  SectionContainer,
  SectionWrapper,
} from '@/app/_components/shared/layout/SectionWrapper';
import { BackgroundEffects } from '@/app/_components/shared/effects/BackgroundEffects';
import { ProjectCard } from '@/app/_components/features/Realisations/components/ProjectCard';
import realisationsHeaderData from '@/data/realisationsHeaderData.json';
import realisationsData from '@/data/realisationsData.json';
import siteConfig from '@/data/siteConfig.json';

const stats = [
  { value: '100+', label: 'Installations Réalisées', icon: 'CircleCheck' },
  { value: '15+', label: "Ans d'Expérience", icon: 'Award' },
  { value: '100%', label: 'Clients Satisfaits', icon: 'Star' },
];

export default function RealisationsPageContent() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const powers = ['all', '3 kWc', '4.5 kWc', '6 kWc', '7.5 kWc', '9 kWc'];

  const filteredProjects =
    selectedFilter === 'all'
      ? realisationsData.projects
      : realisationsData.projects.filter((p) => p.power === selectedFilter);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      {}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={realisationsHeaderData.title}
          subtitle={realisationsHeaderData.subtitle}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {realisationsHeaderData.description}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {}
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

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <h2 className="font-display mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
            Nos Projets Photovoltaïques dans l&apos;Ain
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-600">
            Depuis plus de 15 ans, nous accompagnons les particuliers et
            professionnels de l&apos;Ain dans leur transition énergétique.
            Découvrez quelques-unes de nos installations certifiées RGE QualiPV.
          </p>

          {}
          <div className="flex flex-wrap justify-center gap-3">
            {powers.map((power) => (
              <motion.button
                key={power}
                onClick={() => setSelectedFilter(power)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  selectedFilter === power
                    ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {power === 'all' ? 'Tous les projets' : power}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 to-cyan-50 p-6"
              >
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-neutral-700 italic">
                  {testimonial.comment}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-600">
                    {testimonial.project}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>

      {}
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
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
              >
                {realisationsData.cta}
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                Appelez-nous : {siteConfig.contact.phone}
              </motion.a>
            </div>
          </motion.div>
        </SectionContainer>
      </SectionWrapper>
    </main>
  );
}
