"use client";

import Image from "next/image";
import { MapPin, BoltIcon, Shield } from "lucide-react";
import type { Project, Media } from "@/payload-types";
import { TRANSITIONS } from "@/config/constants";
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
      initial={{
        opacity: 0,
        x: index % 3 === 0 ? -10 : index % 3 === 1 ? 0 : 10,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ scale: 1.01, transition: TRANSITIONS.smooth }}
      className="group relative overflow-hidden rounded-xl border border-neutral-200/50 dark:border-content2 bg-white dark:bg-content1 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Image cliquable vers la réalisation */}
      <Link
        className="relative block h-64 overflow-hidden bg-neutral-100 dark:bg-content2"
        href={href ?? "#"}
        tabIndex={-1}
        aria-hidden="true"
      >
        <LazyMotionDiv
          className="h-full w-full"
          whileHover={{ scale: 1.05, transition: TRANSITIONS.smooth }}
        >
          <Image
            src={imageUrl}
            alt={`Installation ${project.power} à ${project.location}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
          />
        </LazyMotionDiv>

        <div className="absolute top-3 right-3 overflow-hidden rounded-full border border-white/30 bg-white/95 dark:bg-black/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <BoltIcon className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {project.power}
            </span>
          </div>
        </div>
      </Link>

      {/* Informations — séparé de l'image pour pouvoir mettre un lien sur la localisation */}
      <div className="relative p-4">
        <h3 className="font-display mb-3 text-lg font-bold text-neutral-900 dark:text-foreground transition-colors">
          <Link
            href={href ?? "#"}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <div className="mb-3 flex items-center gap-4">
          <Link
            href={`/zones-intervention/${slugify(project.location)}`}
            className="flex items-center gap-2 text-neutral-700 dark:text-default-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={`Voir nos interventions à ${project.location}`}
          >
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-1.5">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium">Voir {project.location}</span>
          </Link>
          <div className="flex items-center gap-2 text-neutral-700 dark:text-default-400">
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-1.5">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium">{project.panels}</span>
          </div>
        </div>

        <p
          className={`mb-3 text-sm leading-relaxed text-neutral-600 dark:text-default-500 ${page === "home" ? "line-clamp-2" : ""}`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md bg-amber-50 dark:bg-amber-900/20 px-2 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            RGE QualiPV
          </span>
          <span className="rounded-md bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-bold text-green-600 dark:text-green-400">
            Garanti 10 ans
          </span>
        </div>
      </div>
    </LazyMotionDiv>
  );
}
