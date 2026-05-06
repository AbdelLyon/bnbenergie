'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/shared/ui/Button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LazyMotionDiv } from '@/components/LazyComponents';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        aria-label="Toggle theme"
        className="text-default-500 rounded-full"
      >
        <div className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      aria-label={`Passer au mode ${resolvedTheme === 'dark' ? 'clair' : 'sombre'}`}
      onClick={toggleTheme}
      className="bg-blue-600/10! size-9 mx-1 hover:bg-blue-600/20! rounded-full text-default-500 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <LazyMotionDiv
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun className="size-5 text-amber-500" />
          </LazyMotionDiv>
        ) : (
          <LazyMotionDiv
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon className="size-5 text-blue-600" />
          </LazyMotionDiv>
        )}
      </AnimatePresence>
    </Button>
  );
}
