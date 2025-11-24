'use client';

import { useState, useEffect } from 'react';

export function useImageCarousel(
  totalImages: number,
  interval: number = 5000
): number {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalImages);
    }, interval);

    return () => clearInterval(timer);
  }, [totalImages, interval]);

  return currentSlide;
}
