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
  WarrantyCard,
  CTASection,
} from "@/components";

import type {
  Warranty,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";

interface GarantiesPageContentProps {
  warranties: {
    certifications: Warranty[];
    products: Warranty[];
    commitments: Warranty[];
    process: Warranty[];
  };
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

export default function GarantiesPageContent({
  warranties,
  header,
  siteSettings,
}: GarantiesPageContentProps) {
  return (
    <PageMainWrapper variant="amber">
      {/* Header */}
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title.split(" ")[0] || "Nos"}
            animatedText={header?.title.split(" ")[1] || "Garanties"}
            subtitle={header?.subtitle || ""}
            seoTitle="Garanties Panneaux Solaires Photovoltaïques — Certification RGE QualiPV & Garantie Décennale | BNB Énergie"
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
                value: "10 ans",
                label: "Garantie Décennale",
                icon: "Shield",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                value: "25 ans",
                label: "Garantie Panneaux",
                icon: "Award",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                value: "RGE",
                label: "Certifié QualiPV",
                icon: "CheckCircle2",
                gradient: "from-orange-500 to-yellow-500",
              },
            ]}
          />

          {/* Introduction avec background amélioré */}
          <div className="relative mb-24 overflow-hidden rounded-3xl bg-white dark:bg-content1 p-12 shadow-xl border border-neutral-100 dark:border-white/5">
            {/* Pattern decoratif subtil */}
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
                title="Des Garanties Complètes pour Votre Sérénité"
                description="Investir dans le solaire, c'est investir pour l'avenir. Chez BNB ÉNERGIE, nous vous offrons une couverture complète avec nos certifications professionnelles, nos garanties décennales et les garanties constructeurs de matériel premium."
                className="mb-0"
              />
            </div>
          </div>

          {/* Certifications */}
          {warranties.certifications.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Nos Certifications Professionnelles
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {warranties.certifications.map((cert, index) => (
                  <FeatureCard
                    key={cert.id}
                    icon={cert.icon}
                    title={cert.title}
                    description={cert.description}
                    gradient={cert.gradient || "from-blue-500 to-cyan-500"}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Garanties Produits */}
          {warranties.products.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Garanties Constructeurs & Matériel
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {warranties.products.map((product, index) => (
                  <WarrantyCard
                    key={product.id}
                    icon={product.icon}
                    title={product.title}
                    description={product.description}
                    gradient={product.gradient || "from-blue-500 to-cyan-500"}
                    warranties={
                      product.warrantyDetails?.map((w) => ({
                        label: w.label,
                        duration: w.duration,
                        description: w.description ?? "",
                      })) || []
                    }
                    features={product.features?.map((f) => f.text) || []}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Engagements */}
          {warranties.commitments.length > 0 && (
            <div className="mb-20">
              <Heading className="mb-12 text-center text-3xl text-neutral-900 dark:text-foreground md:text-4xl">
                Nos Engagements Qualité
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {warranties.commitments.map((commitment, index) => (
                  <FeatureCard
                    key={commitment.id}
                    icon={commitment.icon}
                    title={commitment.title}
                    description={commitment.description}
                    gradient="from-blue-500 to-cyan-500"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call-to-Action */}
          <CTASection
            title="Des Questions sur Nos Garanties ?"
            description="Notre équipe est à votre disposition pour vous expliquer en détail toutes nos garanties et certifications"
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
