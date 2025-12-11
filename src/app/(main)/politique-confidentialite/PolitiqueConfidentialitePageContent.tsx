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
  Mail,
  FileText,
} from 'lucide-react';

interface PolitiqueConfidentialitePageContentProps {
  siteSettings: SiteSetting;
}

export default function PolitiqueConfidentialitePageContent({
  siteSettings,
}: PolitiqueConfidentialitePageContentProps) {
  const sections = [
    {
      icon: Database,
      title: 'Données Collectées',
      gradient: 'from-purple-500 to-violet-500',
      content: `Nous collectons les données personnelles suivantes lorsque vous utilisez notre site ou nos services :

<strong>Données d'identification :</strong>
• Nom et prénom
• Adresse postale
• Adresse email
• Numéro de téléphone

<strong>Données techniques :</strong>
• Adresse IP
• Type et version du navigateur
• Système d'exploitation
• Pages visitées et durée de visite
• Source de trafic

<strong>Données relatives à votre projet :</strong>
• Type d'installation souhaitée
• Caractéristiques de votre habitation
• Consommation énergétique
• Budget estimé`,
    },
    {
      icon: Eye,
      title: 'Finalités du Traitement',
      gradient: 'from-blue-500 to-cyan-500',
      content: `Vos données personnelles sont collectées et traitées pour les finalités suivantes :

• <strong>Gestion des demandes de devis :</strong> traitement et suivi de vos demandes d'installation
• <strong>Relation client :</strong> répondre à vos questions et gérer votre dossier
• <strong>Amélioration de nos services :</strong> analyse du parcours utilisateur et optimisation du site
• <strong>Communication commerciale :</strong> envoi d'informations sur nos offres (avec votre consentement)
• <strong>Obligations légales :</strong> respect des réglementations en vigueur
• <strong>Statistiques :</strong> analyse d'audience et mesure de performance`,
    },
    {
      icon: Lock,
      title: 'Base Légale du Traitement',
      gradient: 'from-green-500 to-emerald-500',
      content: `Le traitement de vos données personnelles repose sur les bases légales suivantes :

• <strong>Exécution d'un contrat :</strong> traitement de votre demande de devis et réalisation de la prestation
• <strong>Intérêt légitime :</strong> amélioration de nos services et sécurisation de notre site
• <strong>Consentement :</strong> envoi de communications commerciales (uniquement si vous l'avez accepté)
• <strong>Obligation légale :</strong> conservation des documents comptables et juridiques`,
    },
    {
      icon: UserCheck,
      title: 'Destinataires des Données',
      gradient: 'from-orange-500 to-red-500',
      content: `Vos données personnelles sont traitées par :

• <strong>BNB Énergie 01 :</strong> notre équipe interne pour le traitement de votre demande
• <strong>Sous-traitants techniques :</strong> hébergement du site, envoi d'emails, outils d'analyse
• <strong>Partenaires commerciaux :</strong> uniquement si nécessaire pour votre projet (avec votre accord)
• <strong>Autorités légales :</strong> si requis par la loi

Nous nous assurons que tous nos partenaires respectent le RGPD et protègent vos données.`,
    },
    {
      icon: FileText,
      title: 'Durée de Conservation',
      gradient: 'from-pink-500 to-rose-500',
      content: `Vos données sont conservées pendant les durées suivantes :

• <strong>Prospects (sans contrat) :</strong> 3 ans à compter du dernier contact
• <strong>Clients :</strong> pendant la durée contractuelle + 10 ans (garantie décennale)
• <strong>Données de connexion :</strong> 1 an maximum
• <strong>Cookies :</strong> 13 mois maximum
• <strong>Documents comptables :</strong> 10 ans (obligation légale)

À l'expiration de ces délais, vos données sont supprimées ou anonymisées.`,
    },
    {
      icon: Shield,
      title: 'Vos Droits',
      gradient: 'from-indigo-500 to-purple-500',
      content: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :

• <strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles
• <strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes
• <strong>Droit à l'effacement :</strong> demander la suppression de vos données
• <strong>Droit à la limitation :</strong> limiter le traitement de vos données
• <strong>Droit d'opposition :</strong> vous opposer au traitement de vos données
• <strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré
• <strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements basés sur le consentement

Pour exercer ces droits, contactez-nous à : <strong>${
        siteSettings.contactEmail || 'contact@bnbenergie01.com'
      }</strong>`,
    },
    {
      icon: Cookie,
      title: 'Cookies et Traceurs',
      gradient: 'from-amber-500 to-yellow-500',
      content: `Notre site utilise des cookies pour améliorer votre expérience :

<strong>Cookies essentiels :</strong>
• Nécessaires au fonctionnement du site
• Ne nécessitent pas de consentement
• Exemple : session, préférences de langue

<strong>Cookies analytiques :</strong>
• Mesure d'audience et statistiques
• Nécessitent votre consentement
• Exemple : Google Analytics (anonymisé)

<strong>Cookies marketing :</strong>
• Publicité ciblée (si activés)
• Nécessitent votre consentement explicite

Vous pouvez gérer vos préférences cookies à tout moment via les paramètres de votre navigateur ou notre bandeau de consentement.`,
    },
    {
      icon: Lock,
      title: 'Sécurité des Données',
      gradient: 'from-teal-500 to-cyan-500',
      content: `Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :

• <strong>Chiffrement SSL/TLS :</strong> toutes les communications sont sécurisées
• <strong>Hébergement sécurisé :</strong> serveurs protégés et sauvegardés régulièrement
• <strong>Accès restreint :</strong> seules les personnes autorisées peuvent accéder à vos données
• <strong>Mise à jour régulière :</strong> systèmes et logiciels à jour pour éviter les failles
• <strong>Formation du personnel :</strong> sensibilisation à la protection des données

En cas de violation de données, nous vous en informerons dans les 72 heures conformément au RGPD.`,
    },
  ];

  return (
    <PageMainWrapper variant="purple">
      {/* HEADER */}
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Politique', 'de confidentialité']}
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

      {/* CARDS FLOTTANTES */}
      <div className="relative z-20 -mt-20 mb-16 px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-lg dark:bg-black/30"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Données protégées
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Sécurité renforcée et conformité stricte RGPD.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-lg dark:bg-black/30"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Transparence totale
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Une politique claire, accessible et mise à jour.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-lg dark:bg-black/30"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Contrôle utilisateur
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Gérez vos droits, vos données et vos préférences.
            </p>
          </motion.div>

        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10">
        <SectionContainer>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-3xl bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-8 border border-purple-100 dark:border-purple-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex rounded-2xl bg-linear-to-br from-purple-500 to-violet-500 p-3 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
                  Votre vie privée est notre priorité
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  BNB Énergie 01 s'engage à protéger vos données personnelles et
                  à respecter votre vie privée. Cette politique de confidentialité
                  vous informe sur la manière dont nous collectons, utilisons et
                  protégeons vos données conformément au RGPD.
                </p>
                <p className="mt-4 text-sm text-neutral-600 dark:text-default-400">
                  <strong>Responsable du traitement :</strong>{' '}
                  {siteSettings.businessName || 'BNB Énergie 01'}
                  <br />
                  <strong>Contact :</strong>{' '}
                  {siteSettings.contactEmail || 'contact@bnbenergie01.com'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* SECTIONS */}
          <div className="space-y-8">
            {sections.map((section, index) => {
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

                    <div
                      className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-default-500 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CNIL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-3xl bg-linear-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-8 border border-red-100 dark:border-red-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex rounded-2xl bg-linear-to-br from-red-500 to-orange-500 p-3 shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">
                  Réclamation auprès de la CNIL
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  Si vous estimez que vos droits ne sont pas respectés, vous
                  pouvez introduire une réclamation auprès de la CNIL :
                </p>
                <p className="mt-4 text-sm text-neutral-600 dark:text-default-400">
                  <strong>CNIL</strong>
                  <br />
                  3 Place de Fontenoy - TSA 80715
                  <br />
                  75334 PARIS CEDEX 07
                  <br />
                  Tél : 01 53 73 22 22
                  <br />
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-8 text-center border border-purple-100 dark:border-purple-900/50"
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
