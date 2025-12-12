'use client';

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from '@/components';
import { motion } from 'framer-motion';
import type { SiteSetting } from '@/payload-types';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  FileText,
} from 'lucide-react';

interface PolitiqueConfidentialitePageContentProps {
  siteSettings: SiteSetting;
}

export default function PolitiqueConfidentialitePageContent({
  siteSettings,
}: PolitiqueConfidentialitePageContentProps) {
  // ------------------ TABLEAU DE SECTIONS ------------------
  const sections = [
    {
      icon: Database,
      title: 'Données personnelles collectées',
      gradient: 'from-purple-500 to-violet-500',
      content: [
        {
          label: 'Données d’identification',
          value: 'Nom, Prénom, Email, Téléphone, Code postal/Commune',
        },
        {
          label: 'Données techniques',
          value:
            'Adresse IP, Navigateur, Système d’exploitation, Pages consultées, Source de trafic',
        },
        {
          label: 'Données sur votre projet',
          value: 'Type de projet, Puissance souhaitée, Message libre',
        },
      ],
    },
    {
      icon: Eye,
      title: 'Finalités du traitement',
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          label: 'Gestion des demandes',
          value: 'Répondre aux demandes de contact et devis',
        },
        {
          label: 'Relation client',
          value: 'Suivi du projet et service après-vente',
        },
        {
          label: 'Amélioration des services',
          value: 'Analyse de l’utilisation du site et optimisation',
        },
        {
          label: 'Obligations légales',
          value: 'Respect des réglementations comptables et fiscales',
        },
      ],
    },
    {
      icon: Lock,
      title: 'Base légale du traitement',
      gradient: 'from-green-500 to-emerald-500',
      content: [
        {
          label: 'Exécution d’un contrat',
          value: 'Traitement des demandes et réalisation de la prestation',
        },
        {
          label: 'Intérêt légitime',
          value: 'Amélioration des services et sécurité du site',
        },
        {
          label: 'Consentement',
          value: 'Envoi d’informations commerciales uniquement si accepté',
        },
        {
          label: 'Obligation légale',
          value: 'Conservation des documents comptables et fiscaux',
        },
      ],
    },
    {
      icon: UserCheck,
      title: 'Destinataires des données',
      gradient: 'from-orange-500 to-red-500',
      content: [
        { label: 'Services internes', value: 'BNB ÉNERGIE' },
        {
          label: 'Sous-traitants techniques',
          value: 'Hébergement, email, outils d’analyse',
        },
        {
          label: 'Partenaires commerciaux',
          value: 'Seulement avec accord préalable',
        },
        { label: 'Autorités légales', value: 'Sur demande légale uniquement' },
      ],
    },
    {
      icon: FileText,
      title: 'Durée de conservation',
      gradient: 'from-pink-500 to-rose-500',
      content: [
        { label: 'Demandes sans suite', value: '3 ans' },
        { label: 'Devis non acceptés', value: '3 ans' },
        { label: 'Contrats et factures', value: '10 ans' },
        { label: 'Données de navigation', value: '13 mois maximum' },
      ],
    },
    {
      icon: Shield,
      title: 'Vos droits',
      gradient: 'from-indigo-500 to-purple-500',
      content: [
        { label: 'Droit d’accès', value: 'Obtenir une copie de vos données' },
        {
          label: 'Droit de rectification',
          value: 'Corriger vos données inexactes',
        },
        {
          label: 'Droit à l’effacement',
          value: 'Demander la suppression de vos données',
        },
        {
          label: 'Droit à la limitation',
          value: 'Limiter le traitement des données',
        },
        {
          label: 'Droit d’opposition',
          value: 'S’opposer au traitement de vos données',
        },
        {
          label: 'Droit à la portabilité',
          value: 'Recevoir vos données dans un format structuré',
        },
        {
          label: 'Exercice de vos droits',
          value: `Contact : ${siteSettings.contactEmail || 'bnbenergie@gmail.com'}`,
        },
      ],
    },
    {
      icon: Cookie,
      title: 'Cookies et traceurs',
      gradient: 'from-amber-500 to-yellow-500',
      content: [
        {
          label: 'Cookies essentiels',
          value:
            'Nécessaires au fonctionnement du site, pas de consentement requis',
        },
        {
          label: 'Cookies analytiques',
          value: 'Mesure d’audience, consentement requis',
        },
        {
          label: 'Cookies marketing',
          value: 'Publicité ciblée, consentement requis',
        },
      ],
    },
    {
      icon: Lock,
      title: 'Sécurité des données',
      gradient: 'from-teal-500 to-cyan-500',
      content: [
        { label: 'Chiffrement', value: 'SSL/TLS' },
        {
          label: 'Hébergement sécurisé',
          value: 'Sauvegardes régulières et serveurs protégés',
        },
        {
          label: 'Accès restreint',
          value: 'Seulement aux personnes autorisées',
        },
        {
          label: 'Mise à jour régulière',
          value: 'Systèmes et logiciels à jour',
        },
        {
          label: 'Formation du personnel',
          value: 'Sensibilisation à la protection des données',
        },
      ],
    },
  ];

  return (
    <PageMainWrapper variant="transparent">
      {/* ---------------- HEADER ---------------- */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Politique ', 'de confidentialité']}
          subtitle="Protection de vos données personnelles"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-3xl px-4 text-base font-normal leading-relaxed text-white/80 sm:text-lg md:text-xl"
        >
          Conformément au RGPD et à la loi Informatique et Libertés
        </motion.p>
      </PageHeader>

      {/* ---------------- SECTIONS ---------------- */}
      <SectionContainer className="pb-24 -mt-24 relative z-10">
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

        {/* ---------------- FOOTER ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-8 text-center border border-purple-100 dark:border-purple-900/50"
        >
          <p className="text-sm text-neutral-600 dark:text-default-400">
            Date de dernière mise à jour : 10 octobre 2025
          </p>
        </motion.div>
      </SectionContainer>
    </PageMainWrapper>
  );
}
