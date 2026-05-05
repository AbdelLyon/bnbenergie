import { PricingPack } from '@/types';

interface PricingHeaderProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingHeader({ pack, isSpecialPrice }: PricingHeaderProps) {
  return (
    <>
      {pack.popular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <span className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-small">
            ⭐ Populaire
          </span>
        </div>
      )}

      <div className="mb-6 flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
            pack.popular
              ? "bg-primary-50"
              : isSpecialPrice
                ? "bg-secondary-50"
                : "bg-default-50"
          }`}
        >
          ☀️
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-display text-4xl font-black leading-none tracking-tight ${
                pack.popular
                  ? "text-primary"
                  : isSpecialPrice
                    ? "text-secondary"
                    : "text-foreground"
              }`}
            >
              {pack.price}
            </span>
            <span className="text-lg font-medium text-default-400">€</span>
          </div>
          <div className="mt-0.5 text-[11px] font-medium text-default-400">TTC</div>
        </div>
      </div>
    </>
  );
}
