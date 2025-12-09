'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, BoltIcon, Shield } from 'lucide-react';
import type { Project, Media } from '@/payload-types';
import { TRANSITIONS } from '@/config/constants';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const imageUrl =
    typeof project.image === 'object' && project.image !== null
      ? (project.image as Media).url || '/images/placeholder-project.jpg'
      : '/images/placeholder-project.jpg';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border-2 border-amber-200/30 dark:border-amber-500/20 bg-white dark:bg-content1 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5 hover:border-amber-300 dark:hover:border-amber-500/40"
    >
      <div className="relative h-72 overflow-hidden bg-neutral-100 dark:bg-content2">
        <motion.div
          className="h-full w-full"
          whileHover={{
            scale: 1.12,
            transition: TRANSITIONS.smooth,
          }}
        >
          <Image
            src={imageUrl}
            alt={`Installation ${project.power} à ${project.location}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={index < 3 ? 'eager' : 'lazy'}
            priority={index < 2}
          />
        </motion.div>

        <div className="absolute top-4 right-4 overflow-hidden rounded-full border border-white/30 bg-white/95 dark:bg-black/90 px-4 py-2 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <BoltIcon className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {project.power}
            </span>
          </div>
        </div>
      </div>

      <div className="relative p-7">
        <h3 className="font-display mb-4 text-2xl font-black text-neutral-900 dark:text-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-400">
          {project.title}
        </h3>

        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-3 text-neutral-700 dark:text-default-400">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-2">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium">{project.location}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-700 dark:text-default-400">
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-2">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium">{project.panels}</span>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-default-500">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-amber-200 dark:border-amber-500/30 bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
            RGE QualiPV
          </span>
          <span className="rounded-lg border border-green-200 dark:border-green-500/30 bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-3 py-1.5 text-xs font-bold text-green-700 dark:text-green-400">
            Garanti 10 ans
          </span>
        </div>
      </div>
    </motion.div>
  );
}
