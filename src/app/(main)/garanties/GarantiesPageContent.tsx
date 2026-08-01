"use client";

import {
  Title,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatsGrid,
  FeatureCard,
  WarrantyCard,
  CTASection,
} from "@/components";
import { SectionHeader } from "@/components/shared/layout/SectionWrapper";

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

          {/* Certifications */}
          {warranties.certifications.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                badge="Certifications"
                title="Nos Certifications Professionnelles"
                subtitle="Des engagements concrets pour une installation solaire fiable, durable et sécurisée."
                className="mb-10"
              />
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
              <SectionHeader
                badge="Matériel"
                title="Garanties Constructeurs & Matériel"
                subtitle="Les garanties des fabricants et la qualité des composants qui assurent votre tranquillité."
                className="mb-10"
              />
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
              <SectionHeader
                badge="Engagement"
                title="Nos Engagements Qualité"
                subtitle="Une démarche de service orientée résultat, avec un accompagnement pensé pour chaque projet."
                className="mb-10"
              />
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
