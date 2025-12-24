'use client';

import { HeroUIProvider } from '@heroui/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { REACT_QUERY_CONFIG } from '@/config/cache';
import { ThemeProvider } from 'next-themes';

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
      <HeroUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="bnb-theme"
        >
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
