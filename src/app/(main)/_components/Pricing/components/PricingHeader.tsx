import {
  BadgeCheck,
  PanelsTopLeft,
  SunMedium,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import type { PricingPack } from '@/types';

interface PricingHeaderProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

type PricingTone = 'popular' | 'special' | 'default';

interface PricingToneStyles {
  icon: LucideIcon;
  iconContainer: string;
  iconColor: string;
  price: string;
  accent: string;
}

const TONE_STYLES: Record<PricingTone, PricingToneStyles> = {
  popular: {
    icon: Zap,
    iconContainer:
      'border-blue-200/70 bg-blue-50/80 shadow-blue-950/5',
    iconColor: 'text-blue-600',
    price:
      'bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent',
    accent: 'bg-blue-500/10',
  },

  special: {
    icon: SunMedium,
    iconContainer:
      'border-amber-200/70 bg-amber-50/80 shadow-amber-950/5',
    iconColor: 'text-amber-600',
    price:
      'bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent',
    accent: 'bg-amber-500/10',
  },

  default: {
    icon: PanelsTopLeft,
    iconContainer:
      'border-neutral-200/80 bg-white/80 shadow-neutral-950/5',
    iconColor: 'text-neutral-600',
    price: 'text-neutral-950',
    accent: 'bg-neutral-400/10',
  },
};

function getPricingTone(
  isPopular: boolean,
  isSpecialPrice: boolean,
): PricingTone {
  if (isPopular) {
    return 'popular';
  }

  if (isSpecialPrice) {
    return 'special';
  }

  return 'default';
}

function PopularBadge() {
  return (
    <div className="pointer-events-none absolute -top-5 left-1/2 z-50 -translate-x-1/2">
      <div className="relative">
        <div className="absolute inset-1 rounded-full bg-blue-500/20 blur-lg" />

        <div className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-blue-200/70 bg-white/95 px-4 py-2 shadow-lg shadow-blue-950/8 ring-1 ring-black/5 backdrop-blur-xl">
          <span className="flex size-5 items-center justify-center rounded-full bg-blue-50">
            <BadgeCheck
              aria-hidden="true"
              className="size-3.5 text-blue-600"
              strokeWidth={2}
            />
          </span>

          <span className="text-[10px] leading-none font-semibold tracking-[0.14em] text-blue-700 uppercase">
            Le plus choisi
          </span>
        </div>
      </div>
    </div>
  );
}

function PricingIcon({
  tone,
}: Readonly<{
  tone: PricingTone;
}>) {
  const styles = TONE_STYLES[tone];
  const Icon = styles.icon;

  return (
    <div
      className={[
        'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border',
        'shadow-sm backdrop-blur-xl',
        'transition-all duration-300 ease-out',
        'group-hover:-translate-y-0.5 group-hover:shadow-md',
        styles.iconContainer,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'absolute -top-3 -right-3 size-8 rounded-full blur-xl',
          styles.accent,
        ].join(' ')}
      />

      <Icon
        aria-hidden="true"
        strokeWidth={1.65}
        className={[
          'relative z-10 size-5',
          'transition-transform duration-300 ease-out',
          'group-hover:scale-105',
          styles.iconColor,
        ].join(' ')}
      />
    </div>
  );
}

export function PricingHeader({
  pack,
  isSpecialPrice,
}: Readonly<PricingHeaderProps>) {
  const isPopular = Boolean(pack.popular);
  const tone = getPricingTone(isPopular, isSpecialPrice);
  const styles = TONE_STYLES[tone];

  return (
    <>
      {isPopular && <PopularBadge />}

      <header className="relative mb-5 flex items-start justify-between gap-5">
        <PricingIcon tone={tone} />

        <div className="flex min-w-0 flex-col items-end text-right">
          <div className="flex items-end gap-1">
            <span
              className={[
                'font-[family:var(--font-manrope)]',
                'text-[2.65rem] leading-none font-semibold tracking-[-0.045em]',
                'tabular-nums sm:text-[2.9rem]',
                styles.price,
              ].join(' ')}
            >
              {pack.price}
            </span>

            <span className="pb-1 font-[family:var(--font-manrope)] text-base leading-none font-medium text-neutral-500">
              €
            </span>
          </div>

          <span className="mt-1.5 text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase">
            Prix TTC
          </span>
        </div>
      </header>
    </>
  );
}