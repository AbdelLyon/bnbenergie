import { PricingPack } from '@/types';
import Link from 'next/link';

interface PricingCTAProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingCTA({ pack }: PricingCTAProps) {
  return (
    <Link
      href="/contact#contact-form"
      className={`group/btn relative mt-5 block overflow-hidden rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all duration-300 ${
        pack.popular
          ? 'bg-secondary-600 text-white hover:bg-secondary-700'
          : 'border border-neutral-200 bg-white text-neutral-800 hover:border-secondary-300 hover:bg-secondary-50/50'
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
    </Link>
  );
}
