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
      className={`group/btn mt-6 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px ${
        pack.popular
          ? "bg-primary text-white hover:bg-primary-600 hover:shadow-medium"
          : isSpecialPrice
            ? "bg-secondary text-white hover:bg-secondary-600"
            : "border border-default-200 bg-background text-foreground hover:border-default-300 hover:bg-default-50"
      }`}
    >
      {pack.cta}
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}
