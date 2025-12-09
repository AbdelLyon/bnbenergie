'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { motion } from 'framer-motion';
import { getLucideIcon } from '@/utils/getLucideIcon';
import type {
  Faq,
  PageHeader as PageHeaderType,
  SiteSetting,
} from '@/payload-types';
import {
  CTASection,
  PageHeader,
  PageMainWrapper,
  SectionContainer,
  StatCard,
  Title,
} from '@/components';

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

  return (
    <PageMainWrapper variant="purple">
      <div className="relative z-10">
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Header */}
        <PageHeader variant="simple" height="medium">
          <Title
            title={header?.title.split(' ') || ['Questions Fréquentes']}
            subtitle={header?.subtitle || ''}
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
            className="space-y-3 mb-20"
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
                      className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-neutral-100 dark:border-white/5 bg-white dark:bg-content1 px-2"
                      key={faq.id}
                      aria-label={faq.question}
                      title={
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-xl transition-transform duration-200 ease-out group-hover:scale-110 lg:text-2xl">
                            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                              {faq.category}
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-foreground transition-colors duration-200 ease-out group-hover:text-blue-600 dark:group-hover:text-blue-400 md:text-lg">
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                      }
                    >
                      <p className="leading-relaxed text-gray-700 dark:text-default-500">
                        {faq.answer}
                      </p>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Block */}

          <CTASection
            title="Vous ne trouvez pas votre réponse ?"
            description="Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur votre projet de panneaux solaires."
            phoneNumber={siteSettings.contactPhone || '07 81 25 11 25'}
            primaryButton={{
              text: 'Demander mon devis',
              href: '/contact',
            }}
          />
        </SectionContainer>
      </div>
    </PageMainWrapper>
  );
}
