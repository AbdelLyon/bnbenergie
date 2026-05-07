import { PricingPack } from '@/types';

interface PricingHeaderProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingHeader({ pack, isSpecialPrice }: PricingHeaderProps) {
  return (
    <>
      {pack.popular && (
        <div className="absolute -top-5 left-1/2 z-50 -translate-x-1/2">
          <span className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-1.5 text-xs font-bold text-white">
            <span className="text-sm">⭐</span>
            POPULAIRE
          </span>
        </div>
      )}

      <div className="relative mb-6 flex items-start justify-between">
        <div
          className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
            pack.popular
              ? 'bg-primary'
              : isSpecialPrice
                ? 'bg-secondary'
                : 'bg-primary/10'
          }`}
        >
          <span className={`text-3xl ${pack.popular || isSpecialPrice ? 'drop-shadow-md' : ''}`}>
            ☀️
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-[2.5rem] leading-none font-black tracking-tight transition-all duration-300 ${
                pack.popular
                  ? 'text-primary'
                  : isSpecialPrice
                    ? 'text-secondary'
                    : 'text-neutral-900 dark:text-foreground'
              }`}
            >
              {pack.price}
            </span>
            <span className="text-xl font-semibold text-neutral-600 dark:text-default-500">€</span>
          </div>
          <div className="mt-0.5 text-xs font-medium text-neutral-500 dark:text-default-400">
            TTC
          </div>
        </div>
      </div>
    </>
  );
}
