import { Card, CardBody } from '@heroui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  getSiteSettings,
  getInterventionZones,
} from '@/app/_lib/payload-queries';

const Footer = async () => {
  const [siteSettings, interventionZones] = await Promise.all([
    getSiteSettings(),
    getInterventionZones(),
  ]);

  // Extraire les villes de toutes les zones (limité à 30 pour ne pas surcharger)
  const cities = interventionZones
    .flatMap((zone) => zone.communes?.map((c) => c.name) || [])
    .slice(0, 30)
    .sort();

  return (
    <footer className="mt-20 bg-neutral-900 py-10 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-6 font-bold">
          Votre expert en panneaux solaires dans l&apos;Ain
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-8">
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <Phone size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">Téléphone</h3>
              <p className="text-sm text-white/90">
                {siteSettings.contact?.phone || '07 81 25 11 25'}
              </p>
            </CardBody>
          </Card>
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <Mail size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">Email</h3>
              <a
                href={`mailto:${siteSettings.contact?.email || 'contact@bnb-energie.fr'}`}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {siteSettings.contact?.email || 'contact@bnb-energie.fr'}
              </a>
            </CardBody>
          </Card>
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <MapPin size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">Adresse</h3>
              <p className="text-sm text-white/90">
                {siteSettings.address
                  ? `${siteSettings.address.street}, ${siteSettings.address.zip} ${siteSettings.address.city}`
                  : 'Bourg-en-Bresse, Ain (01)'}
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="mt-10 p-4">
          <h3 className="mb-6 font-bold text-white">
            Zones d&apos;Intervention
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-start text-sm text-gray-400 md:grid-cols-4 lg:grid-cols-6">
            {cities.map((city) => (
              <p key={city}>{city}</p>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-amber-300/10 pt-8">
          <p className="text-sm text-gray-300/70">
            © {new Date().getFullYear()}{' '}
            {siteSettings.businessName || 'BNB ÉNERGIE'} - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
