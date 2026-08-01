"use client";

import {
  PageHeader,
  PageMainWrapper,
  Title,
  SectionContainer,
  StatsGrid,
  CTASection,
} from "@/components";
import { SectionHeader } from "@/components/shared/layout/SectionWrapper";

import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";
import { ReactNode } from "react";

interface NosPacksPageContentProps {
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
  children: ReactNode;
}

export default function NosPacksPageContent({
  header,
  siteSettings,
  children,
}: NosPacksPageContentProps) {
  return (
    <PageMainWrapper variant="blue">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title?.split(" ")[0] || "Nos"}
            animatedText={header?.title?.split(" ")[1] || "Packs"}
            subtitle={
              header?.subtitle || "Des Solutions Adaptées à Vos Besoins"
            }
          />
          <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
            {header?.description ||
              "Découvrez nos packs d'installation de panneaux solaires personnalisés pour répondre à tous vos besoins énergétiques dans l'Ain. Tarifs transparents, garanties incluses et accompagnement personnalisé."}
          </p>

     
        </div>
      </PageHeader>

      <div className="relative z-10">
        <SectionContainer>
          <StatsGrid
            stats={[
              {
                value: "Pack 3 kWc",
                label: "Budget Maîtrisé",
                icon: "Zap",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                value: "Pack 6 kWc",
                label: "Maison Familiale",
                icon: "Home",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                value: "Pack 9 kWc",
                label: "Performance Max",
                icon: "TrendingUp",
                gradient: "from-orange-500 to-yellow-500",
              },
            ]}
          />

          <SectionHeader
            badge="Packs"
            title="Choisissez le pack solaire adapté à votre projet"
            subtitle="Des solutions claires, professionnelles et pensées pour un retour sur investissement durable."
            className="mb-10"
          />

          {children}

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
