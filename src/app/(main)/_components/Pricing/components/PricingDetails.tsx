import { PricingPack } from '@/types';

interface PricingDetailsProps {
  pack: PricingPack;
}

export function PricingDetails({ pack }: PricingDetailsProps) {
  return (
    <>
      <h3 className="mb-3 text-xl font-black text-neutral-900 dark:text-foreground">
        {pack.name}
      </h3>
      <p className="mb-5 text-sm font-medium text-neutral-600 dark:text-default-500">
        {pack.panels}
      </p>

      <div className="mb-6">
        {pack.originalPrice && (
          <div className="mb-3 flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-neutral-400 line-through">
                {pack.originalPrice}
              </span>
              <span className="text-lg text-neutral-400 dark:text-default-400">€</span>
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
        <div className="flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-3 py-2">
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
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
            Installation incluse
          </span>
        </div>
      </div>
    </>
  );
}
