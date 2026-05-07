import { PricingPack } from '@/types';
import Link from 'next/link';

interface PricingCTAProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingCTA({ pack, isSpecialPrice }: PricingCTAProps) {
  return (
    <Link
      href="/contact#contact-form"
      className={`group/btn mt-6 block rounded-xl px-6 py-4 text-center text-sm font-bold transition-all duration-300 ${
        pack.popular
          ? 'bg-primary text-white'
          : isSpecialPrice
          ? 'bg-secondary text-white'
          : 'border-2 border-neutral-300 dark:border-default-200 bg-white dark:bg-content1 text-neutral-800 dark:text-foreground hover:border-primary hover:bg-primary hover:text-white'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
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
    </Link>
  );
}
