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
  Globe,
  Users,
  Shield,
  Lock,
  AlertTriangle,
  FileText,
  Copyright,
  Link as LinkIcon,
} from 'lucide-react';

interface CGUPageContentProps {
  siteSettings: SiteSetting;
}

export default function CGUPageContent({ siteSettings }: CGUPageContentProps) {
  const sections = [
    {
      icon: Globe,
      title: 'Objet et Acceptation',
      gradient: 'from-green-500 to-emerald-500',
      content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site web :

<strong>${siteSettings.domain || 'https://bnbenergie01.com'}</strong>

édité par ${siteSettings.businessName || 'BNB Énergie 01'}

<strong>Acceptation des CGU :</strong>
L'accès et l'utilisation de ce site impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.

<strong>Modification des CGU :</strong>
Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement les CGU.`,
    },
    {
      icon: Users,
      title: 'Accès au Site',
      gradient: 'from-blue-500 to-cyan-500',
      content: `<strong>Accès libre :</strong>
L'accès au site est gratuit et ouvert à tous les utilisateurs disposant d'un accès Internet. Les frais de connexion et d'équipement sont à la charge de l'utilisateur.

<strong>Disponibilité :</strong>
Nous mettons tout en œuvre pour assurer la disponibilité du site 24h/24 et 7j/7. Toutefois, nous ne pouvons garantir une disponibilité permanente en raison :
• Des opérations de maintenance
• Des mises à jour techniques
• De pannes indépendantes de notre volonté
• De cas de force majeure

<strong>Suspension d'accès :</strong>
Nous nous réservons le droit de suspendre, interrompre ou limiter l'accès au site sans préavis ni justification, notamment en cas de maintenance ou de mise à jour.`,
    },
    {
      icon: Shield,
      title: 'Utilisation du Site',
      gradient: 'from-purple-500 to-pink-500',
      content: `<strong>Usage autorisé :</strong>
Ce site est destiné à un usage personnel et non commercial. Vous vous engagez à :
• Utiliser le site conformément à sa destination
• Respecter les lois et réglementations en vigueur
• Ne pas porter atteinte aux droits de tiers
• Ne pas perturber le fonctionnement du site

<strong>Usages interdits :</strong>
Il est strictement interdit de :
• Extraire, copier ou reproduire le contenu sans autorisation
• Utiliser des robots, scripts ou outils automatisés
• Tenter d'accéder à des zones non autorisées
• Diffuser des virus ou programmes malveillants
• Usurper l'identité d'une autre personne
• Porter atteinte à la sécurité du site`,
    },
    {
      icon: Copyright,
      title: 'Propriété Intellectuelle',
      gradient: 'from-amber-500 to-orange-500',
      content: `<strong>Droits d'auteur :</strong>
L'ensemble du contenu de ce site (textes, images, graphismes, logos, vidéos, structure, design, etc.) est protégé par le droit d'auteur, le droit des marques et le droit des bases de données.

Tous les droits de propriété intellectuelle appartiennent à ${
        siteSettings.businessName || 'BNB Énergie 01'
      } ou à ses partenaires.

<strong>Reproduction interdite :</strong>
Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle du site ou de son contenu est interdite sans autorisation écrite préalable.

<strong>Usage autorisé :</strong>
Vous pouvez consulter, télécharger et imprimer le contenu du site pour votre usage personnel et privé uniquement.`,
    },
    {
      icon: LinkIcon,
      title: 'Liens Hypertextes',
      gradient: 'from-teal-500 to-cyan-500',
      content: `<strong>Liens sortants :</strong>
Notre site peut contenir des liens vers des sites tiers. Nous n'exerçons aucun contrôle sur ces sites externes et déclinons toute responsabilité quant à leur contenu, leur disponibilité ou leurs conditions d'utilisation.

L'accès à ces sites se fait sous votre seule responsabilité.

<strong>Liens entrants :</strong>
La création de liens hypertextes vers notre site nécessite notre autorisation écrite préalable. Tout lien doit :
• Pointer vers la page d'accueil
• Ne pas induire en erreur sur notre identité ou nos services
• Ne pas porter atteinte à notre image ou réputation

Nous nous réservons le droit de demander la suppression de tout lien non autorisé.`,
    },
    {
      icon: FileText,
      title: 'Contenu Utilisateur',
      gradient: 'from-indigo-500 to-purple-500',
      content: `<strong>Formulaires de contact :</strong>
Les informations que vous nous transmettez via les formulaires (demandes de devis, contact) sont utilisées uniquement pour traiter votre demande conformément à notre <a href="/politique-confidentialite" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Politique de Confidentialité</a>.

<strong>Responsabilité du contenu :</strong>
Vous êtes seul responsable des informations que vous nous communiquez. Vous vous engagez à fournir des informations exactes, à jour et complètes.

<strong>Modération :</strong>
Nous nous réservons le droit de modérer, refuser ou supprimer tout contenu qui :
• Serait contraire aux lois et réglementations
• Porterait atteinte aux droits de tiers
• Serait diffamatoire, injurieux ou obscène
• Contiendrait des virus ou programmes malveillants`,
    },
    {
      icon: Lock,
      title: 'Protection des Données',
      gradient: 'from-violet-500 to-fuchsia-500',
      content: `<strong>Données personnelles :</strong>
Le traitement de vos données personnelles est régi par notre <a href="/politique-confidentialite" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Politique de Confidentialité</a> qui constitue un document distinct des présentes CGU.

Conformément au RGPD, vous disposez de droits sur vos données (accès, rectification, suppression, etc.).

<strong>Cookies :</strong>
Notre site utilise des cookies pour améliorer votre expérience. Pour plus d'informations, consultez notre Politique de Confidentialité.

<strong>Sécurité :</strong>
Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.`,
    },
    {
      icon: AlertTriangle,
      title: 'Responsabilité et Garanties',
      gradient: 'from-red-500 to-orange-500',
      content: `<strong>Limitation de responsabilité :</strong>
Nous apportons le plus grand soin à la mise à jour des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir :
• L'exactitude, la précision ou l'exhaustivité des informations
• L'absence d'interruption ou d'erreur dans l'accès au site
• L'absence de virus ou autres éléments nuisibles

<strong>Exclusion de garantie :</strong>
Le site est fourni "tel quel" sans garantie d'aucune sorte, expresse ou implicite.

<strong>Dommages :</strong>
Nous ne pourrons être tenus responsables des dommages directs ou indirects résultant de :
• L'utilisation ou l'impossibilité d'utiliser le site
• L'inexactitude des informations disponibles
• L'infection par des virus de vos équipements
• La perte de données ou de profits`,
    },
    {
      icon: Shield,
      title: 'Force Majeure',
      gradient: 'from-rose-500 to-pink-500',
      content: `<strong>Cas de force majeure :</strong>
Nous ne pourrons être tenus responsables de tout retard ou inexécution de nos obligations résultant d'un cas de force majeure tel que défini par la jurisprudence française.

Sont notamment considérés comme cas de force majeure :
• Catastrophes naturelles
• Incendie, inondation, foudre
• Guerre, émeute, attentat
• Grève générale
• Défaillance des réseaux de communication électronique
• Décision gouvernementale ou réglementaire

En cas de force majeure, nos obligations seront suspendues pendant toute la durée de l'événement.`,
    },
    {
      icon: FileText,
      title: 'Droit Applicable et Litiges',
      gradient: 'from-cyan-500 to-blue-500',
      content: `<strong>Droit applicable :</strong>
Les présentes CGU sont soumises au droit français. Elles sont rédigées en langue française.

<strong>Résolution amiable :</strong>
En cas de différend relatif à l'interprétation ou à l'exécution des présentes CGU, nous privilégierons une résolution amiable.

<strong>Juridiction compétente :</strong>
À défaut de résolution amiable, tout litige sera porté devant les tribunaux français compétents.

<strong>Médiation :</strong>
Conformément à la réglementation, vous pouvez recourir à un service de médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.`,
    },
  ];

  return (
    <PageMainWrapper variant="green">
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Conditions', "Générales d'utilisation"]}
          subtitle="Règles d'utilisation du site"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          Conditions applicables à l'utilisation de notre site web
        </motion.p>
      </PageHeader>

      <div className="relative z-10">
        <SectionContainer>
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-3xl bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 border border-green-100 dark:border-green-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex rounded-2xl bg-linear-to-br from-green-500 to-emerald-500 p-3 shadow-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
                  Bienvenue sur notre site
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  Les présentes Conditions Générales d'Utilisation (CGU)
                  définissent les règles d'accès et d'utilisation du site{' '}
                  <strong>
                    {siteSettings.domain || 'https://bnbenergie01.com'}
                  </strong>
                  . En naviguant sur ce site, vous acceptez sans réserve les
                  présentes CGU.
                </p>
                <p className="mt-4 text-sm text-neutral-600 dark:text-default-400">
                  <strong>Éditeur du site :</strong>{' '}
                  {siteSettings.businessName || 'BNB Énergie 01'}
                  <br />
                  <strong>Contact :</strong>{' '}
                  {siteSettings.contactEmail || 'contact@bnbenergie01.com'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
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

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-3xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 border border-blue-100 dark:border-blue-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 p-3 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">
                  Questions sur nos CGU ?
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  Pour toute question concernant nos Conditions Générales
                  d'Utilisation, n'hésitez pas à nous contacter :
                </p>
                <p className="mt-4 text-sm text-neutral-600 dark:text-default-400">
                  <strong>Email :</strong>{' '}
                  <a
                    href={`mailto:${
                      siteSettings.contactEmail || 'contact@bnbenergie01.com'
                    }`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {siteSettings.contactEmail || 'contact@bnbenergie01.com'}
                  </a>
                  <br />
                  <strong>Téléphone :</strong>{' '}
                  <a
                    href={`tel:${
                      siteSettings.contactPhone?.replace(/\s/g, '') ||
                      '0781251125'
                    }`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {siteSettings.contactPhone || '07 81 25 11 25'}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 text-center border border-green-100 dark:border-green-900/50"
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
