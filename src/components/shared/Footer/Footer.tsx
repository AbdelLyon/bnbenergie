import { Card, CardBody } from '@heroui/card';
import {
  Phone,
  Mail,
  MapPin,
  Sun,
  Shield,
  Award,
  ChevronRight,
} from 'lucide-react';
import {
  Facebook,
  Instagram,
  Linkedin,
} from '@/components/shared/ui/SocialIcons';
import Link from 'next/link';
import { getSiteSettings, getInterventionZones } from '@/lib/payload-queries';

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
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'Aides & Financement', href: '/aides-financement' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Mentions légales', href: '/mentions-legales' },
    {
      label: 'Politique de confidentialité',
      href: '/politique-confidentialite',
    },
  ];

  return (
    <footer className="relative  overflow-hidden bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-blue-500/5 dark:from-amber-500/10 dark:via-transparent dark:to-blue-500/10" />

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-amber-500/20 blur-xl" />
              <Sun className="relative h-12 w-12 text-amber-500 dark:text-amber-400" />
            </div>
            <h2 className="bg-linear-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-3xl font-bold text-transparent">
              {siteSettings.businessName || 'BNB ÉNERGIE'}
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Votre expert en panneaux solaires photovoltaïques dans l&apos;Ain
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600 dark:text-neutral-400">
            Installation, maintenance et accompagnement pour votre transition
            énergétique
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="group relative overflow-hidden rounded-2xl border border-amber-500/30 dark:border-amber-500/10 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1">
            <CardBody className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Téléphone
              </h3>
              <a
                href={`tel:${siteSettings.contactPhone || '0781251125'}`}
                className="text-lg font-semibold text-neutral-900 dark:text-white transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                {siteSettings.contactPhone || '07 81 25 11 25'}
              </a>
            </CardBody>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-amber-500/30 dark:border-amber-500/10 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1">
            <CardBody className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Email
              </h3>
              <a
                href={`mailto:${siteSettings.contactEmail || 'contact@bnb-energie.fr'}`}
                className="text-lg font-semibold text-neutral-900 dark:text-white transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                {siteSettings.contactEmail || 'contact@bnb-energie.fr'}
              </a>
            </CardBody>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-amber-500/30 dark:border-amber-500/10 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1">
            <CardBody className="relative flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-linear-to-br from-amber-500 to-amber-600 p-4 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Adresse
              </h3>
              <p className="text-center text-lg font-semibold text-neutral-900 dark:text-white">
                {siteSettings.addressStreet
                  ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
                  : 'Bourg-en-Bresse, Ain (01)'}
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white">
              <ChevronRight className="h-5 w-5 text-amber-500" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-neutral-700 dark:text-neutral-300 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white">
              <Shield className="h-5 w-5 text-amber-500" />
              Nos Services
            </h3>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
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
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white">
              <MapPin className="h-5 w-5 text-amber-500" />
              Zones d&apos;Intervention
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400 md:grid-cols-3">
              {cities.map((city, index) => (
                <p
                  key={`${city}-${index}`}
                  className="flex items-center gap-2 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <span className="h-1 w-1 rounded-full bg-amber-500" />
                  {city}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-6">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Suivez-nous
          </h3>
          <div className="flex gap-4">
            {siteSettings.socialFacebook && (
              <a
                href={siteSettings.socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Facebook className="relative h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors group-hover:text-white" />
              </a>
            )}
            {siteSettings.socialInstagram && (
              <a
                href={siteSettings.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Instagram className="relative h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors group-hover:text-white" />
              </a>
            )}
            {siteSettings.socialLinkedin && (
              <a
                href={siteSettings.socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-600 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Linkedin className="relative h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors group-hover:text-white" />
              </a>
            )}
          </div>
        </div>

        <div className="mb-8 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {siteSettings.businessName || 'BNB ÉNERGIE'}
            </span>{' '}
            - Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-neutral-600 dark:text-neutral-400 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
