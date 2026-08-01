// Design tokens — strings Tailwind réutilisables dans toute l'app.
// Usage : import { tokens } from "@/config/tokens"

export const tokens = {
  // ── Arrière-plans ──────────────────────────────────────────────────────────
  bg: {
    surface: "bg-white",                           // cartes, panels, modals
    elevated: "bg-content1",                        // surface sur-élevée
    subtleFill: "bg-default-50/60",               // zones secondaires, footer de dropdown
    overlay: "bg-black/40 backdrop-blur-md",                        // overlay générique
    navGlass: "bg-black/25 backdrop-blur-xl",                        // navbar transparent sur hero
    backdrop: "bg-black/60 backdrop-blur-sm",                        // fond modal / drawer
    glass: "bg-white backdrop-blur-md",   // navbar / header scrollé
    glassDense: "bg-white/98 backdrop-blur-md",   // dropdown, popover, panel flottant
    hoverPrimary: "hover:bg-primary/5",                                  // hover avec teinte primaire
    hoverContent: "hover:bg-content2/70",                                // hover neutre sur fond clair/sombre
    hoverDefault: "hover:bg-default-50",      // hover neutre sur surfaces claires
    hoverOnDark: "hover:bg-white/10",                                   // hover sur surfaces sombres/transparentes
    activeOnDark: "bg-white/15",                                         // état actif sur surface sombre
    infoSubtle: "bg-blue-500/10",                                      // fond bleu subtil (info, theme toggle)
    hoverInfo: "hover:bg-blue-500/20",                                // hover sur éléments info/blue
  },

  // ── Dégradés ───────────────────────────────────────────────────────────────
  gradient: {
    primary: "bg-gradient-to-r from-primary to-secondary",        // bouton / badge principal
    primaryShadow: "shadow-md shadow-primary/20",                        // ombre colorée pour bouton gradient
  },

  // ── Bordures ───────────────────────────────────────────────────────────────
  border: {
    default: "border border-default border-white/5",                 // bordure générique pour cartes, panels
    subtle: "border border-default-100",
    primary: "border border-primary/20",
    bottom: {
      default: "border-b border-default border-white/5",

    }
  },

  // ── Ombres ─────────────────────────────────────────────────────────────────
  shadow: {
    sm: "shadow-sm shadow-black/5",
    md: "shadow-md shadow-black/5",
    lg: "shadow-lg shadow-black/5",
    xl: "shadow-xl shadow-black/5",
    drop: "shadow-2xl shadow-black/10",            // dropdown, panel flottant
  },

  // ── Rayons ─────────────────────────────────────────────────────────────────
  radius: {
    pill: "rounded-full",
    card: "rounded-xl",
    cardLg: "rounded-2xl",
    icon: "rounded-lg",
    sm: "rounded-md",
  },

  // ── Typographie ────────────────────────────────────────────────────────────
  text: {
    base: "text-foreground",
    muted: "text-foreground/70",
    faint: "text-foreground/40",
    label: "text-xs font-bold uppercase tracking-wide",
    caption: "text-xs opacity-60",
    onDark: "text-white",
    onDarkMuted: "text-white/80",
    onDarkSubtle: "text-white/75",                                       // texte discret sur fond sombre
    info: "text-blue-500",                   // texte info / lune
    warning: "text-amber-500",                                      // texte avertissement / soleil
  },

  // ── Transitions ────────────────────────────────────────────────────────────
  transition: {
    fast: "transition-all duration-150",
    base: "transition-all duration-200",
    slow: "transition-all duration-500",
  },

  // ── Icônes (fond + couleur) ────────────────────────────────────────────────
  iconBg: {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-success/10 text-success",
    danger: "bg-danger/10 text-danger",
    purple: "bg-purple-500/10 text-purple-500",
    info: "bg-blue-500/10 text-blue-500",                          // info, badges neutres
    warning: "bg-amber-500/10 text-amber-500",                        // avertissements
    default: "bg-default-100 text-default-500",
  },

  // ── Mise en page ───────────────────────────────────────────────────────────
  layout: {
    container: "mx-auto max-w-7xl px-6 lg:px-10",
    section: "py-16 lg:py-24",
    sectionSm: "py-10 lg:py-16",
  },
} as const;
