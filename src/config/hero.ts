import { heroui } from '@heroui/theme';

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // blue-500
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
          DEFAULT: "#f59e0b", // amber-500
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
          DEFAULT: "#22c55e", // green-500
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
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#18181b", // neutral-900
        content1: "#f9fafb", // gray-50 - Cards/containers en light
        content2: "#f3f4f6", // gray-100 - Sections alternées
        content3: "#d3d4d5ff", // gray-200 - Borders subtiles
        content4: "#d1d5db", // gray-300 - Éléments désactivés
        default: {
          DEFAULT: "#e5e7eb",
          foreground: "#18181b",
        },
        divider: "#e5e7eb", // gray-200
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "#60a5fa", // blue-400 - plus lumineux en dark
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
          DEFAULT: "#fbbf24", // amber-400 - plus lumineux en dark
          foreground: "#0a0a0b",
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
          DEFAULT: "#4ade80", // green-400
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#fbbf24",
          foreground: "#0a0a0b",
        },
        danger: {
          DEFAULT: "#f87171",
          foreground: "#ffffff",
        },
        background: "#02040a", // Noir profond élégant
        foreground: "#fafafa", // Texte clair
        content1: "#18181b", // Cards/containers
        content2: "#27272a", // Sections alternées
        content3: "#3f3f46", // Borders subtiles
        content4: "#52525b", // Éléments désactivés
        default: {
          DEFAULT: "#3f3f46",
          foreground: "#fafafa",
        },
        divider: "#27272a",
      },
    },
  },
});
