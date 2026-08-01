"use client";

import { useMemo, useState } from "react";

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  StatCard,
  ProjectCard,
  CTASection,
} from "@/components";
import { SectionHeader } from "@/components/shared/layout/SectionWrapper";
import { ReviewsSection } from "@/components/shared/ui/ReviewsSection";

import type {
  Project,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";

const STATS = [
  { value: "100+", label: "Installations Réalisées", icon: "CircleCheck" },
  { value: "15+", label: "Ans d'Expérience", icon: "Award" },
  { value: "100%", label: "Clients Satisfaits", icon: "Star" },
] as const;

const extractKw = (value?: string | number | null): number | null => {
  if (!value) return null;
  if (typeof value === "number") return value;

  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : null;
};

interface RealisationsPageContentProps {
  projects: Project[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function RealisationsPageContent({
  projects,
  header,
  siteSettings,
}: RealisationsPageContentProps) {
  const POWERS = ["all", ...projects.map((project) => project.power)] as const;
  type PowerFilter = (typeof POWERS)[number];

  const [selectedPower, setSelectedPower] = useState<PowerFilter>("all");

  const handleSelectPower = (power: PowerFilter) => {
    setSelectedPower(power);
  };

  const filteredProjects = useMemo(() => {
    if (selectedPower === "all") return projects;

    const selectedKw = extractKw(selectedPower);
    if (!selectedKw) return projects;

    return projects.filter((project) => {
      const projectKw = extractKw(project.power) ?? extractKw(project.power);

      return projectKw === selectedKw;
    });
  }, [projects, selectedPower]);

  return (
    <PageMainWrapper variant="blue">
      <div className="relative z-10">
        <PageHeader variant="simple" height="medium">
          <div className="flex max-w-6xl flex-col items-center gap-6">
            <Title
              staticText={header?.title.split(" ")[0] || "Nos"}
              animatedText={header?.title.split(" ")[1] || "Réalisations"}
              subtitle={header?.subtitle || ""}
            />

            <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
              {header?.description || ""}
            </p>

          </div>
        </PageHeader>

        <SectionContainer>
          <div className="relative z-20 -mt-16 mb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <SectionHeader
              badge="Réalisations"
              title="Nos Projets Photovoltaïques dans l&apos;Ain"
              subtitle="Découvrez quelques-unes de nos installations certifiées RGE QualiPV, classées par puissance."
              className="mb-0"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {POWERS.map((power) => (
              <button
                key={power}
                onClick={() => handleSelectPower(power)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all
                  ${
                    selectedPower === power
                      ? "bg-primary text-white"
                      : "bg-neutral-200 hover:bg-neutral-200"
                  }`}
              >
                {power === "all" ? "Tous les projets" : power}
              </button>
            ))}
          </div>

          <section className="mb-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  page="Realisations"
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <p className="mt-16 text-center text-neutral-500">
                Aucun projet disponible pour cette puissance.
              </p>
            )}
          </section>
          <section className="mb-12">
            <ReviewsSection
              title="Ce Que Disent Nos Clients"
              subtitle="Découvrez les avis de nos clients satisfaits dans l'Ain"
              showStats={true}
              autoPlay={true}
              autoPlayInterval={10000}
            />
          </section>

          <CTASection
            title="Prêt à passer au solaire ?"
            description="Demandez votre devis gratuit et personnalisé. Réponse sous 48h."
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Obtenir mon devis",
              href: "/contact#contact-form",
            }}
            variant="minimal"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
