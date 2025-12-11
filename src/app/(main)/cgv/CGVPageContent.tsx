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
  FileText,
  DollarSign,
  Calendar,
  Truck,
  Shield,
  AlertCircle,
  Scale,
  CheckCircle,
} from 'lucide-react';

interface CGVPageContentProps {
  siteSettings: SiteSetting;
}

export default function CGVPageContent({ siteSettings }: CGVPageContentProps) {
  const sections = [
    {
      icon: FileText,
      title: "Champ d'Application",
      gradient: 'from-amber-500 to-orange-500',
      content: `Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :

<strong>Le vendeur :</strong>
${siteSettings.businessName || 'BNB Énergie 01'}
${
  siteSettings.addressStreet
    ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
    : '16 Av. Pablo Picasso, 01000 Bourg-en-Bresse'
}
SIRET : À définir
Email : ${siteSettings.contactEmail || 'contact@bnbenergie01.com'}
Tél : ${siteSettings.contactPhone || '07 81 25 11 25'}

<strong>Le client :</strong> toute personne physique ou morale souhaitant acquérir nos services d'installation de panneaux solaires photovoltaïques.

Ces CGV s'appliquent à toutes nos prestations sans restriction ni réserve. Toute commande implique l'acceptation sans réserve des présentes CGV.`,
    },
    {
      icon: CheckCircle,
      title: 'Prestations Proposées',
      gradient: 'from-green-500 to-emerald-500',
      content: `BNB Énergie 01 propose les prestations suivantes :

• <strong>Étude personnalisée :</strong> analyse de votre consommation, étude de faisabilité technique, dimensionnement de l'installation
• <strong>Installation de panneaux solaires photovoltaïques :</strong> fourniture et pose de matériel de qualité (panneaux, onduleurs, systèmes de fixation)
• <strong>Raccordement électrique :</strong> raccordement au réseau Enedis et mise en service
• <strong>Démarches administratives :</strong> demande de raccordement, attestation Consuel, déclaration préalable de travaux
• <strong>Suivi et accompagnement :</strong> aide aux demandes d'aides financières (MaPrimeRénov', Prime CEE)
• <strong>Garanties et SAV :</strong> garanties constructeur, garantie décennale, service après-vente

Toutes nos prestations sont réalisées par des professionnels RGE QualiPV.`,
    },
    {
      icon: DollarSign,
      title: 'Devis et Prix',
      gradient: 'from-blue-500 to-cyan-500',
      content: `<strong>Devis gratuit :</strong>
Nous établissons un devis gratuit et sans engagement sous 48h après réception de votre demande. Le devis détaille :
• La description précise de la prestation
• Le prix unitaire et total HT et TTC
• Le délai de validité du devis (60 jours sauf mention contraire)
• Les conditions de paiement
• Les garanties applicables

<strong>Prix :</strong>
Les prix indiqués sont en euros TTC, incluant la TVA applicable au moment de la commande. Les prix peuvent être révisés si :
• Évolution du coût des matériaux ou de la main d'œuvre
• Modification de la réglementation fiscale
• Demande de modification du client

<strong>Aides financières :</strong>
Le montant des aides (MaPrimeRénov', Prime CEE, etc.) sera déduit du prix total si vous êtes éligible. Ces aides sont versées directement par les organismes concernés.`,
    },
    {
      icon: FileText,
      title: 'Commande et Acceptation',
      gradient: 'from-purple-500 to-pink-500',
      content: `<strong>Validation de la commande :</strong>
La commande est considérée comme définitive après :
• Signature du devis par le client
• Versement de l'acompte prévu
• Respect du délai de rétractation de 14 jours

<strong>Délai de rétractation :</strong>
Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours calendaires pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.

Le délai court à compter de la signature du devis. Pour exercer ce droit, envoyez-nous une notification claire par email à ${
        siteSettings.contactEmail || 'contact@bnbenergie01.com'
      }.`,
    },
    {
      icon: DollarSign,
      title: 'Conditions de Paiement',
      gradient: 'from-teal-500 to-cyan-500',
      content: `<strong>Modalités de paiement :</strong>
Le règlement s'effectue selon l'échéancier suivant (sauf accord particulier) :
• <strong>30% d'acompte</strong> à la signature du devis
• <strong>40% à mi-parcours</strong> lors de la livraison du matériel
• <strong>30% au solde</strong> à la fin des travaux et mise en service

<strong>Moyens de paiement acceptés :</strong>
• Virement bancaire
• Chèque
• Financement bancaire (partenaires agréés)

<strong>Retard de paiement :</strong>
En cas de retard de paiement, des pénalités de retard au taux de 3 fois le taux d'intérêt légal seront appliquées, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.`,
    },
    {
      icon: Calendar,
      title: "Délais d'Exécution",
      gradient: 'from-indigo-500 to-purple-500',
      content: `<strong>Délai d'installation :</strong>
Le délai indicatif d'installation est de 4 à 8 semaines à compter de la signature du devis, sous réserve :
• De l'obtention des autorisations administratives nécessaires
• Des conditions climatiques favorables
• De l'accessibilité du site
• De la disponibilité du matériel

<strong>Report :</strong>
En cas de force majeure ou de circonstances exceptionnelles (intempéries, impossibilité d'accès, grèves), le délai pourra être prolongé sans indemnité pour le client.

Nous vous tiendrons informé de l'avancement de votre projet à chaque étape.`,
    },
    {
      icon: Truck,
      title: 'Réalisation et Réception',
      gradient: 'from-orange-500 to-red-500',
      content: `<strong>Exécution des travaux :</strong>
L'installation sera réalisée par nos techniciens qualifiés RGE QualiPV. Le client s'engage à :
• Fournir un accès libre et sécurisé au site
• Mettre à disposition l'électricité et l'eau si nécessaire
• Être présent ou représenté lors de la réception des travaux

<strong>Réception des travaux :</strong>
À l'achèvement des travaux, un procès-verbal de réception sera signé par les deux parties. Le client dispose d'un délai de 48h pour formuler des réserves écrites.

La réception des travaux sans réserve vaut acceptation totale de la prestation.`,
    },
    {
      icon: Shield,
      title: 'Garanties',
      gradient: 'from-green-500 to-teal-500',
      content: `<strong>Garantie décennale :</strong>
Conformément à l'article 1792 du Code civil, nous souscrivons une assurance décennale couvrant les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination.

<strong>Garantie de parfait achèvement :</strong>
Pendant 1 an après réception, nous nous engageons à réparer tous les désordres signalés par le client.

<strong>Garanties constructeur :</strong>
• Panneaux solaires : garantie fabricant 25 ans sur le rendement
• Onduleurs : garantie fabricant 5 à 10 ans selon modèle
• Main d'œuvre : garantie 2 ans

<strong>Service Après-Vente :</strong>
Notre équipe SAV est disponible pour toute intervention de maintenance ou de dépannage.`,
    },
    {
      icon: AlertCircle,
      title: 'Responsabilité et Force Majeure',
      gradient: 'from-red-500 to-pink-500',
      content: `<strong>Limitation de responsabilité :</strong>
Notre responsabilité est limitée aux dommages directs et prévisibles résultant de l'inexécution ou de la mauvaise exécution de nos obligations contractuelles.

Nous ne saurions être tenus responsables des dommages indirects tels que :
• Perte de production d'énergie
• Manque à gagner
• Préjudice commercial

<strong>Force majeure :</strong>
Nous ne pourrons être tenus responsables en cas de force majeure telle que définie par la jurisprudence (catastrophe naturelle, guerre, grève générale, etc.).

En cas de force majeure, l'exécution de nos obligations sera suspendue sans indemnité.`,
    },
    {
      icon: Scale,
      title: 'Litiges et Médiation',
      gradient: 'from-violet-500 to-purple-500',
      content: `<strong>Règlement amiable :</strong>
En cas de difficulté concernant l'exécution du contrat, nous nous engageons à rechercher une solution amiable.

<strong>Médiation de la consommation :</strong>
Conformément à l'article L612-1 du Code de la consommation, vous pouvez recourir gratuitement à un médiateur de la consommation en cas de litige :

Médiateur de la Consommation
[Coordonnées du médiateur à définir]

<strong>Droit applicable :</strong>
Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.`,
    },
  ];

  return (
    <PageMainWrapper variant="amber">
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Conditions', 'Générales']}
          subtitle="Nos engagements commerciaux"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          Conditions applicables à nos services d'installation solaire
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
            className="mb-12 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-8 border border-amber-100 dark:border-amber-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 p-3 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
                  Conditions Générales de Vente
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) définissent
                  les droits et obligations de BNB Énergie 01 et de ses clients
                  dans le cadre de la vente et de l'installation de panneaux
                  solaires photovoltaïques.
                </p>
                <p className="mt-4 text-sm text-neutral-600 dark:text-default-400">
                  <strong>Dernière mise à jour :</strong>{' '}
                  {new Date().toLocaleDateString('fr-FR')}
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
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
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
                  Questions sur nos CGV ?
                </h2>
                <p className="text-neutral-700 dark:text-default-500 leading-relaxed">
                  Pour toute question concernant nos Conditions Générales de
                  Vente, n'hésitez pas à nous contacter :
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
            className="mt-12 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-8 text-center border border-amber-100 dark:border-amber-900/50"
          >
            <p className="text-sm text-neutral-600 dark:text-default-400">
              Ces CGV peuvent être modifiées à tout moment. La version
              applicable est celle en vigueur au moment de la commande.
            </p>
          </motion.div>
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
