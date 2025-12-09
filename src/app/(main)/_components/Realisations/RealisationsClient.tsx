'use client';

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/components/shared/layout/SectionWrapper';
import { SPACING } from '@/config/constants';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/shared/ui/ProjectCard';
import type { Project } from '@/payload-types';

interface RealisationsData {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects: Project[];
  cta: string;
}

export function RealisationsClient({ data }: { data: RealisationsData }) {
  return (
    <SectionWrapper
      id="realisations"
      background="gray"
      className="overflow-x-clip"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-linear-to-br from-amber-400/10 to-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-blue-400/10 to-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/5 blur-3xl" />
      </div>

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            badge={data.header.badge}
            title={data.header.title}
            subtitle={data.header.subtitle}
          />
        </motion.div>

        <div
          className={`grid auto-rows-[1fr] items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 ${SPACING.grid.gap}`}
        >
          {data.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-500 to-orange-500 opacity-20 blur-2xl" />

            <Button
              as="a"
              href="/contact"
              size="lg"
              className="relative overflow-hidden rounded-full border-2 border-amber-500/20 bg-linear-to-r from-amber-500 to-orange-500 px-10 py-7 font-bold text-white shadow-xl shadow-amber-500/10 transition-all hover:shadow-amber-500/20"
              endContent={<ArrowRight className="h-6 w-6" />}
            >
              <span className="relative z-10">{data.cta}</span>
            </Button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 text-sm text-neutral-600 dark:text-neutral-400"
          >
            Rejoignez nos clients satisfaits et passez à l'énergie solaire
          </motion.p>
        </motion.div>
      </SectionContainer>
    </SectionWrapper>
  );
}
