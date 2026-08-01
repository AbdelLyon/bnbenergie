"use client";

import {
  AidCard,
  CTASection,
  FeatureCard,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
} from "@/components";
import { SectionHeader } from "@/components/shared/layout/SectionWrapper";
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

          {/* Aides principales */}
          {aids.main.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                badge="Aides"
                title="Les Principales Aides Disponibles"
                subtitle="Les dispositifs d’aide pour réduire le coût de votre installation solaire et accélérer votre retour sur investissement."
                className="mb-10"
              />
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
              <SectionHeader
                badge="Local"
                title="Aides Locales & Complémentaires"
                subtitle="Des financements territoriaux et des aides additionnelles pour compléter votre projet solaire."
                className="mb-10"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.local.map((aid, index) => (
                  <FeatureCard
                    key={aid.id}
                    icon={aid.icon || "MapPin"}
                    title={aid.title}
                    description={aid.description}
                    gradient="from-green-500 to-emerald-500"
                    index={index}
                    iconColor="text-amber-500"
                  />
                ))}
              </div>
            </div>
          )}

          {aids.financing.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                badge="Financement"
                title="Solutions de Financement"
                subtitle="Comparez les options de financement pour rendre votre projet solaire encore plus accessible."
                className="mb-10"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {aids.financing.map((option, index) => (
                  <FeatureCard
                    key={option.id}
                    icon={option.icon || "CreditCard"}
                    title={option.title}
                    description={option.description || ""}
                      iconColor="text-primary"
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
            title="Prêt à passer au solaire ?"
            description="Demandez votre devis gratuit et personnalisé. Réponse sous 48h."
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Obtenir mon devis gratuit",
              href: "/contact#contact-form",
            }}
            variant="minimal"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
