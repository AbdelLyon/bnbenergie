'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from '@heroui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Éviter les problèmes d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Afficher un placeholder pendant le chargement
  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="light"
        radius="full"
        aria-label="Toggle theme"
        className="text-default-500"
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      aria-label={`Passer au mode ${resolvedTheme === 'dark' ? 'clair' : 'sombre'}`}
      onPress={toggleTheme}
      className="relative overflow-hidden text-default-500 hover:bg-default-100 dark:hover:bg-default-50/10 transition-all duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun className="h-5 w-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon className="h-5 w-5 text-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
