"use client";

import { HeroUIProvider } from "@heroui/system";

import { ThemeProvider } from "next-themes";
import { LazyMotion } from "framer-motion";

const loadFramerFeatures = () =>
  import("@/lib/framer-features").then((m) => m.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="bnb-theme"
      >
        <LazyMotion features={loadFramerFeatures} strict>
          {children}
        </LazyMotion>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
