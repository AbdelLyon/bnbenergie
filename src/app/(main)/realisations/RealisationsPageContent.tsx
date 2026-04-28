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
import { ReviewsSection } from "@/components/shared/ui/ReviewsSection";

import type {
  Project,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";
import { LazyMotionDiv, LazyMotionP } from "@/components/LazyComponents";

/* =========================================================
   CONSTANTES
========================================================= */

const STATS = [
  { value: "100+", label: "Installations Réalisées", icon: "CircleCheck" },
  { value: "15+", label: "Ans d'Expérience", icon: "Award" },
  { value: "100%", label: "Clients Satisfaits", icon: "Star" },
] as const;

/* =========================================================
   HELPERS
========================================================= */

const extractKw = (value?: string | number | null): number | null => {
  if (!value) return null;
  if (typeof value === "number") return value;

  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : null;
};

/* =========================================================
   TYPES
========================================================= */

interface RealisationsPageContentProps {
  projects: Project[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function RealisationsPageContent({
  projects,
  header,
  siteSettings,
}: RealisationsPageContentProps) {
  const POWERS = ["all", ...projects.map((project) => project.power)] as const;
  type PowerFilter = (typeof POWERS)[number];

  const [selectedPower, setSelectedPower] = useState<PowerFilter>("all");

  /* ------------------ FILTER HANDLER ------------------ */
  const handleSelectPower = (power: PowerFilter) => {
    setSelectedPower(power);
  };

  /* ------------------ FILTERED PROJECTS ------------------ */
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
        {/* ================= HEADER ================= */}
        <PageHeader variant="simple" height="medium">
          <Title
            staticText={header?.title.split(" ")[0] || "Nos"}
            animatedText={header?.title.split(" ")[1] || "Réalisations"}
            subtitle={header?.subtitle || ""}
          />

          <LazyMotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="max-w-4xl px-4 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            {header?.description || ""}
          </LazyMotionP>
        </PageHeader>

        <SectionContainer>
          {/* ================= STATS ================= */}
          <div className="relative z-20 -mt-20 mb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>

          {/* ================= INTRO ================= */}
          <LazyMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Nos Projets Photovoltaïques dans l&apos;Ain
            </h2>
            <p className="text-lg text-neutral-600 dark:text-default-500">
              Découvrez quelques-unes de nos installations certifiées RGE
              QualiPV, classées par puissance.
            </p>
          </LazyMotionDiv>

          {/* ================= FILTER ================= */}
          <div className="mb-6 flex flex-wrap gap-3">
            {POWERS.map((power) => (
              <button
                key={power}
                onClick={() => handleSelectPower(power)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all
                  ${
                    selectedPower === power
                      ? "bg-primary text-white"
                      : "bg-neutral-200 hover:bg-neutral-200 dark:bg-content1"
                  }`}
              >
                {power === "all" ? "Tous les projets" : power}
              </button>
            ))}
          </div>

          <section className="mx-auto max-w-7xl mb-12">
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
            title="Prêt à Passer à l'Énergie Solaire ?"
            description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Obtenir un devis",
              href: "/contact#contact-form",
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
