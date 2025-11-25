'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { MailIcon, Phone } from 'lucide-react';
import { Title } from '../../_components/features/Hero';
import { PageHeader } from '../../_components/shared/layout/PageHeader';
import { SectionContainer } from '../../_components/shared/layout/SectionWrapper';
import { ScrollDownButton } from '../../_components/shared/ui/ScrollDownButton';
import { StatCard } from '../../_components/shared/ui/StatCard';
import { getLucideIcon } from '../../_utils/getLucideIcon';
import type {
  Faq,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';

interface FAQPageContentProps {
  faqs: Faq[];
  header: PageHeaderType | null;
  siteSettings: SiteSetting;
}

const categoryIcons: Record<string, string> = {
  'Prix & Budget': 'DollarSign',
  'Aides & Financement': 'Gift',
  Installation: 'Wrench',
  Rentabilité: 'LineChart',
  'Notre Entreprise': 'Building',
  Dimensionnement: 'Zap',
  Entretien: 'Brush',
  Devis: 'FileText',
  Production: 'Sun',
  Technique: 'Home',
};

export default function FAQPageContent({
  faqs,
  header,
  siteSettings,
}: FAQPageContentProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Header */}
        <PageHeader
          variant="simple"
          height="medium"
          bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
        >
          <Title
            title={['FAQ', header?.title || 'Questions Fréquentes']}
            subtitle={header?.subtitle || ''}
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
                {
                  value: faqs.length.toString(),
                  label: 'Questions',
                  icon: 'HelpCircle',
                },
                {
                  value: '100%',
                  label: 'Réponses Détaillées',
                  icon: 'CheckCircle2',
                },
                { value: '24/7', label: 'Support Disponible', icon: 'Zap' },
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => {
              const iconName = faq.category
                ? categoryIcons[faq.category] || 'HelpCircle'
                : 'HelpCircle';
              const Icon = getLucideIcon(iconName);

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group"
                >
                  <Accordion variant="splitted" className="px-0">
                    <AccordionItem
                      key={faq.id}
                      aria-label={faq.question}
                      title={
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-xl transition-transform duration-200 ease-out group-hover:scale-110 lg:text-2xl">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-blue-600">
                              {faq.category}
                            </div>
                            <h3 className="text-base font-bold text-gray-900 transition-colors duration-200 ease-out group-hover:text-blue-600 md:text-lg">
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                      }
                    >
                      <p className="leading-relaxed text-gray-700">
                        {faq.answer}
                      </p>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-blue-600 to-cyan-600 p-10 text-white shadow-2xl shadow-blue-500/30 md:p-14">
              {/* Pattern background */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-linear(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              <div className="relative z-10 text-center">
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                  Notre équipe d&apos;experts est à votre disposition pour
                  répondre à toutes vos questions sur votre projet de panneaux
                  solaires.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    as="a"
                    href={`tel:${siteSettings.contact?.phone?.replace(/\s/g, '') || '0781251125'}`}
                    size="lg"
                    className="bg-white font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
                    startContent={<Phone className="h-5 w-5" />}
                  >
                    Appelez-nous
                  </Button>
                  <Button
                    as="a"
                    href={`mailto:${siteSettings.contact?.email || 'contact@bnb-energie.fr'}`}
                    size="lg"
                    variant="bordered"
                    className="border-2 border-white/30 bg-white/10 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    startContent={<MailIcon className="h-5 w-5" />}
                  >
                    Envoyez un email
                  </Button>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
            </div>
          </motion.div>
        </SectionContainer>
      </main>
    </>
  );
}
