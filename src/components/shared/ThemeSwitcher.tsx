"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full"
        aria-label="toggle theme"
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={`Passer au mode ${
        resolvedTheme === "dark" ? "clair" : "sombre"
      }`}
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors duration-150 hover:bg-content1"
    >
      <AnimatePresence initial={false} mode="sync">
        {resolvedTheme === "dark" ? (
          <m.div
            key="sun"
            className="absolute"
            initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotate: 20 }}
            transition={{
              duration: 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <Sun className="h-5 w-5 text-secondary" />
          </m.div>
        ) : (
          <m.div
            key="moon"
            className="absolute"
            initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotate: 20 }}
            transition={{
              duration: 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <Moon className="h-5 w-5 text-primary" />
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}
