'use client';

import { Title } from '@/app/_components/features/Hero/Title';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { FeatureCard } from '@/app/_components/shared/ui/FeatureCard';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import siteConfig from '@/data/siteConfig.json';
import zonesData from '@/data/zonesData.json';

interface ZoneGroup {
  zone: string;
  communes: string[];
  gradient: string;
}

interface CityPageContentProps {
  cityName: string;
  cityGroup?: ZoneGroup;
}

export default function CityPageContent({
  cityName,
  cityGroup,
}: CityPageContentProps) {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={['Installation Panneaux Solaires', `à ${cityName}`]}
          subtitle="Votre expert photovoltaïque local"
        />
        <p className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl">
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
        <IntroSection
          title={`Installation Photovoltaïque à ${cityName}`}
          description={`Vous habitez à ${cityName} et souhaitez passer à l'énergie solaire ? En tant qu'installateur local basé dans l'Ain, nous connaissons parfaitement les spécificités de votre secteur. Nous vous proposons une étude personnalisée pour optimiser votre production et votre autoconsommation.`}
        />

        {/* Avantages */}
        <div className="mb-20">
          <h2 className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl">
            Pourquoi choisir un installateur local à {cityName} ?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zonesData.why_local.items.map((item, index) => (
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

        {/* CTA */}
        <CTASection
          title={`Prêt à passer au solaire à ${cityName} ?`}
          description="Demandez votre devis gratuit et sans engagement. Nous nous déplaçons chez vous pour étudier votre projet."
          phoneNumber={siteConfig.contact.phone}
          primaryButton={{
            text: 'Demander mon devis gratuit',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
