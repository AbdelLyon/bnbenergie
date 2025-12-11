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
        {
          label: 'Raison sociale',
          value: siteSettings.businessName || 'BNB Énergie 01',
        },
        {
          label: 'Forme juridique',
          value: 'Société à responsabilité limitée (SARL)',
        },
        {
          label: 'Capital social',
          value: 'À définir',
        },
        {
          label: 'SIRET',
          value: 'À définir',
        },
        {
          label: 'N° TVA intracommunautaire',
          value: 'À définir',
        },
        {
          label: 'Siège social',
          value: siteSettings.addressStreet
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
        {
          label: 'Téléphone',
          value: siteSettings.contactPhone || '07 81 25 11 25',
        },
        {
          label: 'Email',
          value: siteSettings.contactEmail || 'contact@bnbenergie01.com',
        },
      ],
    },
    {
      icon: Globe,
      title: 'Directeur de la Publication',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          label: 'Nom',
          value: 'À définir',
        },
        {
          label: 'Qualité',
          value: 'Gérant',
        },
      ],
    },
    {
      icon: Server,
      title: 'Hébergement',
      gradient: 'from-orange-500 to-red-500',
      content: [
        {
          label: 'Hébergeur',
          value: 'Vercel Inc.',
        },
        {
          label: 'Adresse',
          value: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
        },
        {
          label: 'Site web',
          value: 'https://vercel.com',
        },
      ],
    },
  ];

  const legalSections = [
    {
      icon: Shield,
      title: 'Propriété Intellectuelle',
      gradient: 'from-indigo-500 to-blue-500',
      content: `L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.

La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.`,
    },
    {
      icon: Shield,
      title: 'Protection des Données Personnelles',
      gradient: 'from-teal-500 to-cyan-500',
      content: `Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.

Pour exercer ces droits, vous pouvez nous contacter par email à l'adresse : ${
        siteSettings.contactEmail || 'contact@bnbenergie01.com'
      }

Pour plus d'informations sur le traitement de vos données, consultez notre <a href="/politique-confidentialite" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Politique de Confidentialité</a>.`,
    },
    {
      icon: Shield,
      title: 'Cookies',
      gradient: 'from-amber-500 to-yellow-500',
      content: `Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.

Vous pouvez à tout moment désactiver les cookies depuis les paramètres de votre navigateur.`,
    },
    {
      icon: Shield,
      title: 'Crédits',
      gradient: 'from-rose-500 to-pink-500',
      content: `Conception et développement : BNB Énergie 01
Technologies utilisées : Next.js, React, TypeScript, Tailwind CSS
Photographies : Toutes les photographies présentes sur ce site sont la propriété de BNB Énergie 01 ou utilisées avec autorisation.`,
    },
    {
      icon: Shield,
      title: 'Limitation de Responsabilité',
      gradient: 'from-violet-500 to-purple-500',
      content: `Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.

BNB Énergie 01 ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de sites qui lui sont liés.`,
    },
  ];

  return (
    <PageMainWrapper variant="blue">
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Mentions', 'Légales']}
          subtitle="Informations légales et éditoriales"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          Conformément à la loi pour la Confiance dans l'Économie Numérique
          (LCEN)
        </motion.p>
      </PageHeader>

      <div className="relative z-10">
        <SectionContainer>
          {/* Informations principales */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-white dark:bg-content1 p-8 shadow-xl border border-neutral-100 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Background gradient effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  {/* Pattern background */}
                  <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-linear(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`mb-6 inline-flex rounded-2xl bg-linear-to-br ${section.gradient} p-4 shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">
                      {section.title}
                    </h2>

                    {/* Content */}
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
                  {/* Background gradient effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  {/* Pattern background */}
                  <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-linear(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                      }}
                    />
                  </div>

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
                      className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-default-500 leading-relaxed whitespace-pre-line"
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
              Date de dernière mise à jour :{' '}
              {new Date().toLocaleDateString('fr-FR')}
            </p>
          </motion.div>
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
