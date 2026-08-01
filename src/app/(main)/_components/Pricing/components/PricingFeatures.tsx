import { Check } from "lucide-react";


interface PricingFeaturesProps {
  features: string[];
}

export function PricingFeatures({ features }: PricingFeaturesProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-3 text-sm text-neutral-700"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500">
            <Check className={`h-3 w-3  text-white`} />
          </span>
          <span className="font-medium">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
