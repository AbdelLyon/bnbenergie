"use client";

import {
  StatsGrid,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  FeatureCard,
  CTASection,
  ServiceStep,
} from "@/components";
import { SectionHeader } from "@/components/shared/layout/SectionWrapper";
import type {
  Service,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";

interface ServicesPageContentProps {
  services: Service[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function ServicesPageContent({
  services,
  header,
  siteSettings,
}: ServicesPageContentProps) {
  const steps = services.slice(0, 5);
  const guarantees = services.slice(5);

  return (
    <PageMainWrapper variant="green">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title.split(" ")[0] || "Nos"}
            animatedText={header?.title.split(" ")[1] || "Services"}
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
            stats={steps.slice(0, 3).map((step) => ({
              value: step.number,
              label: step.title,
              icon: step.icon,
              gradient: "from-blue-500 to-cyan-500",
            }))}
          />

          <div className="mb-16">
            <SectionHeader
              badge="Process"
              title="Notre Processus de Mise en Service"
              subtitle="De l'analyse personnalisée à la mise en service, chaque étape est pensée pour un projet solaire clair, rapide et sans friction."
              className="mb-10"
            />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <ServiceStep
                  key={step.id}
                  title={step.title}
                  subtitle={step.subtitle}
                  description={step.description}
                  items={
                    step.highlights?.map(
                      (h: { text?: string }) => h.text || "",
                    ) || []
                  }
                  duration={step.duration}
                  gradient={step.gradient}
                  isEven={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>

          {guarantees.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                badge="Engagement"
                title="Nos Engagements Qualité"
                subtitle="Un service pensé pour offrir à chaque client une expérience claire, rassurante et durable."
                className="mb-10"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {guarantees.map((service, index) => (
                  <FeatureCard
                    key={service.id}
                    icon={service.icon}
                    iconColor="text-emerald-500"
                    title={service.title}
                    description={service.description}
                    gradient="from-blue-500 to-cyan-500"
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
