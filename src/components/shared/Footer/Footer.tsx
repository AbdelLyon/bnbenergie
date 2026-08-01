import Link from "next/link";
import {
  Award,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sun,
} from "lucide-react";

import { Card, CardBody } from "@/components/shared/ui/Card";
import { Heading } from "@/components/shared/ui/Heading";
import {
  Facebook,
  Instagram,
  Linkedin,
} from "@/components/shared/ui/SocialIcons";
import {
  getInterventionZones,
  getSiteSettings,
} from "@/lib/payload-queries";
import { slugify } from "@/utils/slugify";

const navigationLinks = [
  { label: "Page d'accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Aides & Financement", href: "/aides-financement" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "FAQ", href: "/faq-panneaux-solaires" },
  { label: "Nous contacter", href: "/contact" },
] as const;

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  {
    label: "Politique de confidentialité",
    href: "/politique-confidentialite",
  },
] as const;

const services = [
  "Installation photovoltaïque",
  "Maintenance & SAV",
  "Étude personnalisée",
  "Accompagnement administratif",
] as const;

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactCard({
  icon,
  title,
  children,
}: Readonly<ContactCardProps>) {
  return (
    <Card className="h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] shadow-none backdrop-blur-sm transition-colors duration-300 hover:border-amber-500/25 hover:bg-white/5.5">
      <CardBody className="flex h-full min-h-44 flex-col items-center justify-center px-6 py-7 text-center">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/10 text-amber-400">
          {icon}
        </div>

        <Heading
          as="h3"
          className="mb-2 text-sm font-medium tracking-wide text-neutral-400"
        >
          {title}
        </Heading>

        <div className="flex min-h-14 items-center justify-center text-base font-semibold leading-6 text-white sm:text-lg">
          {children}
        </div>
      </CardBody>
    </Card>
  );
}

interface FooterTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function FooterTitle({
  icon,
  children,
}: Readonly<FooterTitleProps>) {
  return (
    <Heading
      as="h3"
      className="mb-6 flex min-h-7 items-center gap-3 text-base font-semibold text-white"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/15 bg-amber-400/10 text-amber-400">
        {icon}
      </span>

      <span>{children}</span>
    </Heading>
  );
}

export const Footer = async () => {
  const [siteSettings, interventionZones] = await Promise.all([
    getSiteSettings(),
    getInterventionZones(),
  ]);

  const cities = interventionZones
    .flatMap((zone) => zone.communes?.map((commune) => commune.name) ?? [])
    .filter(Boolean)
    .slice(0, 24)
    .sort((firstCity, secondCity) =>
      firstCity.localeCompare(secondCity, "fr"),
    );

  const businessName = siteSettings.businessName || "BNB ÉNERGIE";
  const contactPhone = siteSettings.contactPhone || "0781251125";
  const displayedPhone = siteSettings.contactPhone || "07 81 25 11 25";
  const contactEmail =
    siteSettings.contactEmail || "contact@bnb-energie.fr";

  const displayedAddress = siteSettings.addressStreet
    ? `${siteSettings.addressStreet}, ${siteSettings.addressZip ?? ""} ${
        siteSettings.addressCity ?? ""
      }`.trim()
    : "Bourg-en-Bresse, Ain (01)";

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-neutral-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_38%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10">
              <Sun
                aria-hidden="true"
                className="size-7 text-amber-400"
              />
            </div>

            <Heading
              as="h2"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {businessName}
            </Heading>
          </div>

          <p className="max-w-2xl text-base font-medium leading-7 text-neutral-300 sm:text-lg">
            Votre expert en panneaux solaires photovoltaïques dans l&apos;Ain
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Installation, maintenance et accompagnement pour votre transition
            énergétique
          </p>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          <ContactCard
            icon={<Phone aria-hidden="true" className="size-6" />}
            title="Téléphone"
          >
            <a
              href={`tel:${contactPhone}`}
              className="wrap-break-word transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              {displayedPhone}
            </a>
          </ContactCard>

          <ContactCard
            icon={<Mail aria-hidden="true" className="size-6" />}
            title="E-mail"
          >
            <a
              href={`mailto:${contactEmail}`}
              className="break-all transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              {contactEmail}
            </a>
          </ContactCard>

          <ContactCard
            icon={<MapPin aria-hidden="true" className="size-6" />}
            title="Adresse"
          >
            <span className="max-w-72">{displayedAddress}</span>
          </ContactCard>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-y border-white/8 py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <FooterTitle
              icon={
                <ChevronRight
                  aria-hidden="true"
                  className="size-4"
                />
              }
            >
              Navigation
            </FooterTitle>

            <ul className="grid grid-cols-1 gap-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-sm leading-6 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-neutral-700 transition-colors group-hover:bg-amber-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterTitle
              icon={<Shield aria-hidden="true" className="size-4" />}
            >
              Nos services
            </FooterTitle>

            <ul className="grid grid-cols-1 gap-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-400"
                >
                  <Award
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-amber-400"
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-6">
            <FooterTitle
              icon={<MapPin aria-hidden="true" className="size-4" />}
            >
              Zones d&apos;intervention
            </FooterTitle>

            {cities.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {cities.map((city) => (
                  <Link
                    key={city}
                    href={`/zones-intervention/${slugify(city)}`}
                    className="group flex min-w-0 items-center gap-3 text-sm leading-6 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-neutral-700 transition-colors group-hover:bg-amber-400" />
                    <span className="truncate">{city}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-neutral-500">
                Nos zones d&apos;intervention seront prochainement disponibles.
              </p>
            )}

            <Link
              href="/zones-intervention"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-400 transition-colors hover:border-amber-400/35 hover:bg-amber-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              Voir toutes nos zones
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-7 py-10 md:flex-row">
          <div className="text-center md:text-left">
            <Heading
              as="h3"
              className="text-base font-semibold text-white"
            >
              Suivez-nous
            </Heading>

            <p className="mt-1 text-sm text-neutral-500">
              Retrouvez nos actualités et nos réalisations
            </p>
          </div>

          <div className="flex items-center gap-3">
            {siteSettings.socialFacebook && (
              <a
                href={siteSettings.socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivre BNB Énergie sur Facebook"
                className="group flex size-11 items-center justify-center rounded-xl border border-[#1877F2]/25 bg-[#1877F2]/10 text-[#1877F2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]/60"
              >
                <Facebook
                  aria-hidden="true"
                  className="size-5"
                />
              </a>
            )}

            {siteSettings.socialInstagram && (
              <a
                href={siteSettings.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivre BNB Énergie sur Instagram"
                className="group relative flex size-11 items-center justify-center overflow-hidden rounded-xl border border-[#DD2A7B]/25 bg-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD2A7B]/60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-15 transition-opacity group-hover:opacity-100"
                />

                <Instagram
                  aria-hidden="true"
                  className="relative size-5 text-[#DD2A7B] transition-colors group-hover:text-white"
                />
              </a>
            )}

            {siteSettings.socialLinkedin && (
              <a
                href={siteSettings.socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivre BNB Énergie sur LinkedIn"
                className="group flex size-11 items-center justify-center rounded-xl border border-[#0A66C2]/25 bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60"
              >
                <Linkedin
                  aria-hidden="true"
                  className="size-5"
                />
              </a>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          <p className="text-center text-sm leading-6 text-neutral-500 md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-neutral-300">
              {businessName}
            </span>
            . Tous droits réservés.
          </p>

          <nav
            aria-label="Liens juridiques"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};