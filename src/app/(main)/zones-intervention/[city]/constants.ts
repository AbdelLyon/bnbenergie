import {
  ClipboardList,
  Award,
  Wrench,
  PlugZap,
} from "lucide-react";

export const ZONE_ACCENT: Record<string, string> = {
  bresse: "from-amber-400 to-orange-500",
  dombes: "from-teal-400 to-cyan-500",
  bugey: "from-emerald-400 to-green-500",
  gex: "from-blue-400 to-indigo-500",
  "haut-bugey": "from-indigo-400 to-purple-500",
};

export const ZONE_BADGE_BG: Record<string, string> = {
  bresse: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  dombes: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  bugey: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  gex: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "haut-bugey": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

export const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Étude gratuite",
    text: "Analyse toiture, exposition, consommation. Simulation de production personnalisée sous 48h.",
    duration: "48h",
  },
  {
    icon: Award,
    number: "02",
    title: "Devis & Aides",
    text: "Devis détaillé avec toutes les aides applicables (MaPrimeRénov', CEE, prime autoconsommation).",
    duration: "Gratuit",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Installation RGE",
    text: "Pose par nos techniciens certifiés QualiPV. Garantie décennale sur l'installation.",
    duration: "1–2 jours",
  },
  {
    icon: PlugZap,
    number: "04",
    title: "Mise en service",
    text: "Raccordement Enedis, Consuel, contrat d'injection. Monitoring en temps réel inclus.",
    duration: "Clé en main",
  },
];
