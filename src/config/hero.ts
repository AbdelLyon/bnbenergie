import { ConfigTheme } from "@heroui/theme";
import { heroui } from "@heroui/theme";

interface Hero extends ConfigTheme {
   gradients?: {
      warning: string;
      primary: string;
      energy: string;
      ocean: string;
      success: string;
   };
}

export default heroui({
   themes: {
      light: {
         colors: {
            background: "#ffffff",
            foreground: "#171717",
            divider: "#e5e5e5",
            content1: "#ffffff",   // cards
            content2: "#f5f5f5",
            content3: "#ebebeb",
            content4: "#d4d4d4",

            primary: {
               DEFAULT: "#3b82f6",
               foreground: "#ffffff",
               50: "#eff6ff",
               100: "#dbeafe",
               200: "#bfdbfe",
               300: "#93c5fd",
               400: "#60a5fa",
               500: "#3b82f6",
               600: "#2563eb",
               700: "#1d4ed8",
               800: "#1e40af",
               900: "#1e3a8a",
            },

            secondary: {
               DEFAULT: "#f59e0b",
               foreground: "#ffffff",
               50: "#fffbeb",
               100: "#fef3c7",
               200: "#fde68a",
               300: "#fcd34d",
               400: "#fbbf24",
               500: "#f59e0b",
               600: "#d97706",
               700: "#b45309",
               800: "#92400e",
               900: "#78350f",
            },

            success: {
               DEFAULT: "#22c55e",
               foreground: "#ffffff",
               50: "#f0fdf4",
               100: "#dcfce7",
               200: "#bbf7d0",
               300: "#86efac",
               400: "#4ade80",
               500: "#22c55e",
               600: "#16a34a",
               700: "#15803d",
               800: "#166534",
               900: "#14532d",
            },

            warning: { DEFAULT: "#f59e0b", foreground: "#ffffff" },
            danger: { DEFAULT: "#ef4444", foreground: "#ffffff" },

            /* Neutral pur — aucune teinte */
            default: {
               DEFAULT: "#e5e5e5",
               foreground: "#171717",
               50: "#f5f5f5",
               100: "#ebebeb",
               200: "#e0e0e0",
               300: "#d4d4d4",
               400: "#a3a3a3",
               500: "#737373",
               600: "#525252",
               700: "#404040",
               800: "#262626",
               900: "#171717",
            },
         },

         layout: {
            radius: { small: "6px", medium: "10px", large: "16px" },
            fontSize: {
               tiny: "0.75rem",
               small: "0.875rem",
               medium: "1rem",
               large: "1.125rem",
            },
            lineHeight: {
               tiny: "1.15",
               small: "1.35",
               medium: "1.55",
               large: "1.7",
            },
            borderWidth: { small: "1px", medium: "1.5px", large: "2px" },
            boxShadow: {
               small: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
               medium: "0 4px 12px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
               large: "0 12px 32px rgba(0,0,0,0.09), 0 4px 8px rgba(0,0,0,0.05)",
            },
         },

         gradients: {
            warning: "from-amber-400 to-amber-600",
            primary: "from-blue-500 to-blue-700",
            energy: "from-amber-400 via-orange-500 to-yellow-500",
            ocean: "from-cyan-400 to-blue-500",
            success: "from-green-400 to-green-600",
         },
      } as Hero,

      dark: {
         colors: {
            background: "#111111",
            foreground: "#f5f5f5",
            divider: "#2e2e2e",
            content1: "#242424",   // cards — discret sur #111
            content2: "#242424",
            content3: "#2e2e2e",
            content4: "#3a3a3a",

            primary: {
               DEFAULT: "#60a5fa",
               foreground: "#0a0a0a",
               50: "#1e3a5f",
               100: "#1e40af",
               200: "#1d4ed8",
               300: "#2563eb",
               400: "#3b82f6",
               500: "#60a5fa",
               600: "#93c5fd",
               700: "#bfdbfe",
               800: "#dbeafe",
               900: "#eff6ff",
            },

            secondary: {
               DEFAULT: "#fbbf24",
               foreground: "#0a0a0a",
               50: "#78350f",
               100: "#92400e",
               200: "#b45309",
               300: "#d97706",
               400: "#f59e0b",
               500: "#fbbf24",
               600: "#fcd34d",
               700: "#fde68a",
               800: "#fef3c7",
               900: "#fffbeb",
            },

            success: {
               DEFAULT: "#4ade80",
               foreground: "#0a0a0a",
            },

            warning: { DEFAULT: "#fbbf24", foreground: "#0a0a0a" },
            danger: { DEFAULT: "#f87171", foreground: "#ffffff" },

            /* Neutral dark — scale inversé pour cohérence */
            default: {
               DEFAULT: "#2e2e2e",
               foreground: "#f5f5f5",
               50: "#1c1c1c",
               100: "#242424",
               200: "#2e2e2e",   // bordures subtiles en dark
               300: "#3a3a3a",
               400: "#525252",
               500: "#737373",
               600: "#a3a3a3",
               700: "#d4d4d4",
               800: "#e5e5e5",
               900: "#f5f5f5",
            },
         },

         layout: {
            radius: { small: "6px", medium: "10px", large: "16px" },
            fontSize: {
               tiny: "0.75rem",
               small: "0.875rem",
               medium: "1rem",
               large: "1.125rem",
            },
            boxShadow: {
               small: "0 1px 3px rgba(0,0,0,0.3),  0 1px 2px rgba(0,0,0,0.2)",
               medium: "0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)",
               large: "0 12px 32px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.25)",
            },
         },

         gradients: {
            warning: "from-amber-300 to-amber-500",
            primary: "from-blue-400 to-blue-600",
            energy: "from-amber-300 via-orange-400 to-yellow-400",
            ocean: "from-cyan-300 to-blue-400",
            success: "from-green-300 to-green-500",
         },
      } as Hero,
   },
});
