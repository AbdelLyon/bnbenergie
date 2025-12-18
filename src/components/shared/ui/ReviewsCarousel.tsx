'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ReviewCard } from './ReviewCard';
import type { Review } from '@/data/google-reviews-data';

interface ReviewsCarouselProps {
  reviews: Review[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Carousel moderne et responsive pour les avis
 * Desktop: 3 cartes | Tablette: 2 cartes | Mobile: 1 carte
 */
export function ReviewsCarousel({
  reviews,
  autoPlay = true,
  autoPlayInterval = 5000,
}: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calcul du nombre de cartes visibles selon la taille d'écran
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablette
      } else {
        setCardsPerView(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, goToNext]);

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Conteneur du carousel */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 p-2">
          <AnimatePresence initial={false} custom={direction}>
            {visibleReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`
                  ${cardsPerView === 1 ? 'w-full' : ''}
                  ${cardsPerView === 2 ? 'w-[calc(50%-12px)]' : ''}
                  ${cardsPerView === 3 ? 'w-[calc(33.333%-16px)]' : ''}
                  shrink-0
                `}
              >
                <ReviewCard review={review} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer flex size-10 items-center justify-center rounded-full border border-neutral-200 dark:border-content2 bg-white/90 dark:bg-content1/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0 && !autoPlay}
            aria-label="Avis précédent"
          >
            <ChevronLeft className="size-6 text-neutral-700 dark:text-default-500" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 dark:border-content2 bg-white/90 dark:bg-content1/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === maxIndex && !autoPlay}
            aria-label="Avis suivant"
          >
            <ChevronRight className="size-6 text-neutral-700 dark:text-default-500" />
          </motion.button>
        </>
      )}

      {maxIndex > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Aller au groupe d'avis ${idx + 1}`}
            >
              {/* Dot background */}
              <div
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-500 dark:bg-amber-400'
                      : 'w-2 bg-neutral-300 dark:bg-content2 group-hover:bg-amber-300 dark:group-hover:bg-amber-600'
                  }
                `}
              />

              {/* Glow effect au hover */}
              {idx === currentIndex && (
                <motion.div
                  layoutId="activeSlide"
                  className="absolute inset-0 -z-10 rounded-full bg-amber-400/30 blur-md"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
