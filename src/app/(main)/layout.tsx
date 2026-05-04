import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import { Footer } from '@/components/shared/Footer/Footer';
import { Navbar } from '@/components/shared/Navigation/Navbar';
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { Providers } from '../providers';
import { defaultMetadata } from '@/config/metadata';
import type { Metadata } from 'next';

import { ChatBotLazy } from '@/components/shared/ui/ChatBotLazy';

export const metadata: Metadata = defaultMetadata;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <Navbar />
        {children}
        <Footer />

        <ChatBotLazy />
      </Providers>

      <LocalBusinessStructuredData />
      <WebSiteStructuredData />
      <OrganizationStructuredData />

      <Suspense fallback={null}>
        <Analytics />
        <SpeedInsights />
      </Suspense>
    </>
  );
}
