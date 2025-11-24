'use client';

import { Title } from '@/app/_components/features/Hero/Title';
import { PageHeader } from '@/app/_components/shared/layout/PageHeader/PageHeader';
import { SectionContainer } from '@/app/_components/shared/layout/SectionWrapper';
import { CTASection } from '@/app/_components/shared/ui/CTASection';
import { FeatureCard } from '@/app/_components/shared/ui/FeatureCard';
import { IntroSection } from '@/app/_components/shared/ui/IntroSection';
import { ProcessStep } from '@/app/_components/shared/ui/ProcessStep';
import { ScrollDownButton } from '@/app/_components/shared/ui/ScrollDownButton';
import { StatsGrid } from '@/app/_components/shared/ui/StatsGrid';
import { WarrantyCard } from '@/app/_components/shared/ui/WarrantyCard';
import garantiesData from '@/data/garantiesData.json';
import garantiesHeaderData from '@/data/garantiesHeaderData.json';
import siteConfig from '@/data/siteConfig.json';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { motion } from 'framer-motion';

export default function GarantiesPageContent() {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white">
      {/* Header */}
      <PageHeader
        variant="simple"
        height="medium"
        bottomElement={<ScrollDownButton onClick={scrollToNextSection} />}
      >
        <Title
          title={garantiesHeaderData.title}
          subtitle={garantiesHeaderData.subtitle}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-4xl px-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl"
        >
          {garantiesHeaderData.description}
        </motion.p>
      </PageHeader>

      <SectionContainer>
        {/* Stats flottantes */}
        <StatsGrid
          stats={garantiesData.stats.map((stat) => ({
            ...stat,
            gradient: 'from-blue-500 to-cyan-500',
          }))}
        />

        {/* Introduction */}
        <IntroSection
          title={garantiesData.intro.title}
          description={garantiesData.intro.description}
        />

        {/* Garanties des panneaux */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {garantiesData.productWarranties.title}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {garantiesData.productWarranties.items.map((product, index) => (
              <WarrantyCard
                key={product.title}
                icon={product.icon}
                title={product.title}
                description=""
                gradient="from-blue-500 to-cyan-500"
                warranties={product.warranties}
                features={product.features}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Nos engagements */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {garantiesData.commitments.title}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {garantiesData.commitments.items.map((commitment, index) => (
              <FeatureCard
                key={commitment.title}
                icon={commitment.icon}
                title={commitment.title}
                description={commitment.description}
                gradient="from-blue-500 to-cyan-500"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Processus de garantie */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 text-center"
          >
            <h2 className="font-display mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              {garantiesData.warranty_process.title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-neutral-600">
              {garantiesData.warranty_process.description}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {garantiesData.warranty_process.steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                showConnector={
                  index < garantiesData.warranty_process.steps.length - 1
                }
                index={index}
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {garantiesData.faq.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-4xl"
          >
            <Accordion variant="splitted">
              {garantiesData.faq.items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  aria-label={faq.question}
                  title={faq.question}
                  classNames={{
                    base: 'bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow',
                    title: 'font-semibold text-neutral-900',
                    content: 'text-neutral-600 pb-6',
                  }}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <CTASection
          title={garantiesData.cta.title}
          description={garantiesData.cta.subtitle}
          phoneNumber={siteConfig.contact.phone}
          primaryButton={{
            text: 'Demander mon devis',
            href: '/contact',
          }}
          variant="gradient"
        />
      </SectionContainer>
    </main>
  );
}
