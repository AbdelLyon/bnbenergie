'use client';

import { ANIMATION_DURATIONS, TRANSITIONS } from '@/app/_config/constants';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TitleProps {
  title: string[];
  subtitle: string;
}

export function Title({ title, subtitle }: TitleProps) {
  const fullText = title[1] || '';
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < fullText.length) {
      // Mode écriture avec variation aléatoire (100-200ms)
      const typingSpeed = Math.random() * 100 + 100;
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === fullText.length) {
      // Pause avant d'effacer (2-3 secondes)
      const pauseDuration = Math.random() * 1000 + 2000;
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText.length > 0) {
      // Mode effacement avec variation aléatoire (50-100ms)
      const deletingSpeed = Math.random() * 50 + 50;
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText.length === 0) {
      // Pause avant de recommencer (500-1000ms)
      const restartDelay = Math.random() * 500 + 500;
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, restartDelay);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, fullText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-3"
    >
      <h1 className="px-2 font-sans text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        <motion.span
          className="inline-block text-white drop-shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATIONS.slow,
            delay: 0.2,
            ...TRANSITIONS.easeOut,
          }}
        >
          {title[0]}
        </motion.span>{' '}
        <span className="inline-block bg-[linear-gradient(to_right,#fbbf24,#f59e0b,#f97316,#3b82f6,#2563eb)] bg-clip-text pb-2 text-transparent drop-shadow-sm">
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: ANIMATION_DURATIONS.slow,
          delay: 0.6,
        }}
        className="px-2 text-lg font-normal text-white drop-shadow-md md:text-xl lg:text-2xl"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
