"use client";

import {
  StatsGrid,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  Title,
  Heading,
  IntroSection,
  FeatureCard,
  CTASection,
  ServiceStep,
} from "@/components";
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

          <div className="relative mx-auto mb-20 overflow-hidden rounded-3xl bg-white p-12 border border-neutral-100">
            <div className="relative z-10 text-center">
              <IntroSection
                title="Un Accompagnement Complet de A à Z"
                description=""
                className="mb-0 w-full "
              />

              <Heading
                as="h3"
                className="mb-4 text-xl text-neutral-700"
              >
                Notre mission : transformer votre projet solaire en réalité
              </Heading>
              <p className="leading-relaxed text-neutral-500 max-w-2xl mx-auto">
                Chez BNB ÉNERGIE, nous gérons l'intégralité de votre projet
                d'installation de panneaux solaires, de l'étude initiale à la
                maintenance.
              </p>
            </div>
          </div>

          <div className="mb-10 space-y-12">
            {steps.map((step, index) => (
              <ServiceStep
                key={step.id}
                number={step.number}
                icon={step.icon}
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

          {guarantees.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 md:text-4xl">
                Nos Engagements Qualité
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {guarantees.map((service, index) => (
                  <FeatureCard
                    key={service.id}
                    icon={service.icon}
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
