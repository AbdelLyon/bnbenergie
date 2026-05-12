"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import type {
  Faq,
  PageHeader as PageHeaderType,
  SiteSetting,
} from "@/payload-types";
import {
  CTASection,
  FAQItem,
  Heading,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatCard,
  Title,
} from "@/components";
import { CTAGroupButtons } from "@/components/shared/ui/CTAGroupButtons";
import { getLucideIcon } from "@/utils/getLucideIcon";

interface FAQPageContentProps {
  faqs: Faq[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

type CategoryMeta = {
  icon: string;
  gradient: string;
  labelColor: string;
  labelColorDark: string;
  ringColor: string;
  description: string;
};

const CATEGORY_ORDER = [
  "Aides & Financement",
  "Prix & Rentabilité",
  "Technique",
  "Démarches & Installation",
];

const DEFAULT_OPEN = "Aides & Financement";

const categoryMeta: Record<string, CategoryMeta> = {
  "Aides & Financement": {
    icon: "Banknote",
    gradient: "from-emerald-500 to-green-600",
    labelColor: "text-emerald-700",
    labelColorDark: "dark:text-emerald-300",
    ringColor: "ring-emerald-200 dark:ring-emerald-800/50",
    description: "Primes, TVA 5,5 %, éco-PTZ et aides régionales 2026",
  },
  "Prix & Rentabilité": {
    icon: "TrendingUp",
    gradient: "from-amber-400 to-orange-500",
    labelColor: "text-amber-700",
    labelColorDark: "dark:text-amber-300",
    ringColor: "ring-amber-200 dark:ring-amber-800/50",
    description: "Tarifs, retour sur investissement et économies",
  },
  Technique: {
    icon: "Cpu",
    gradient: "from-blue-500 to-indigo-600",
    labelColor: "text-blue-700",
    labelColorDark: "dark:text-blue-300",
    ringColor: "ring-blue-200 dark:ring-blue-800/50",
    description: "Installation, matériel et fonctionnement des panneaux",
  },
  "Démarches & Installation": {
    icon: "ClipboardList",
    gradient: "from-violet-500 to-purple-600",
    labelColor: "text-violet-700",
    labelColorDark: "dark:text-violet-300",
    ringColor: "ring-violet-200 dark:ring-violet-800/50",
    description: "Administratif, délais et processus BNB ÉNERGIE",
  },
};

const defaultMeta: CategoryMeta = {
  icon: "HelpCircle",
  gradient: "from-primary-500 to-primary-600",
  labelColor: "text-primary-700",
  labelColorDark: "dark:text-primary-300",
  ringColor: "ring-neutral-200 dark:ring-white/10",
  description: "",
};

export default function FAQPageContent({
  faqs,
  header,
  siteSettings,
}: FAQPageContentProps) {
  const [openCategory, setOpenCategory] = useState<string>(DEFAULT_OPEN);

  const grouped: { category: string; items: Faq[] }[] = [];
  for (const cat of CATEGORY_ORDER) {
    const items = faqs.filter((f) => f.category === cat);
    if (items.length > 0) grouped.push({ category: cat, items });
  }
  const others = faqs.filter(
    (f) => !f.category || !CATEGORY_ORDER.includes(f.category),
  );
  if (others.length > 0) grouped.push({ category: "Général", items: others });

  return (
    <PageMainWrapper variant="purple">
      <PageHeader variant="simple" height="medium">
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <Title
            staticText={header?.title.split(" ")[0] || "Questions"}
            animatedText={header?.title.split(" ")[1] || "Fréquentes"}
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
                className: "bg-gradient-to-br from-primary-200 to-cyan-500",
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
      <div id="faq-section" className="relative z-10 -mt-24 pb-24">
        <SectionContainer>
          <div className="relative z-20 -mt-20 mb-16">
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

          {/* Accordéons par catégorie */}
          <div className="mb-20 space-y-4">
            {grouped.map(({ category, items }) => {
              const meta = categoryMeta[category] ?? defaultMeta;
              const HeaderIcon = getLucideIcon(meta.icon);
              const isOpen = openCategory === category;

              return (
                <div
                  key={category}
                  className={`rounded-xl border bg-white dark:bg-content1 overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? `shadow-lg ring-1 ${meta.ringColor} border-transparent`
                      : `shadow-sm border-neutral-100/50 dark:border-white/10 hover:shadow-md hover:border-neutral-200/75 dark:hover:border-white/20`
                  }`}
                >
                  {/* Bouton accordéon — en-tête catégorie */}
                  <button
                    onClick={() => setOpenCategory(isOpen ? "" : category)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    {/* Icône */}
                    <div
                      className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center bg-linear-to-br ${meta.gradient} shadow-md transition-transform duration-200 group-hover:scale-105`}
                    >
                      <HeaderIcon className="h-6 w-6 text-white" />
                    </div>

                    {/* Titre + description */}
                    <div className="flex-1 min-w-0">
                      <Heading
                        className={`text-base font-semibold md:text-lg ${meta.labelColor} ${meta.labelColorDark}`}
                      >
                        {category}
                      </Heading>
                      {meta.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                          {meta.description}
                        </p>
                      )}
                    </div>

                    {/* Badge + chevron */}
                    <div className="shrink-0 flex items-center gap-3">
                      <span
                        className={`hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full bg-linear-to-br ${meta.gradient} text-white shadow-sm`}
                      >
                        {items.length} question{items.length > 1 ? "s" : ""}
                      </span>
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? `bg-linear-to-br ${meta.gradient} shadow-sm`
                            : "bg-neutral-100 dark:bg-white/10"
                        }`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-white"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Contenu accordéon */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-[9999px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 space-y-3 border-t border-neutral-100 dark:border-white/5 pt-4">
                      {items.map((faq) => (
                        <FAQItem
                          key={faq.id}
                          question={faq.question}
                          answer={faq.answer}
                          category={faq.category || undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
