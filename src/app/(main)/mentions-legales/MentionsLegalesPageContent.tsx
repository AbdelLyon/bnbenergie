'use client';

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from '@/components';
import { motion } from 'framer-motion';
import type { SiteSetting } from '@/payload-types';
import { Building2, Phone, Globe, Server, Shield, FileText, Lock } from 'lucide-react';

interface MentionsLegalesPageContentProps {
  siteSettings: SiteSetting;
}

export default function MentionsLegalesPageContent({
  siteSettings,
}: MentionsLegalesPageContentProps) {
  // ------------------ SECTIONS PRINCIPALES ------------------
  console.log(siteSettings);

  const sections = [
    {
      icon: Building2,
      title: 'Éditeur du Site',
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        { label: 'Raison sociale', value: 'BNB ENERGIE SAS' },
        { label: 'Forme juridique', value: 'Société par Actions Simplifiée (SAS)' },
        { label: 'Capital social', value: '100,00 €' },
        { label: 'Siège social', value: '2159 route Nationale 75, 01250 TOSSIAT, France' },
        { label: 'SIREN', value: '951 599 760' },
        { label: 'SIRET (siège)', value: '951 599 760 00026' },
        { label: 'Numéro de TVA intracommunautaire', value: 'FR52951599760' },
        { label: 'RCS', value: '951 599 760 R.C.S. Bourg-en-Bresse' },
        { label: 'Date d’inscription au RCS', value: '14 avril 2023' },
        { label: 'Greffe', value: 'Bourg-en-Bresse' },
      ],
    },
    {
      icon: Phone,
      title: 'Contact',
      gradient: 'from-green-500 to-emerald-500',
      content: [
        { label: 'Téléphone', value: '07 81 25 11 25' },
        { label: 'Email', value: 'bnbenergie@gmail.com' },
      ],
    },
    {
      icon: Globe,
      title: 'Directeur de la Publication',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        { label: 'Nom', value: 'Représentant légal de BNB ENERGIE SAS' },
        { label: 'Responsable de la rédaction', value: 'BNB ENERGIE' },
      ],
    },
{
  icon: Server,
  title: 'Hébergement',
  gradient: 'from-orange-500 to-red-500',
  content: [
    { label: 'Hébergeur', value: 'Vercel Inc.' },
    { label: 'Adresse', value: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis' },
    { label: 'Email', value: 'privacy@vercel.com' },
    { label: 'Site web', value: 'https://vercel.com' },
  ],
},

  ];

  // ------------------ SECTIONS LEGALES ------------------
  const legalSections = [
    {
      icon: Shield,
      title: 'Propriété intellectuelle',
      gradient: 'from-indigo-500 to-blue-500',
      content: `L’ensemble du contenu du site www.bnbenergie.fr (structure, textes, graphismes, logos, images, vidéos, sons, logiciels, bases de données, etc.) est protégé par le droit d’auteur, le droit des marques et le droit des bases de données. Toute reproduction ou utilisation sans autorisation est interdite.`,
    },
    {
      icon: Lock,
      title: 'Protection des données personnelles',
      gradient: 'from-teal-500 to-cyan-500',
      content: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour exercer vos droits, contactez-nous par email : bnbenergie@gmail.com ou par courrier : 2159 route Nationale 75, 01250 TOSSIAT.`,
    },
    {
      icon: Shield,
      title: 'Cookies',
      gradient: 'from-amber-500 to-yellow-500',
      content: `Le site utilise des cookies pour améliorer l’expérience utilisateur et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser les cookies.`,
    },
    {
      icon: FileText,
      title: 'Responsabilité et force majeure',
      gradient: 'from-violet-500 to-purple-500',
      content: `BNB ENERGIE s’efforce d’assurer la disponibilité du site 24h/24, 7j/7. Toutefois, elle ne saurait être tenue responsable des interruptions temporaires ou des dommages directs/indirects. En cas de force majeure, BNB ENERGIE ne pourra être tenue responsable.`,
    },
    {
      icon: Shield,
      title: 'Droit applicable et juridiction compétente',
      gradient: 'from-pink-500 to-rose-500',
      content: `Les présentes mentions légales sont régies par le droit français. En cas de litige, le tribunal compétent sera celui du ressort de la société. Pour les litiges consommateurs, un médiateur peut être saisi.`,
    },
    {
      icon: FileText,
      title: 'Qualifications et assurances professionnelles',
      gradient: 'from-green-500 to-emerald-500',
      content: `BNB ENERGIE est certifiée RGE QualiPV et couverte par les assurances professionnelles obligatoires. Les attestations d’assurance sont disponibles sur demande.`,
    },
    {
      icon: FileText,
      title: 'Activité professionnelle',
      gradient: 'from-blue-500 to-cyan-500',
      content: `Installation et maintenance de panneaux solaires, conseil en énergie renouvelable, accompagnement administratif.`,
    },
    {
      icon: FileText,
      title: 'Réglementation applicable',
      gradient: 'from-orange-500 to-red-500',
      content: `Les installations respectent les normes électriques NF C 15-100, sécurité incendie, DTU 43.1, réglementations locales d’urbanisme et exigences de raccordement Enedis.`,
    },
    {
      icon: FileText,
      title: 'Crédits',
      gradient: 'from-purple-500 to-pink-500',
      content: `Création du site web : BNB ENERGIE. Photographies : BNB ENERGIE et banques d’images libres de droits.`,
    },
    {
      icon: FileText,
      title: 'Modification des mentions légales',
      gradient: 'from-teal-500 to-cyan-500',
      content: `BNB ENERGIE se réserve le droit de modifier les présentes mentions légales à tout moment. La date de dernière mise à jour est indiquée en haut de la page.`,
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
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 sm:text-lg md:text-xl"
        >
          Conformément à la loi pour la Confiance dans l'Économie Numérique (LCEN)
        </motion.p>
      </PageHeader>

      {/* ---------------- SECTIONS ---------------- */}
      <SectionContainer className="pb-24 -mt-24 relative z-10">
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
                  <div className="space-y-2">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-neutral-100 dark:border-white/5 py-1">
                        <span className="font-medium text-neutral-700 dark:text-default-400">{item.label}</span>
                        <span className="text-neutral-600 dark:text-default-500">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------- SECTIONS LEGALES DETAILLEES ---------------- */}
        <div className="space-y-8 mt-12">
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
                  <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-line text-neutral-700 dark:text-default-500">
                    {section.content}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 text-center border border-blue-100 dark:border-blue-900/50"
        >
          <p className="text-sm text-neutral-600 dark:text-default-400">
            Date de dernière mise à jour : 10 octobre 2025
          </p>
        </motion.div>
      </SectionContainer>
    </PageMainWrapper>
  );
}
