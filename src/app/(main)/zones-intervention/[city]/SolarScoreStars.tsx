import { Sun } from "lucide-react";

interface SolarScoreStarsProps {
  score: number;
  zoneKey: string;
}

const COLOR_MAP: Record<string, string> = {
  bresse: "text-amber-400",
  dombes: "text-teal-400",
  bugey: "text-emerald-400",
  gex: "text-blue-400",
  "haut-bugey": "text-indigo-400",
};

export function SolarScoreStars({ score, zoneKey }: SolarScoreStarsProps) {
  const colorClass = COLOR_MAP[zoneKey] ?? "text-amber-400";
  const filled = Math.floor(score);
  const partial = score - filled;
  const empty = 5 - Math.ceil(score);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: filled }).map((_, i) => (
        <Sun key={`f-${i}`} className={`h-5 w-5 fill-current ${colorClass}`} />
      ))}
      {partial > 0 && (
        <div className="relative h-5 w-5">
          <Sun className="absolute h-5 w-5 text-neutral-300" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partial * 100}%` }}
          >
            <Sun className={`h-5 w-5 fill-current ${colorClass}`} />
          </div>
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Sun
          key={`e-${i}`}
          className="h-5 w-5 text-neutral-300"
        />
      ))}
      <span className="ml-2 text-sm font-semibold text-neutral-600">
        {score.toFixed(1)}/5
      </span>
    </div>
  );
}
