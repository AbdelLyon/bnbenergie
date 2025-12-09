import { PricingPack } from '@/types';

interface PricingHeaderProps {
  pack: PricingPack;
  isSpecialPrice: boolean;
}

export function PricingHeader({ pack, isSpecialPrice }: PricingHeaderProps) {
  return (
    <>
      {/* Badge populaire */}
      {pack.popular && (
        <div className="absolute -top-5 left-1/2 z-50 -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 opacity-75 blur-md" />
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
