'use client';

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from '@/components';
import { motion } from 'framer-motion';
import type { SiteSetting } from '@/payload-types';
import { Building2, Phone, Globe, Server, Shield } from 'lucide-react';

interface MentionsLegalesPageContentProps {
  siteSettings: SiteSetting;
}

export default function MentionsLegalesPageContent({
  siteSettings,
}: MentionsLegalesPageContentProps) {
  const sections = [
    {
      icon: Building2,
      title: 'Éditeur du Site',
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        { label: 'Raison sociale', value: siteSettings.businessName || 'BNB Énergie 01' },
        { label: 'Forme juridique', value: 'Société à responsabilité limitée (SARL)' },
        { label: 'Capital social', value: 'À définir' },
        { label: 'SIRET', value: 'À définir' },
        { label: 'N° TVA intracommunautaire', value: 'À définir' },
        {
          label: 'Siège social',
          value:
            siteSettings.addressStreet
              ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
              : '16 Av. Pablo Picasso, 01000 Bourg-en-Bresse',
        },
      ],
    },
    {
      icon: Phone,
      title: 'Contact',
      gradient: 'from-green-500 to-emerald-500',
      content: [
        { label: 'Téléphone', value: siteSettings.contactPhone || '07 81 25 11 25' },
        { label: 'Email', value: siteSettings.contactEmail || 'contact@bnbenergie01.com' },
      ],
    },
    {
      icon: Globe,
      title: 'Directeur de la Publication',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        { label: 'Nom', value: 'À définir' },
        { label: 'Qualité', value: 'Gérant' },
      ],
    },
    {
      icon: Server,
      title: 'Hébergement',
      gradient: 'from-orange-500 to-red-500',
      content: [
        { label: 'Hébergeur', value: 'Vercel Inc.' },
        { label: 'Adresse', value: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis' },
        { label: 'Site web', value: 'https://vercel.com' },
      ],
    },
  ];

  const legalSections = [
    {
      icon: Shield,
      title: 'Propriété Intellectuelle',
      gradient: 'from-indigo-500 to-blue-500',
      content: `L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur...`,
    },
    {
      icon: Shield,
      title: 'Protection des Données Personnelles',
      gradient: 'from-teal-500 to-cyan-500',
      content: `Conformément au RGPD... <br><br>Vous pouvez nous contacter : ${
        siteSettings.contactEmail || 'contact@bnbenergie01.com'
      }`,
    },
    {
      icon: Shield,
      title: 'Cookies',
      gradient: 'from-amber-500 to-yellow-500',
      content: `Ce site utilise des cookies...`,
    },
    {
      icon: Shield,
      title: 'Crédits',
      gradient: 'from-rose-500 to-pink-500',
      content: `Conception et développement : BNB Énergie 01...`,
    },
    {
      icon: Shield,
      title: 'Limitation de Responsabilité',
      gradient: 'from-violet-500 to-purple-500',
      content: `Les informations contenues sur ce site sont aussi précises que possible...`,
    },
  ];

  return (
    <PageMainWrapper variant="blue">
      {/* ---------------- HEADER ---------------- */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Mentions', 'légales']}
          subtitle="Informations légales et éditoriales"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          Conformément à la loi pour la Confiance dans l'Économie Numérique (LCEN)
        </motion.p>
      </PageHeader>

      {/* ---------------- SECTIONS INFORMATIVES ---------------- */}
      <div className="relative z-10">
        <SectionContainer className="mt-16 space-y-12">
          {/* Infos principales */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-white dark:bg-content1 p-8 shadow-xl border border-neutral-100 dark:border-white/5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mb-6 inline-flex rounded-2xl bg-linear-to-br ${section.gradient} p-4 shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-default-400">
                            {item.label}
                          </span>
                          <span className="mt-1 text-base font-medium text-neutral-900 dark:text-white">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legal sections */}
          <div className="space-y-8">
            {legalSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-white dark:bg-content1 p-8 shadow-xl border border-neutral-100 dark:border-white/5"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`inline-flex rounded-2xl bg-linear-to-br ${section.gradient} p-3 shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    <div
                      className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-line text-neutral-700 dark:text-default-500"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 text-center border border-blue-100 dark:border-blue-900/50"
          >
            <p className="text-sm text-neutral-600 dark:text-default-400">
              Date de dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </motion.div>
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
