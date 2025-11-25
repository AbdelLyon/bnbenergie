'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, BoltIcon, Shield } from 'lucide-react';
import type { Project, Media } from '@/payload-types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Handle image URL whether it's a string (ID) or Media object
  const imageUrl =
    typeof project.image === 'object' && project.image !== null
      ? (project.image as Media).url || '/images/placeholder-project.jpg'
      : '/images/placeholder-project.jpg'; // Fallback if image is ID or missing

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          alt={`Installation ${project.power} à ${project.location}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 3 ? 'eager' : 'lazy'}
          priority={index < 2}
        />
        {/* Badge puissance */}
        <div className="absolute top-4 right-4 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <BoltIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              {project.power}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="font-display mb-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
          {project.title}
        </h3>

        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm">{project.panels}</span>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-neutral-600">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            RGE QualiPV
          </span>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            Garanti 10 ans
          </span>
        </div>
      </div>
    </motion.div>
  );
}
