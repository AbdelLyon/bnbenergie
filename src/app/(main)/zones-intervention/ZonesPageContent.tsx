"use client";

import {
  Title,
  Heading,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatsGrid,
  IntroSection,
  FeatureCard,
  CTASection,
} from "@/components";

import Link from "next/link";
import { slugify } from "@/utils/slugify";
import type {
  InterventionZone,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";

interface ZonesPageContentProps {
  zones: InterventionZone[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function ZonesPageContent({
  zones,
  header,
  siteSettings,
}: ZonesPageContentProps) {
  return (
    <PageMainWrapper variant="teal">
      <div className="relative z-10">
        {/* Header */}
        <PageHeader variant="simple" height="medium">
          <div className="flex max-w-6xl flex-col items-center gap-6">
      
            <Title
              staticText={header?.title.split(" ")[0] || "Zones"}
              animatedText={header?.title.split(" ")[1] || "d'Intervention"}
              subtitle={header?.subtitle || ""}
            />
            <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
              {header?.description || ""}
            </p>
                       
          </div>
        </PageHeader>

        <SectionContainer>
          {/* Stats */}
          <StatsGrid
            stats={[
              {
                value: "50 km",
                label: "Rayon d'Intervention",
                icon: "Map",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                value: "48h",
                label: "Délai de Réponse",
                icon: "Clock",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                value: "100%",
                label: "Proximité Client",
                icon: "Users",
                gradient: "from-orange-500 to-yellow-500",
              },
            ]}
          />

          <div className="relative mb-24 overflow-hidden rounded-3xl bg-white p-12 shadow-xl border border-neutral-100">
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <IntroSection
                title="Un Installateur Local au Plus Proche de Vous"
                description="Basés à Bourg-en-Bresse, nous intervenons dans tout le département de l'Ain pour vous garantir un service de proximité, réactif et de qualité. Notre ancrage local nous permet d'assurer un suivi personnalisé et une maintenance rapide de vos installations."
                className="mb-0"
              />
            </div>
          </div>

          <div className="mb-20">
            <Heading className="mb-12 text-center text-3xl text-neutral-900 md:text-4xl">
              Nos Secteurs d'Intervention
            </Heading>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {zones.map((group, index) => (
                <FeatureCard
                  key={group.id}
                  icon="MapPin"
                  title={group.zone}
                  description=""
                  gradient={group.gradient || "from-blue-500 to-cyan-500"}
                  index={index}
                  className="[&_.feature-card-items]:mt-4"
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {group.communes?.map((commune) => (
                      <Link
                        key={commune.name}
                        href={`/zones-intervention/${slugify(commune.name)}`}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                      >
                        {commune.name}
                      </Link>
                    ))}
                  </div>
                </FeatureCard>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <Heading
              as="h3"
              className="mb-8 text-center text-2xl text-neutral-900 md:text-3xl"
            >
              Également présents dans les départements limitrophes
            </Heading>
            <div className="hidden lg:flex flex-wrap justify-center gap-3">
              {[
                "Saône-et-Loire (71)",
                "Jura (39)",
                "Rhône (69)",
                "Isère (38)",
                "Savoie (73)",
                "Haute-Savoie (74)",
              ].map((dept) => (
                <div
                  key={dept}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <Heading className="mb-12 text-center text-3xl text-neutral-900 md:text-4xl">
              Pourquoi Choisir un Installateur Local ?
            </Heading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Réactivité Maximale",
                  icon: "Zap",
                  description:
                    "Intervention rapide en cas de panne ou de besoin de maintenance.",
                },
                {
                  title: "Connaissance du Terrain",
                  icon: "Map",
                  description:
                    "Maîtrise des spécificités climatiques et administratives locales.",
                },
                {
                  title: "Relation de Confiance",
                  icon: "Heart",
                  description:
                    "Un interlocuteur unique et disponible près de chez vous.",
                },
              ].map((advantage, index) => (
                <FeatureCard
                  key={advantage.title}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                  gradient="from-blue-500 to-cyan-500"
                  index={index}
                />
              ))}
            </div>
          </div>

          <CTASection
            title="Votre Projet Solaire Commence Ici"
            description="Vérifiez si vous êtes dans notre zone d'intervention et demandez votre devis gratuit"
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Demander un devis gratuit",
              href: "/contact#contact-form",
            }}
            secondaryButton={{
              text: "Découvrir nos services",
              href: "/services",
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
