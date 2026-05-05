"use client";

import {
  AidCard,
  CTASection,
  FeatureCard,
  IntroSection,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  Heading,
} from "@/components";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";
import { ArrowRight, Phone } from "lucide-react";
import { StatsGrid } from "@/components/shared/ui/StatsGrid";
import type {
  FinancialAid,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";

interface AidesPageContentProps {
  aids: {
    main: FinancialAid[];
    local: FinancialAid[];
    financing: FinancialAid[];
    roi: FinancialAid[];
  };
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function AidesPageContent({
  aids,
  header,
  siteSettings,
}: AidesPageContentProps) {
  return (
    <PageMainWrapper variant="purple">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title.split(" ")[0] || "Aides"}
            animatedText={header?.title.split(" ")[1] || "Financement"}
            subtitle={header?.subtitle || ""}
          />
          <p className="px-4 text-base font-normal text-white/80 lg:text-lg">
            {header?.description || ""}
          </p>

          <CTAGroupButtons
            align="center"
            animated
            items={[
              {
                label: "Devis gratuit",
                href: "/contact#contact-form",
                variant: "default",
                size: "lg",
                iconRight: <ArrowRight className="size-4" />,
              },
              {
                label: "07 81 25 11 25",
                href: "tel:0781251125",
                variant: "outline",
                size: "lg",
                iconLeft: <Phone className="size-4" />,
              },
            ]}
          />
        </div>
      </PageHeader>

      <div className="relative z-10">
        <SectionContainer>
          {/* Stats */}
          <StatsGrid
            stats={[
              {
                value: "80 €/kWc",
                label: "Prime Autoconsommation 2026",
                icon: "DollarSign",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                value: "TVA 5,5 %",
                label: "Taux réduit sous conditions",
                icon: "TrendingUp",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                value: "Jusqu'à 70 %",
                label: "Économies sur votre facture",
                icon: "PiggyBank",
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
                title="Des Aides Attractives pour Votre Transition Énergétique en 2026"
                description="En 2026, l'État français maintient des dispositifs d'aide pour l'installation de panneaux solaires : prime à l'autoconsommation (80 €/kWc), TVA réduite à 5,5 % sous conditions, éco-PTZ jusqu'à 50 000 € et tarif de rachat du surplus garanti 20 ans. BNB ÉNERGIE, certifié RGE QualiPV, vous accompagne dans toutes les démarches administratives pour obtenir ces aides."
                className="mb-0"
              />
            </div>
          </div>

          {/* Aides principales */}
          {aids.main.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Les Principales Aides Disponibles
              </Heading>
              <div className="space-y-8">
                {aids.main.map((aid, index) => (
                  <AidCard
                    key={aid.id}
                    icon={aid.icon}
                    badge={aid.badge || ""}
                    title={aid.title}
                    subtitle={aid.subtitle || ""}
                    description={aid.description}
                    gradient={aid.gradient || "from-green-500 to-emerald-500"}
                    conditions={
                      aid.conditions?.map(
                        (c: { text?: string }) => c.text ?? "",
                      ) || []
                    }
                    amounts={
                      aid.amounts?.map((a) => ({
                        power: a.power,
                        amount: a.amount,
                        example: a.example || undefined,
                        bestFor: a.bestFor || undefined,
                      })) || []
                    }
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {aids.local.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Aides Locales & Complémentaires
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.local.map((aid, index) => (
                  <FeatureCard
                    key={aid.id}
                    icon={aid.icon || "MapPin"}
                    title={aid.title}
                    description={aid.description}
                    gradient="from-green-500 to-emerald-500"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {aids.financing.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Solutions de Financement
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.financing.map((option, index) => (
                  <FeatureCard
                    key={option.id}
                    icon={option.icon || "CreditCard"}
                    title={option.title}
                    description={option.description || ""}
                    items={
                      option.features?.map(
                        (f: { text?: string }) => f.text || "",
                      ) || []
                    }
                    gradient="from-purple-500 to-indigo-500"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          <CTASection
            title="Calculez Vos Aides et Économies"
            description="Demandez votre étude personnalisée gratuite et découvrez combien vous pouvez économiser"
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Demander mon devis",
              href: "/contact#contact-form",
            }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
