import { PricingPack } from '@/types';

interface PricingCTAProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingCTA({ pack, isSpecialPrice }: PricingCTAProps) {
  return (
    <a
      href="/contact"
      className={`group/btn relative mt-6 block overflow-hidden rounded-xl px-6 py-4 text-center text-sm font-bold transition-all duration-300 ${
        pack.popular
          ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white'
          : isSpecialPrice
            ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white'
            : 'border-2 border-neutral-300 dark:border-default-200 bg-white dark:bg-content1 text-neutral-800 dark:text-foreground hover:border-blue-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
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
  );
}
