'use client';

import {
  Title,
  PageHeader,
  SectionContainer,
  CTASection,
  FeatureCard,
  IntroSection,
  StatsGrid,
} from '@/components';
import { LazyMotionDiv } from '@/components/LazyComponents';
import { SiteSetting } from '@/payload-types';
import Link from 'next/link';

interface CityGroup {
  gradient?: string;
  [key: string]: unknown;
}

interface RelatedCity {
  name: string;
  slug: string;
}

interface CityPageContentProps {
  cityName: string;
  cityGroup?: CityGroup;
  siteSettings: SiteSetting;
  relatedCities?: RelatedCity[];
}

const WHY_LOCAL_ITEMS = [
  {
    icon: 'MapPin',
    title: 'Proximité & Réactivité',
    description:
      "Basés dans l'Ain, nous intervenons rapidement pour l'installation et le SAV. Un interlocuteur unique proche de chez vous.",
  },
  {
    icon: 'ShieldCheck',
    title: 'Garanties Locales',
    description:
      'Toutes nos assurances et garanties sont valables en France. Nous connaissons les spécificités climatiques de la région.',
  },
  {
    icon: 'Users',
    title: 'Accompagnement',
    description:
      'Nous gérons toutes les démarches administratives (Mairie, Enedis, Consuel) pour vous simplifier la vie.',
  },
];

export default function CityPageContent({
  cityName,
  cityGroup,
  siteSettings,
  relatedCities = [],
}: CityPageContentProps) {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-content1 dark:to-background">
      <PageHeader variant="simple" height="medium">
        <Title
          title={['Installation', `à ${cityName}`]}
          subtitle="Votre expert photovoltaïque local"
        />
        <p className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl">
          BNB ÉNERGIE vous accompagne dans votre projet d&apos;installation de
          panneaux solaires à {cityName}. Profitez de notre expertise locale et
          de nos garanties pour réduire vos factures d&apos;électricité.
        </p>
      </PageHeader>

      <SectionContainer>
        {/* Stats */}
        <StatsGrid
          stats={[
            {
              value: 'Local',
              label: `Intervention à ${cityName}`,
              icon: 'MapPin',
              gradient: cityGroup?.gradient || 'from-blue-500 to-cyan-500',
            },
            {
              value: '< 30 min',
              label: "Temps d'Intervention",
              icon: 'Clock',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              value: 'RGE',
              label: 'Certifié QualiPV',
              icon: 'Award',
              gradient: 'from-blue-500 to-cyan-500',
            },
          ]}
        />

        {/* Introduction */}
        <LazyMotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-24 overflow-hidden rounded-3xl bg-white dark:bg-content1 p-12 shadow-xl border border-neutral-100 dark:border-white/5"
        >
          {/* Pattern decoratif subtil */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <IntroSection
              title={`Installation Photovoltaïque à ${cityName}`}
              description={`Vous habitez à ${cityName} et souhaitez passer à l'énergie solaire ? En tant qu'installateur local basé dans l'Ain, nous connaissons parfaitement les spécificités de votre secteur. Nous vous proposons une étude personnalisée pour optimiser votre production et votre autoconsommation.`}
              className="mb-0"
            />
          </div>
        </LazyMotionDiv>

        {/* Avantages */}
        <div className="mb-20">
          <h2 className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl">
            Pourquoi choisir un installateur local à {cityName} ?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_LOCAL_ITEMS.map((item, index) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                gradient={cityGroup?.gradient || 'from-blue-500 to-cyan-500'}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Liens contextuels vers services */}
        <LazyMotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-wrap justify-center gap-4 text-sm"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-5 py-2.5 font-medium text-blue-700 dark:text-blue-400 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40"
          >
            Découvrir nos services d&apos;installation →
          </Link>
          <Link
            href="/nos-packs"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-5 py-2.5 font-medium text-amber-700 dark:text-amber-400 transition-all hover:bg-amber-100 dark:hover:bg-amber-900/40"
          >
            Voir nos tarifs et packs →
          </Link>
          <Link
            href="/aides-financement"
            className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-5 py-2.5 font-medium text-green-700 dark:text-green-400 transition-all hover:bg-green-100 dark:hover:bg-green-900/40"
          >
            Aides & financement disponibles →
          </Link>
        </LazyMotionDiv>

        {/* Autres villes desservies */}
        {relatedCities.length > 0 && (
          <LazyMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20 rounded-2xl border border-neutral-100 dark:border-divider bg-white dark:bg-content1 p-8 shadow-sm"
          >
            <h2 className="font-display mb-6 text-center text-xl font-bold text-neutral-900 dark:text-foreground">
              Aussi présents dans les communes voisines
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {relatedCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/zones-intervention/${city.slug}`}
                  className="rounded-lg border border-neutral-200 dark:border-divider bg-neutral-50 dark:bg-content2 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-default-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
              <Link href="/zones-intervention" className="font-medium hover:text-amber-600 dark:hover:text-amber-400 hover:underline">
                Voir toutes nos zones d&apos;intervention →
              </Link>
            </p>
          </LazyMotionDiv>
        )}

        {/* CTA */}
        <CTASection
          title={`Prêt à passer au solaire à ${cityName} ?`}
          description="Demandez votre devis gratuit et sans engagement. Nous nous déplaçons chez vous pour étudier votre projet."
          phoneNumber={siteSettings.contactPhone}
          primaryButton={{
            text: 'Demander mon devis gratuit',
            href: '/contact#contact-form',
          }}
          secondaryButton={{
            text: 'Nos garanties RGE',
            href: '/garanties',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
