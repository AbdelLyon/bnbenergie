"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { tokens } from "@/config/tokens";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`size-8 mx-1 ${tokens.radius.pill}`} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Passer au mode ${isDark ? "clair" : "sombre"}`}
      className={`flex size-8 mx-1 items-center justify-center ${tokens.radius.pill} ${tokens.transition.base} ${tokens.bg.infoSubtle} ${tokens.bg.hoverInfo} cursor-pointer`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <LazyMotionDiv
            key="sun"
            initial={{ y: -16, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun className={`h-4 w-4 ${tokens.text.warning}`} />
          </LazyMotionDiv>
        ) : (
          <LazyMotionDiv
            key="moon"
            initial={{ y: -16, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon className={`h-4 w-4 ${tokens.text.info}`} />
          </LazyMotionDiv>
        )}
      </AnimatePresence>
    </button>
  );
}
