'use client';
import { ThemeProvider } from 'next-themes';
import { LazyMotion } from 'framer-motion';

const loadFramerFeatures = () =>
  import('@/lib/framer-features').then((m) => m.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="bnb-theme"
      disableTransitionOnChange
    >
      <LazyMotion features={loadFramerFeatures} strict>
        {children}
      </LazyMotion>
    </ThemeProvider>
  );
}
