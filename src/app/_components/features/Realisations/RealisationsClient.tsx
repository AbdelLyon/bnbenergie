'use client';

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/app/_components/shared/layout/SectionWrapper';
import { SPACING } from '@/app/_config/constants';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';

interface RealisationsData {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects: Array<{
    id: number;
    title: string;
    location: string;
    description: string;
    power: string;
    panels: string;
    image: string;
  }>;
  cta: string;
}

export function RealisationsClient({ data }: { data: RealisationsData }) {
  return (
    <SectionWrapper id="realisations" background="gray">
      <div className="bg-primary-500/5 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-secondary-500/5 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl" />

      <SectionContainer>
        <SectionHeader
          badge={data.header.badge}
          title={data.header.title}
          subtitle={data.header.subtitle}
        />

        <div className={`grid auto-rows-[1fr] items-stretch md:grid-cols-3 ${SPACING.grid.gap}`}>
          {data.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            as="a"
            href="#contact"
            size="lg"
            className="bg-primary-600 shadow-primary-500/30 hover:bg-primary-700 rounded-full px-8 py-6 font-bold text-white shadow-xl transition-transform hover:scale-105"
            endContent={<ArrowRight className="h-5 w-5" />}
          >
            {data.cta}
          </Button>
        </motion.div>
      </SectionContainer>
    </SectionWrapper>
  );
}
