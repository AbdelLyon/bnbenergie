import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Footer } from '@/components/shared/Footer/Footer';
import { Navbar } from '@/components/shared/Navigation/Navbar';
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { Providers } from '../providers';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>

      <body
        className={`${jakarta.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <LocalBusinessStructuredData />
        <WebSiteStructuredData />
        <OrganizationStructuredData />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
