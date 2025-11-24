'use client';

import { ANIMATION_DURATIONS } from '@/app/_config/constants';
import type { BaseCardProps, PricingPack } from '@/app/_types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/app/_utils/animations';
import { motion } from 'framer-motion';

interface PricingCardProps extends BaseCardProps {
  pack: PricingPack;
}

export function PricingCard({ pack, index, className }: PricingCardProps) {
  const fadeInAnimation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.medium,
    getStaggerDelay(index)
  );

  // Vérifier si le prix est 5 990 ou 13 990 pour ajouter la bordure amber
  const isSpecialPrice = pack.price === '5 990' || pack.price === '13 990';

  return (
    <motion.div
      {...fadeInAnimation}
      viewport={SCROLL_VIEWPORT}
      className={`flex h-full flex-col ${pack.popular ? 'md:scale-105' : ''} ${className || ''}`}
    >
      <div
        className={`group relative flex h-full flex-col justify-between rounded-2xl bg-linear-to-br from-white to-neutral-50/50 transition-all duration-500 ${
          pack.popular
            ? 'border border-blue-400/50 p-8 shadow-2xl ring-1 shadow-blue-500/20 ring-blue-400/50 md:min-h-[440px]'
            : isSpecialPrice
              ? 'border border-amber-400/50 p-6 ring-1 ring-amber-400/10 hover:border-amber-500/70'
              : 'border-2 border-neutral-200/80 p-6 hover:border-blue-300/60'
        }`}
      >
        {/* Effet de brillance au survol */}
        <div className="bg-linear-gradient-to-r absolute inset-0 -translate-x-full overflow-hidden rounded-3xl from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Badge populaire */}
        {pack.popular && (
          <div className="absolute -top-5 left-1/2 z-50 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-blue-600 to-cyan-500 opacity-75 blur-md" />
              <span className="relative flex items-center gap-1.5 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 px-5 py-1.5 text-xs font-bold text-white">
                <span className="text-sm">⭐</span>
                POPULAIRE
              </span>
            </div>
          </div>
        )}

        {/* En-tête avec icône et prix principal */}
        <div className="relative mb-6 flex items-start justify-between">
          <div
            className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
              pack.popular
                ? 'bg-linear-to-br from-blue-500 to-cyan-500'
                : isSpecialPrice
                  ? 'bg-linear-to-br from-amber-400 to-orange-500'
                  : 'bg-linear-to-br from-blue-50 to-cyan-50'
            }`}
          >
            <span
              className={`text-3xl ${pack.popular || isSpecialPrice ? 'drop-shadow-md' : ''}`}
            >
              ☀️
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              <span
                className={`bg-linear-to-br bg-clip-text text-[2.5rem] leading-none font-black tracking-tight transition-all duration-300 ${
                  pack.popular
                    ? 'from-blue-600 to-cyan-600 text-transparent'
                    : isSpecialPrice
                      ? 'from-amber-600 to-orange-600 text-transparent'
                      : 'text-neutral-900'
                }`}
              >
                {pack.price}
              </span>
              <span className="text-xl font-semibold text-neutral-600">€</span>
            </div>
            <div className="mt-0.5 text-xs font-medium text-neutral-500">
              TTC
            </div>
          </div>
        </div>

        <div className="grow">
          <h3 className="mb-3 text-xl font-black text-neutral-900">
            {pack.name}
          </h3>
          <p className="mb-5 text-sm font-medium text-neutral-600">
            {pack.panels}
          </p>

          <div className="mb-6">
            {pack.originalPrice && (
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-neutral-400 line-through">
                    {pack.originalPrice}
                  </span>
                  <span className="text-lg text-neutral-400">€</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  -
                  {Math.round(
                    ((parseFloat(pack.originalPrice.replace(/\s/g, '')) -
                      parseFloat(pack.price.replace(/\s/g, ''))) /
                      parseFloat(pack.originalPrice.replace(/\s/g, ''))) *
                      100
                  )}
                  %
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 px-3 py-2">
              <svg
                className="h-4 w-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-bold text-blue-700">
                Installation incluse
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {pack.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-neutral-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#contact"
          className={`group/btn relative mt-6 block overflow-hidden rounded-xl px-6 py-4 text-center text-sm font-bold transition-all duration-300 ${
            pack.popular
              ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white'
              : isSpecialPrice
                ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white'
                : 'border-2 border-neutral-300 bg-white text-neutral-800 hover:border-blue-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {pack.cta}
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          {/* Effet de brillance au survol du bouton */}
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
        </a>
      </div>
    </motion.div>
  );
}
