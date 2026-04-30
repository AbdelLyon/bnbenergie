import { LazyMotionDiv } from "@/components/LazyComponents";
import { type ZoneTheme } from "@/config/city-themes";
import { Sun, BarChart3, Zap, Clock, Award } from "lucide-react";
import { ZONE_ACCENT } from "./constants";
import { SolarScoreStars } from "./SolarScoreStars";

interface SolarDetailCardProps {
  zone: ZoneTheme;
  cityName: string;
}

export function SolarDetailCard({ zone, cityName }: SolarDetailCardProps) {
  const accentClass = ZONE_ACCENT[zone.key] ?? "from-amber-400 to-orange-500";

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative mb-16 overflow-hidden rounded-3xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 shadow-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Score */}
        <div className="flex flex-col justify-center gap-4 p-8 lg:border-r border-neutral-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <Sun className="h-4 w-4" />
            Potentiel solaire
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-foreground mb-1">
              {cityName}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              Zone : {zone.label}
            </p>
            <SolarScoreStars score={zone.solarScore} zoneKey={zone.key} />
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Évaluation basée sur les données météo locales, l&apos;altitude et
            l&apos;orientation moyenne des toitures.
          </p>
        </div>
        {/* Métriques */}
        <div className="grid grid-cols-2 gap-px bg-neutral-100 dark:bg-white/5 lg:col-span-2">
          {[
            {
              icon: <BarChart3 className="h-5 w-5" />,
              label: "Ensoleillement",
              value: `${zone.ensoleillement.toLocaleString("fr-FR")}`,
              unit: "kWh/m²/an",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              label: "Production (6 kWc)",
              value: zone.annualProduction,
              unit: "estimée/an",
            },
            {
              icon: <Clock className="h-5 w-5" />,
              label: "Retour investissement",
              value: `${zone.roiMin}–${zone.roiMax} ans`,
              unit: "estimation",
            },
            {
              icon: <Award className="h-5 w-5" />,
              label: "Économies annuelles",
              value: zone.annualSavings,
              unit: "dès la 1ʳᵉ année",
            },
          ].map(({ icon, label, value, unit }) => (
            <div
              key={label}
              className="flex flex-col gap-1 bg-white dark:bg-content1 p-6"
            >
              <div
                className={`mb-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br ${accentClass} text-white`}
              >
                {icon}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {label}
              </p>
              <p className="text-xl font-bold text-neutral-900 dark:text-foreground">
                {value}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LazyMotionDiv>
  );
}
