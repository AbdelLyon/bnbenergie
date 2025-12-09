'use client';

import { HeroUIProvider,  } from '@heroui/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { REACT_QUERY_CONFIG } from '@/config/cache';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  // Créer une instance de QueryClient par session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: REACT_QUERY_CONFIG.STALE_TIME,
            gcTime: REACT_QUERY_CONFIG.GC_TIME,
            retry: REACT_QUERY_CONFIG.RETRY_COUNT,
            retryDelay: REACT_QUERY_CONFIG.RETRY_DELAY,
            refetchOnWindowFocus: false, // Désactiver le refetch sur focus pour économiser les requêtes
            refetchOnReconnect: true, // Refetch quand la connexion est rétablie
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
          defaultTheme="system"
          enableSystem
          storageKey="bnb-theme"
        >
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
