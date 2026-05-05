import { PricingPack } from '@/types';
import { Heading } from '@/components/shared/ui/Heading';

interface PricingDetailsProps {
  pack: PricingPack;
}

export function PricingDetails({ pack }: PricingDetailsProps) {
  return (
    <>
      <Heading as="h3" className="mb-1.5 text-base font-bold text-foreground">
        {pack.name}
      </Heading>
      <p className="mb-5 text-sm text-default-500">{pack.panels}</p>

      <div className="mb-5">
        {pack.originalPrice && (
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="text-xl font-bold text-default-300 line-through">
              {pack.originalPrice} €
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success-600">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              -{Math.round(((parseFloat(pack.originalPrice.replace(/\s/g, '')) - parseFloat(pack.price.replace(/\s/g, ''))) / parseFloat(pack.originalPrice.replace(/\s/g, ''))) * 100)}%
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2">
          <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-primary">Installation incluse</span>
        </div>
      </div>
    </>
  );
}
