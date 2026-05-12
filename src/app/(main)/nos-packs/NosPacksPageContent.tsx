"use client";

import {
  PageHeader,
  PageMainWrapper,
  Title,
  SectionContainer,
  StatsGrid,
  IntroSection,
  CTASection,
} from "@/components";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";
import { ArrowRight, Phone } from "lucide-react";

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
            subtitle={header?.description || ""}
          />

          <CTAGroupButtons
            align="center"
            animated
            items={[
              {
                label: "Devis gratuit",
                href: "/contact#contact-form",
                variant: "default",
                size: "sm",
                iconRight: <ArrowRight className="size-4" />,
                className: "bg-gradient-to-r from-primary to-primary-700",
              },
              {
                label: "07 81 25 11 25",
                href: "tel:0781251125",
                variant: "outline",
                size: "sm",
                iconLeft: <Phone className="size-4" />,
              },
            ]}
          />
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

          <div className="relative mb-24 overflow-hidden rounded-3xl bg-white dark:bg-content1 p-12 shadow-xl border border-neutral-100 dark:border-white/5">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
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
                title="Choisissez le Pack Adapté à Vos Besoins"
                description="Nos packs photovoltaïques sont conçus pour s'adapter à votre consommation énergétique et à votre budget. Installation clé en main avec démarches administratives incluses."
                className="mb-0"
              />
            </div>
          </div>

          {children}

          <CTASection
            title="Prêt à Investir dans l'Énergie Solaire ?"
            description="Demandez votre étude gratuite et recevez votre devis personnalisé sous 48h"
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Obtenir mon devis",
              href: "/contact#contact-form",
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
