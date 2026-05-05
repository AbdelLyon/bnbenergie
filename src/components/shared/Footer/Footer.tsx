import {
  Phone,
  Mail,
  MapPin,
  Sun,
  Shield,
  Award,
  ChevronRight,
} from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
} from "@/components/shared/ui/SocialIcons";
import Link from "next/link";
import { Heading } from "@/components/shared/ui/Heading";
import { slugify } from "@/utils/slugify";
import { getSiteSettings, getInterventionZones } from "@/lib/payload-queries";

export const Footer = async () => {
  const [siteSettings, interventionZones] = await Promise.all([
    getSiteSettings(),
    getInterventionZones(),
  ]);

  const cities = interventionZones
    .flatMap((zone) => zone.communes?.map((c) => c.name) || [])
    .slice(0, 24)
    .sort();

  const navigationLinks = [
    { label: "Page d'accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Aides & Financement", href: "/aides-financement" },
    { label: "Zones d'intervention", href: "/zones-intervention" },
    { label: "FAQ", href: "/faq-panneaux-solaires" },
    { label: "Nous contacter", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Mentions légales", href: "/mentions-legales" },
    {
      label: "Politique de confidentialité",
      href: "/politique-confidentialite",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-default-50 to-default-100 dark:from-background dark:to-default-50">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-xl" />
              <Sun className="relative h-12 w-12 text-amber-500 dark:text-amber-400" />
            </div>
            <Heading className="text-3xl text-foreground font-black">
              {siteSettings.businessName || "BNB ÉNERGIE"}
            </Heading>
          </div>
          <p className="mx-auto max-w-2xl text-lg font-medium text-default-700">
            Votre expert en panneaux solaires photovoltaïques dans l&apos;Ain
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-default-500">
            Installation, maintenance et accompagnement pour votre transition
            énergétique
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-secondary/20 bg-content1 transition-all duration-300 hover:-translate-y-1">
            <div className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <Phone size={28} className="text-white" />
              </div>
              <Heading as="h3" className="mb-2 text-sm text-default-500">
                Téléphone
              </Heading>
              <a
                href={`tel:${siteSettings.contactPhone || "0781251125"}`}
                className="text-lg font-semibold text-foreground transition-colors hover:text-secondary"
              >
                {siteSettings.contactPhone || "07 81 25 11 25"}
              </a>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-secondary/20 bg-content1 transition-all duration-300 hover:-translate-y-1">
            <div className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <Mail size={28} className="text-white" />
              </div>
              <Heading as="h3" className="mb-2 text-sm text-default-500">
                Email
              </Heading>
              <Link
                href={`mailto:${
                  siteSettings.contactEmail || "contact@bnb-energie.fr"
                }`}
                className="text-lg font-semibold text-foreground transition-colors hover:text-secondary"
              >
                {siteSettings.contactEmail || "contact@bnb-energie.fr"}
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-secondary/20 bg-content1 transition-all duration-300 hover:-translate-y-1">
            <div className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <MapPin size={28} className="text-white" />
              </div>
              <Heading as="h3" className="mb-2 text-sm text-default-500">
                Adresse
              </Heading>
              <p className="text-center text-lg font-semibold text-foreground">
                {siteSettings.addressStreet
                  ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
                  : "Bourg-en-Bresse, Ain (01)"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Heading
              as="h3"
              className="mb-6 flex items-center gap-2 text-lg text-foreground"
            >
              <ChevronRight className="h-5 w-5 text-amber-500" />
              Navigation
            </Heading>
            <ul className="space-y-3 flex flex-col">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-default-600 transition-colors hover:text-secondary"
                  >
                    <span className="mr-2 size-1 rounded-full bg-amber-500 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading
              as="h3"
              className="mb-6 flex items-center gap-2 text-lg text-foreground"
            >
              <Shield className="h-5 w-5 text-amber-500" />
              Nos Services
            </Heading>
            <ul className="space-y-3 text-default-600">
              <li className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Installation photovoltaïque</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Maintenance & SAV</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Étude personnalisée</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Accompagnement administratif</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Heading
              as="h3"
              className="mb-6 flex items-center gap-2 text-lg text-foreground"
            >
              <MapPin className="h-5 w-5 text-amber-500" />
              Zones d&apos;Intervention
            </Heading>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
              {cities.map((city, index) => (
                <Link
                  key={`${city}-${index}`}
                  href={`/zones-intervention/${slugify(city)}`}
                  className="flex items-center gap-2 text-default-500 transition-colors hover:text-secondary"
                >
                  <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />
                  {city}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/zones-intervention"
                className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                Voir toutes nos zones →
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-6">
          <Heading as="h3" className="text-lg text-foreground">
            Suivez-nous
          </Heading>
          <div className="flex gap-4">
            {siteSettings.socialFacebook && (
              <a
                href={siteSettings.socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-default-100 p-3 shadow-small transition-all duration-300 hover:-translate-y-1 hover:shadow-medium hover:shadow-primary/20"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Facebook className="relative h-6 w-6 text-default-600 transition-colors group-hover:text-white" />
              </a>
            )}
            {siteSettings.socialInstagram && (
              <a
                href={siteSettings.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-default-100 p-3 shadow-small transition-all duration-300 hover:-translate-y-1 hover:shadow-medium hover:shadow-pink-500/20"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Instagram className="relative h-6 w-6 text-default-600 transition-colors group-hover:text-white" />
              </a>
            )}
            {siteSettings.socialLinkedin && (
              <a
                href={siteSettings.socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-default-100 p-3 shadow-small transition-all duration-300 hover:-translate-y-1 hover:shadow-medium hover:shadow-primary/20"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-600 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Linkedin className="relative h-6 w-6 text-default-600 transition-colors group-hover:text-white" />
              </a>
            )}
          </div>
        </div>

        <div className="mb-8 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-default-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">
              {siteSettings.businessName || "BNB ÉNERGIE"}
            </span>{" "}
            - Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-default-500 transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-default-300" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
