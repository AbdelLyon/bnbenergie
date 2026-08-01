"use client";

import Image from "next/image";
import { MapPin, BoltIcon, Shield } from "lucide-react";
import type { Project, Media } from "@/payload-types";
import { LazyMotionDiv } from "@/components/LazyComponents";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

interface ProjectCardProps {
  project: Project;
  index: number;
  page: "home" | "Realisations";
  href?: string;
}

export function ProjectCard({ project, index, page, href }: ProjectCardProps) {
  const imageUrl =
    typeof project.image === "object" && project.image !== null
      ? (project.image as Media).url || "/images/placeholder-project.jpg"
      : "/images/placeholder-project.jpg";

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0 }}
      className="group"
    >
      {/* Image arrondie (pas d'encadré de carte) */}
      <Link
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100"
        href={href ?? "#"}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageUrl}
          alt={`Installation ${project.power} à ${project.location}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <BoltIcon className="h-3.5 w-3.5 text-secondary-600" />
          <span className="text-xs font-semibold text-neutral-800">
            {project.power}
          </span>
        </div>
      </Link>

      {/* Texte nu sous l'image */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
          <Link
            href={href ?? "#"}
            className="transition-colors hover:text-secondary-600"
          >
            {project.title}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
          <Link
            href={`/zones-intervention/${slugify(project.location)}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary-600"
            title={`Voir nos interventions à ${project.location}`}
          >
            <MapPin className="h-4 w-4" />
            {project.location}
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-4 w-4" />
            {project.panels}
          </span>
        </div>

        <p
          className={`mt-3 text-sm leading-relaxed text-neutral-600 ${
            page === "home" ? "line-clamp-2" : ""
          }`}
        >
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
          <span>RGE QualiPV</span>
          <span aria-hidden="true">·</span>
          <span>Garanti 10 ans</span>
        </div>
      </div>
    </LazyMotionDiv>
  );
}
