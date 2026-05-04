"use client";

import {
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  CTASection,
  FeatureCard,
  StatsGrid,
  Title,
  Heading,
  HomeHeaderCTAButtons,
} from "@/components";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { getCityTheme } from "@/config/city-themes";
import { MapPin, Award, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CityPageContentProps } from "./types";
import { ZONE_ACCENT, ZONE_BADGE_BG, PROCESS_STEPS } from "./constants";
import { SolarDetailCard } from "./SolarDetailCard";

export default function CityPageContent({
  cityName,
  zoneName,
  siteSettings,
  relatedCities = [],
}: CityPageContentProps) {
  const { zone, tagline, paragraphs } = getCityTheme(cityName, zoneName);

  const accentClass = ZONE_ACCENT[zone.key] ?? "from-amber-400 to-orange-500";
  const badgeClass =
    ZONE_BADGE_BG[zone.key] ??
    "bg-amber-500/20 text-amber-300 border-amber-500/30";

  const phone = siteSettings.contactPhone ?? "07 81 25 11 25";
  const phoneHref = `tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`;
  const unsplashUrl = `https://images.unsplash.com/${zone.unsplashId}?auto=format&fit=crop&w=1920&q=85`;

  return (
    <PageMainWrapper variant="teal">
      <PageHeader
        variant="carousel"
        height="medium"
        images={[unsplashUrl]}
        imageAlts={[zone.imageAlt]}
        currentSlide={0}
        backgroundVariant="clean"
      >
        <div className="flex max-w-6xl flex-col items-center gap-6">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${badgeClass}`}
          >
            <MapPin className="h-3 w-3" />
            {zone.label}
          </span>

         <Title staticText="SOLAIRE" animatedText={cityName} subtitle={tagline} />

          <HomeHeaderCTAButtons
            primaryText={`Devis gratuit à ${cityName}`}
            primaryHref="/contact#contact-form"
            secondaryText={phone}
            secondaryHref={phoneHref}
            primaryClassName={`group relative overflow-hidden rounded-full bg-linear-to-r ${accentClass} px-6 py-4.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:px-7 sm:text-base`}
          />
        </div>
      </PageHeader>


      <div className="relative z-10">
        <SectionContainer>

          <StatsGrid
            stats={[
              {
                value: `${zone.solarScore}/5`,
                label: `Score solaire · ${zone.label}`,
                icon: "Sun",
                gradient: accentClass,
              },
              {
                value: zone.annualProduction,
                label: "Production estimée (6 kWc)",
                icon: "Zap",
                gradient: accentClass,
              },
              {
                value: `${zone.roiMin}–${zone.roiMax} ans`,
                label: "Retour sur investissement",
                icon: "TrendingUp",
                gradient: accentClass,
              },
            ]}
          />


          <SolarDetailCard zone={zone} cityName={cityName} />

          <div className="mb-20 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            <div className="lg:col-span-3">
              <div>
                <Heading className="text-3xl md:text-4xl text-neutral-900 dark:text-foreground mb-6">
                  Installation solaire à{" "}
                  <span
                    className={`bg-linear-to-r ${accentClass} bg-clip-text text-transparent`}
                  >
                    {cityName}
                  </span>
                </Heading>
                <div className="space-y-5 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-5">
                Pourquoi BNB ÉNERGIE à {cityName}
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <MapPin className="h-4 w-4 shrink-0" />,
                    title: "Installateur local",
                    text: `Basés à Bourg-en-Bresse, nous intervenons rapidement à ${cityName} sans surcoût de déplacement.`,
                  },
                  {
                    icon: <Award className="h-4 w-4 shrink-0" />,
                    title: "Certification RGE QualiPV",
                    text: "Certification nationale garantissant votre éligibilité à toutes les aides de l'État.",
                  },
                  {
                    icon: <CheckCircle2 className="h-4 w-4 shrink-0" />,
                    title: "Garantie décennale",
                    text: "10 ans de garantie sur la pose. Panneaux garantis 25 ans par le fabricant.",
                  },
                  {
                    icon: <Phone className="h-4 w-4 shrink-0" />,
                    title: "SAV réactif",
                    text: "Un interlocuteur unique, disponible pour toute question ou intervention après-vente.",
                  },
                ].map(({ icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${accentClass} text-white`}
                    >
                      {icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-foreground">
                        {title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                Spécificités locales
              </p>
              <Heading className="text-3xl md:text-4xl text-neutral-900 dark:text-foreground">
                Atouts de la zone{" "}
                <span
                  className={`bg-linear-to-r ${accentClass} bg-clip-text text-transparent`}
                >
                  {zone.label}
                </span>
              </Heading>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {zone.advantages.map((adv, i) => (
                <FeatureCard
                  key={adv.title}
                  icon={adv.icon}
                  title={adv.title}
                  description={adv.text}
                  gradient={accentClass}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ── Processus 4 étapes ── */}
          <div className="mb-20 rounded-3xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r" />
            <div className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2 text-center">
                Comment ça marche
              </p>
              <Heading className="text-2xl md:text-3xl text-center text-neutral-900 dark:text-foreground mb-10">
                Votre installation solaire à {cityName} en 4 étapes
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROCESS_STEPS.map(
                  ({ icon: Icon, number, title, text, duration }, i) => (
                    <LazyMotionDiv
                      key={number}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0 }}
                      className="relative flex flex-col gap-3"
                    >
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="hidden lg:block absolute top-5 left-[calc(100%-0.5rem)] w-full h-px bg-neutral-200 dark:bg-white/10 z-0" />
                      )}
                      <div className="relative z-10 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${accentClass} text-white shadow-md`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-3xl font-black text-neutral-100 dark:text-white/5 select-none leading-none">
                          {number}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-foreground text-sm mb-1">
                          {title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {text}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-full bg-linear-to-r ${accentClass} px-2.5 py-0.5 text-[11px] font-semibold text-white`}
                        >
                          {duration}
                        </span>
                      </div>
                    </LazyMotionDiv>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ── Liens contextuels ── */}
          <div className="mb-12 hidden lg:flex flex-wrap justify-center gap-3 text-sm">
            {[
              {
                href: "/services",
                label: "Nos services d'installation",
                color:
                  "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40",
              },
              {
                href: "/nos-packs",
                label: "Tarifs & packs solaires",
                color:
                  "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40",
              },
              {
                href: "/aides-financement",
                label: "Aides & financement 2026",
                color:
                  "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40",
              },
              {
                href: "/garanties",
                label: "Nos garanties RGE",
                color:
                  "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40",
              },
            ].map(({ href, label, color }) => (
              <Link
                key={href ?? label}
                href={href ?? "#"}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-medium transition-all ${color}`}
              >
                {label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>

          {/* ── Villes voisines ── */}
          {relatedCities.length > 0 && (
            <div className="mb-20 rounded-2xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-neutral-400" />
                <Heading className="text-lg text-neutral-900 dark:text-foreground">
                  Communes voisines desservies
                </Heading>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedCities.map((city) => (
                  <Link
                    key={city.slug ?? city.name}
                    href={`/zones-intervention/${city.slug}`}
                    className="rounded-lg border border-neutral-200 dark:border-divider bg-neutral-50 dark:bg-content2 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-default-600 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-content3"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-center text-xs text-neutral-400 dark:text-neutral-500">
                <Link
                  href="/zones-intervention"
                  className="font-medium hover:text-amber-600 dark:hover:text-amber-400 hover:underline"
                >
                  Voir toutes nos zones d&apos;intervention →
                </Link>
              </p>
            </div>
          )}


          <CTASection
            title={`Votre projet solaire à ${cityName}`}
            description={`Étude gratuite et sans engagement. Nous nous déplaçons à ${cityName} pour analyser votre toiture et vous proposer la solution la plus rentable.`}
            phoneNumber={phone}
            primaryButton={{
              text: "Demander mon devis gratuit",
              href: "/contact#contact-form",
            }}
            secondaryButton={{ text: "Nos garanties RGE", href: "/garanties" }}
            variant="gradient"
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
