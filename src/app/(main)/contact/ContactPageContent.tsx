'use client';

import { motion } from 'framer-motion';
import { useActionState } from 'react';
import { sendContactEmail } from '@/actions/contact';
import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';
import { PageHeader, Title } from '@/components';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { ContactMap } from './components/ContactMap';
import { SuccessMessage } from './components/SuccessMessage';

interface ContactPageContentProps {
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

const initialState = {
  success: false,
  message: '',
  errors: {},
};

export default function ContactPageContent({
  header,
  siteSettings,
}: ContactPageContentProps) {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  const contactInfoItems = [
    {
      icon: 'Phone',
      label: 'TÉLÉPHONE',
      value: siteSettings.contactPhone || '07 81 25 11 25',
      href: `tel:${
        siteSettings.contactPhone?.replace(/\s/g, '') || '0781251125'
      }`,
      description: 'Du lundi au vendredi, 8h-19h',
    },
    {
      icon: 'Mail',
      label: 'EMAIL',
      value: siteSettings.contactEmail || 'contact@bnb-energie.fr',
      href: `mailto:${siteSettings.contactEmail || 'contact@bnb-energie.fr'}`,
      description: 'Réponse sous 24h ouvrées',
    },
    {
      icon: 'MapPin',
      label: 'ADRESSE',
      value: siteSettings.addressStreet
        ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
        : 'Bourg-en-Bresse, Ain (01)',
      description: "Intervention dans tout l'Ain (01)",
    },
  ];

  const mapAddress = siteSettings.addressStreet
    ? `${siteSettings.addressStreet}, ${siteSettings.addressZip} ${siteSettings.addressCity}`
    : 'Bourg-en-Bresse, Ain (01)';

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-background">
      <PageHeader variant="simple" height="medium">
        <Title
          title={header?.title.split(' ') ?? ['Contactez-nous']}
          subtitle={header?.subtitle ?? ''}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-base font-normal leading-relaxed text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg md:text-xl"
        >
          {header?.description || ''}
        </motion.p>
      </PageHeader>

      <div id="contact-section" className="relative z-10 -mt-24 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-2xl lg:grid lg:grid-cols-5"
          >
            <div className="relative bg-slate-900 dark:bg-black px-8 py-12 lg:col-span-2 lg:px-12 lg:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 to-slate-900/50" />
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">
                    Discutons de votre projet
                  </h2>
                  <p className="text-slate-300 mb-12 leading-relaxed text-lg">
                    Notre équipe d'experts est à votre écoute pour étudier vos
                    besoins et vous proposer la solution solaire la plus
                    adaptée.
                  </p>

                  <ContactInfo items={contactInfoItems} />
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm text-slate-400">
                    BNB ÉNERGIE - Votre partenaire solaire dans l'Ain
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-content1 px-8 py-12 lg:col-span-3 lg:px-12 lg:py-16">
              <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-slate-500 dark:text-default-500 mb-8">
                  Remplissez le formulaire ci-dessous, nous vous répondrons sous
                  24h.
                </p>

                {state.success ? (
                  <SuccessMessage message={state.message} />
                ) : (
                  <ContactForm
                    formAction={formAction}
                    state={state}
                    isPending={isPending}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-[500px] relative z-0">
        <ContactMap
          latitude={parseFloat(siteSettings.geoLatitude || '46.2059')}
          longitude={parseFloat(siteSettings.geoLongitude || '5.2255')}
          address={mapAddress}
        />
      </div>
    </main>
  );
}
