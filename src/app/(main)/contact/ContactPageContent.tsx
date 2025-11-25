'use client';

import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { useState, useActionState, useEffect } from 'react';

import { sendContactEmail } from '@/app/actions/contact';
import { Title } from '../../_components/features/Hero';
import { PageHeader } from '../../_components/shared/layout/PageHeader';
import { SectionContainer } from '../../_components/shared/layout/SectionWrapper';
import { ScrollDownButton } from '../../_components/shared/ui/ScrollDownButton';
import { StatCard } from '../../_components/shared/ui/StatCard';
import { getLucideIcon } from '../../_utils/getLucideIcon';
import type {
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

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

  // Keep local state for controlled inputs to clear them on success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Clear form when submission is successful
  useEffect(() => {
    if (state.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
  }, [state.success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const contactInfoItems = [
    {
      icon: 'Phone',
      label: 'TÉLÉPHONE',
      value: siteSettings.contact?.phone || '07 81 25 11 25',
      href: `tel:${siteSettings.contact?.phone?.replace(/\s/g, '') || '0781251125'}`,
      description: 'Du lundi au vendredi, 8h-19h',
    },
    {
      icon: 'Mail',
      label: 'EMAIL',
      value: siteSettings.contact?.email || 'contact@bnb-energie.fr',
      href: `mailto:${siteSettings.contact?.email || 'contact@bnb-energie.fr'}`,
      description: 'Réponse sous 24h ouvrées',
    },
    {
      icon: 'MapPin',
      label: 'ADRESSE',
      value: siteSettings.address
        ? `${siteSettings.address.street}, ${siteSettings.address.zip} ${siteSettings.address.city}`
        : 'Bourg-en-Bresse, Ain (01)',
      description: "Intervention dans tout l'Ain (01)",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-neutral-50 via-white to-neutral-50">
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
        />
      </div>

      {/* Header */}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={header?.title.split(',') ?? ['Contactez-nous']}
          subtitle={header?.subtitle ?? ''}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {header?.description || ''}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats */}
        <div className="relative z-20 -mt-20 mb-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { value: '48h', label: 'Réponse Garantie', icon: 'Clock' },
              { value: '100%', label: 'Devis Gratuit', icon: 'FileCheck' },
              { value: '01', label: 'Intervention Ain', icon: 'MapPin' },
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

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="group hover:shadow-3xl relative overflow-hidden rounded-3xl border border-blue-100/50 bg-white p-8 shadow-2xl transition-all duration-500 md:p-10">
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-50/40 via-white to-cyan-50/40" />
              <div className="absolute -inset-40 bg-linear-to-br from-blue-400/5 via-transparent to-amber-400/5 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative z-10">
                <h2 className="mb-3 text-3xl font-bold text-slate-800">
                  Envoyez-nous un message
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-slate-600">
                  Remplissez le formulaire ci-dessous pour une demande de devis
                  ou d'information.
                </p>

                {state.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50/50 py-16 text-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-inner">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-slate-800">
                      Message envoyé !
                    </h3>
                    <p className="mx-auto max-w-md text-slate-600">
                      {state.message ||
                        'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.'}
                    </p>
                    <Button
                      className="mt-6 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                      onClick={() => window.location.reload()}
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form action={formAction} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <label
                        htmlFor="name"
                        className="mb-2 ml-1 block text-sm font-bold text-slate-700 transition-colors group-focus-within:text-blue-600"
                      >
                        Nom complet <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom et prénom"
                        className={`w-full rounded-xl border-2 bg-white px-5 py-4 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-100 focus:outline-none ${
                          state.errors?.name
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                      {state.errors?.name && (
                        <p className="mt-1 ml-1 text-xs text-red-500">
                          {state.errors.name[0]}
                        </p>
                      )}
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group"
                      >
                        <label
                          htmlFor="email"
                          className="mb-2 ml-1 block text-sm font-bold text-slate-700 transition-colors group-focus-within:text-blue-600"
                        >
                          Email <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                          className={`w-full rounded-xl border-2 bg-white px-5 py-4 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-100 focus:outline-none ${
                            state.errors?.email
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-slate-200 focus:border-blue-500'
                          }`}
                        />
                        {state.errors?.email && (
                          <p className="mt-1 ml-1 text-xs text-red-500">
                            {state.errors.email[0]}
                          </p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group"
                      >
                        <label
                          htmlFor="phone"
                          className="mb-2 ml-1 block text-sm font-bold text-slate-700 transition-colors group-focus-within:text-blue-600"
                        >
                          Téléphone <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="06 12 34 56 78"
                          className={`w-full rounded-xl border-2 bg-white px-5 py-4 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-100 focus:outline-none ${
                            state.errors?.phone
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-slate-200 focus:border-blue-500'
                          }`}
                        />
                        {state.errors?.phone && (
                          <p className="mt-1 ml-1 text-xs text-red-500">
                            {state.errors.phone[0]}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="subject"
                        className="mb-2 ml-1 block text-sm font-semibold text-slate-700"
                      >
                        Sujet <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Demande de devis, Renseignements..."
                        className={`w-full rounded-xl border bg-white/50 px-5 py-4 text-slate-800 placeholder-slate-400 transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-sky-100 focus:outline-none ${
                          state.errors?.subject
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-slate-200 focus:border-sky-400'
                        }`}
                      />
                      {state.errors?.subject && (
                        <p className="mt-1 ml-1 text-xs text-red-500">
                          {state.errors.subject[0]}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label
                        htmlFor="message"
                        className="mb-2 ml-1 block text-sm font-semibold text-slate-700"
                      >
                        Message <span className="text-amber-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Décrivez votre projet..."
                        className={`h-full min-h-[150px] w-full resize-none rounded-xl border bg-white/50 px-5 py-4 text-slate-800 placeholder-slate-400 transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-sky-100 focus:outline-none ${
                          state.errors?.message
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-slate-200 focus:border-sky-400'
                        }`}
                      />
                      {state.errors?.message && (
                        <p className="mt-1 ml-1 text-xs text-red-500">
                          {state.errors.message[0]}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isPending}
                      className="w-full rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 py-8 text-lg font-bold text-white shadow-xl shadow-sky-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                      endContent={!isPending && <Send className="h-5 w-5" />}
                    >
                      {isPending ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>

                    {state.message && !state.success && (
                      <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-red-600">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm">{state.message}</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Info Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-b from-amber-50/30 to-transparent" />

              <div className="relative z-10">
                <h2 className="mb-3 text-2xl font-bold text-slate-800">
                  Nos Coordonnées
                </h2>
                <p className="mb-8 text-slate-600">
                  Nous sommes à votre disposition pour toute question.
                </p>

                <div className="space-y-4">
                  {contactInfoItems.map((item, index) => {
                    const Icon = getLucideIcon(item.icon);
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group flex items-start gap-5 rounded-2xl border border-transparent bg-white/50 p-5 transition-all duration-300 hover:border-amber-200 hover:bg-white hover:shadow-lg hover:shadow-amber-100/50"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors group-hover:text-amber-600">
                            {item.label}
                          </div>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="block text-lg font-bold text-slate-800 transition-colors hover:text-amber-600"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-lg font-bold text-slate-800">
                              {item.value}
                            </div>
                          )}
                          <p className="mt-1 text-sm text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Decorative element to fill space if needed */}
                <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/50 p-6">
                  <p className="text-center text-sm font-medium text-sky-800">
                    Notre équipe est à votre écoute pour concrétiser vos projets
                    énergétiques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Width Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-3 shadow-xl backdrop-blur-xl">
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.5!2d${siteSettings.geo?.longitude || '5.2255'}!3d${siteSettings.geo?.latitude || '46.2059'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDEyJzIxLjIiTiA1wrAxMyczMS44IkU!5e0!3m2!1sfr!2sfr!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation BNB ÉNERGIE"
                className="absolute inset-0 grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
              />

              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-md">
                <h3 className="mb-1 text-lg font-bold text-slate-800">
                  Nous Trouver
                </h3>
                <p className="text-sm text-slate-600">
                  {siteSettings.address
                    ? `${siteSettings.address.street}, ${siteSettings.address.zip} ${siteSettings.address.city}`
                    : 'Bourg-en-Bresse, Ain (01)'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </main>
  );
}
