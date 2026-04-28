'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'priority'> {
  fallback?: string;
  /** Marquer l'image comme LCP : désactive le lazy-loading et précharge en haute priorité */
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      quality={85}
      placeholder="blur"
      blurDataURL={fallback}
      onLoad={() => setIsLoading(false)}
      onError={() => setImageSrc(fallback)}
      style={{
        ...props.style,
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}
