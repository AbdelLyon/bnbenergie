"use client";

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from "@/components/shared/layout/SectionWrapper";
import { ProjectCard } from "@/components/shared/ui/ProjectCard";
import type { Project } from "@/payload-types";
import Link from "next/link";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { ArrowRight } from "lucide-react";

interface RealisationsData {
  header: { badge: string; title: string; subtitle: string };
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
      <SectionContainer>
        <LazyMotionDiv
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          className={`mt-8 grid auto-rows-[1fr] items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3`}
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
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/realisations"
            className="group inline-flex items-center gap-2 rounded-full border border-default-200 bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-default-300 hover:shadow-small"
          >
            Voir toutes nos réalisations
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </LazyMotionDiv>
      </SectionContainer>
    </SectionWrapper>
  );
}
