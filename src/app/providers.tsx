'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { REACT_QUERY_CONFIG } from '@/config/cache';
import { LazyMotion } from 'framer-motion';

const loadFramerFeatures = () =>
  import('@/lib/framer-features').then((m) => m.default);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: REACT_QUERY_CONFIG.STALE_TIME,
            gcTime: REACT_QUERY_CONFIG.GC_TIME,
            retry: REACT_QUERY_CONFIG.RETRY_COUNT,
            retryDelay: REACT_QUERY_CONFIG.RETRY_DELAY,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: false,
          },
          mutations: {
            retry: REACT_QUERY_CONFIG.RETRY_COUNT,
            retryDelay: REACT_QUERY_CONFIG.RETRY_DELAY,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={loadFramerFeatures} strict>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
}
