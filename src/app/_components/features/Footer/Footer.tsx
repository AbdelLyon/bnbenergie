import { Card, CardBody } from '@heroui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import footerData from '@/data/footerData.json';

const Footer = () => {
  return (
    <footer className="mt-20 bg-neutral-900 py-10 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-6 font-bold">{footerData.intro}</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-8">
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <Phone size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">
                {footerData.contact.phone.label}
              </h3>
              <p className="text-sm text-white/90">
                {footerData.contact.phone.number}
              </p>
            </CardBody>
          </Card>
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <Mail size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">
                {footerData.contact.email.label}
              </h3>
              <a
                href={footerData.contact.email.href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {footerData.contact.email.address}
              </a>
            </CardBody>
          </Card>
          <Card className="group rounded-xl border border-amber-300/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10">
            <CardBody className="flex h-full flex-col items-center justify-center p-3">
              <MapPin size={28} className="mx-auto text-amber-500" />
              <h3 className="text-sm font-bold text-white">
                {footerData.contact.address.label}
              </h3>
              {footerData.contact.address.lines.map((line) => (
                <p key={line} className="text-sm text-white/90">
                  {line}
                </p>
              ))}
            </CardBody>
          </Card>
        </div>
        <div className="mt-10 p-4">
          <h3 className="mb-6 font-bold text-white">
            {footerData.intervention.title}
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-start text-sm text-gray-400 md:grid-cols-4 lg:grid-cols-6">
            {footerData.intervention.cities.map((city) => (
              <p key={city}>{city}</p>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-amber-300/10 pt-8">
          <p className="text-sm text-gray-300/70">
            © {new Date().getFullYear()} {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
