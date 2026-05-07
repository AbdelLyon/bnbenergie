"use client";

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from "@/components/shared/layout/SectionWrapper";
import { SPACING } from "@/config/constants";
import { ProjectCard } from "@/components/shared/ui/ProjectCard";
import type { Project } from "@/payload-types";
import Link from "next/link";
import { LazyMotionDiv } from "@/components/LazyComponents";

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
    <SectionWrapper id="realisations" className="overflow-x-clip">
      <SectionContainer>
        <LazyMotionDiv
          initial={{ y: -8 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.3 }}
        >
          <SectionHeader
            badge={data.header.badge}
            title={data.header.title}
            subtitle={data.header.subtitle}
          />
        </LazyMotionDiv>

        <div
          className={`mt-8 grid auto-rows-[1fr] items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 ${SPACING.grid.gap}`}
        >
          {data.projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              page="home"
              href="/garanties"
            />
          ))}
        </div>
        <LazyMotionDiv
          initial={{ y: 8 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, delay: 0 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/realisations"
            className="group inline-flex items-center gap-3 rounded-xl border border-primary px-8 py-4 text-lg font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5"
          >
            Voir toutes nos réalisations
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </LazyMotionDiv>
      </SectionContainer>
    </SectionWrapper>
  );
}
