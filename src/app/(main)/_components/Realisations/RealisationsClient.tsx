'use client';

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/components/shared/layout/SectionWrapper';
import { SPACING } from '@/config/constants';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/shared/ui/ProjectCard';
import type { Project } from '@/payload-types';
import Link from 'next/link';

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
          {data.projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/realisations"
            className="
                group inline-flex items-center gap-3
                rounded-xl border-2 border-primary
                px-8 py-3
                text-lg font-bold text-primary
                transition-all duration-300
                hover:bg-primary hover:text-white
                hover:shadow-xl
              "
          >
            Voir toutes nos réalisations
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </SectionContainer>
    </SectionWrapper>
  );
}
