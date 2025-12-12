'use client';

import { motion } from 'framer-motion';
import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from '@/components';
import { Building2, Globe } from 'lucide-react';

export default function MentionsLegalesPageContent() {
  const sections = [
    {
      icon: Building2,
      title: 'Éditeur du Site',
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        { label: 'Raison sociale', value: 'BNB ENERGIE SAS' },
        {
          label: 'Forme juridique',
          value: 'Société par Actions Simplifiée (SAS)',
        },
        { label: 'Capital social', value: '100,00 €' },
        {
          label: 'Siège social',
          value: '2159 route Nationale 75, 01250 TOSSIAT, France',
        },
        { label: 'SIREN', value: '951 599 760' },
        { label: 'SIRET', value: '951 599 760 00026' },
        { label: 'Numéro de TVA', value: 'FR52951599760' },
        { label: 'RCS', value: '951 599 760 R.C.S. Bourg-en-Bresse' },
      ],
    },
    {
      icon: Globe,
      title: 'Directeur & Hébergement',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        { label: 'Nom', value: 'Représentant légal de BNB ENERGIE SAS' },
        { label: 'Responsable de la rédaction', value: 'BNB ENERGIE' },
        { label: 'Téléphone', value: '07 81 25 11 25' },
        { label: 'Email', value: 'bnbenergie@gmail.com' },
        { label: 'Hébergeur', value: 'Vercel Inc.' },
        {
          label: 'Adresse',
          value: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
        },
        { label: 'Email hébergeur', value: 'privacy@vercel.com' },
        { label: 'Site web', value: 'https://vercel.com' },
      ],
    },
  ];

  const legalSections = [
    {
      title: 'Propriété intellectuelle',
      content: `Tout le contenu du site www.bnbenergie.fr est protégé par le droit d’auteur, le droit des marques et le droit des bases de données. Toute reproduction ou utilisation sans autorisation est interdite.`,
    },
    {
      title: 'Protection des données personnelles',
      content: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement et de portabilité de vos données. Pour exercer vos droits, contactez-nous par email : bnbenergie@gmail.com ou par courrier : 2159 route Nationale 75, 01250 TOSSIAT.`,
    },
    {
      title: 'Cookies',
      content: `Le site utilise des cookies pour améliorer l’expérience utilisateur et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser les cookies.`,
    },
    {
      title: 'Responsabilité',
      content: `BNB ENERGIE s’efforce d’assurer la disponibilité du site 24h/24, 7j/7. Elle ne saurait être tenue responsable des interruptions temporaires ou des dommages directs/indirects.`,
    },
    {
      title: 'Droit applicable et juridiction',
      content: `Les présentes mentions légales sont régies par le droit français. En cas de litige, le tribunal compétent sera celui du ressort de la société.`,
    },
    {
      title: 'Activité professionnelle',
      content: `Installation et maintenance de panneaux solaires, conseil en énergie renouvelable, accompagnement administratif.`,
    },
    {
      title: 'Crédits',
      content: `Création du site web : BNB ENERGIE. Photographies : BNB ENERGIE et banques d’images libres de droits.`,
    },
    {
      title: 'Modification des mentions légales',
      content: `BNB ENERGIE se réserve le droit de modifier les présentes mentions légales à tout moment.`,
    },
  ];

  return (
    <PageMainWrapper variant="transparent">
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Mentions', 'légales']}
          subtitle="Informations légales et éditoriales"
        />
        <p className="max-w-4xl px-4 text-base text-white/80 sm:text-lg md:text-xl leading-relaxed">
          Conformément à la loi pour la Confiance dans l'Économie Numérique
          (LCEN)
        </p>
      </PageHeader>

      <SectionContainer className="pb-20 -mt-20 relative z-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-content1 p-8 shadow-xl border border-neutral-100 dark:border-white/5 mb-8"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
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

                  <div className="space-y-2">
                    {section.content.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between border-b border-neutral-100 dark:border-white/5 py-1"
                      >
                        <span className="font-medium text-neutral-700 dark:text-default-400">
                          {item.label}
                        </span>
                        <span className="text-neutral-600 dark:text-default-500">
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

        {/* Sections légales */}
        <div className="space-y-6 mt-10">
          {legalSections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-2xl bg-white dark:bg-content1 p-6 border border-neutral-100 dark:border-white/5"
            >
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                {section.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-default-400 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-neutral-600 dark:text-default-400">
          Date de dernière mise à jour : 10 octobre 2025
        </div>
      </SectionContainer>
    </PageMainWrapper>
  );
}
