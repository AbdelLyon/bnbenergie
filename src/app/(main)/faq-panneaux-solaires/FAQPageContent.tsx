"use client";

import type {
  Faq,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";
import {
  CTASection,
  FAQItem,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatCard,
  Title,
} from "@/components";
import { LazyMotionDiv, LazyMotionP } from "@/components/LazyComponents";

interface FAQPageContentProps {
  faqs: Faq[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

// ------------------- Composant principal -------------------
export default function FAQPageContent({
  faqs,
  header,
  siteSettings,
}: FAQPageContentProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <PageMainWrapper variant="purple">
      <div className="relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <PageHeader variant="simple" height="medium">
          <Title
            staticText={header?.title.split(" ")[0] || "Questions"}
            animatedText={header?.title.split(" ")[1] || "Fréquentes"}
            subtitle={header?.subtitle || ""}
          />

          <LazyMotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
          >
            {header?.description || ""}
          </LazyMotionP>
        </PageHeader>

        <SectionContainer>
          <div className="relative z-20 -mt-20 mb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  value: faqs.length.toString(),
                  label: "Questions",
                  icon: "HelpCircle",
                },
                {
                  value: "100%",
                  label: "Réponses Détaillées",
                  icon: "CheckCircle2",
                },
                { value: "24/7", label: "Support Disponible", icon: "Zap" },
              ].map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* FAQs */}
          <LazyMotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-20"
          >
            <div className="px-2 space-y-3">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category || undefined}
                />
              ))}
            </div>
          </LazyMotionDiv>

          <CTASection
            title="Vous ne trouvez pas votre réponse ?"
            description="Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur votre projet de panneaux solaires."
            phoneNumber={siteSettings.contactPhone || "07 81 25 11 25"}
            primaryButton={{
              text: "Demander mon devis",
              href: "/contact#contact-form",
            }}
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
