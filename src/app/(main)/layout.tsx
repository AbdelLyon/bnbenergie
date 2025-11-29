import { Lato, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Footer } from '@/components/shared/Footer/Footer';
import { Navbar } from '@/components/shared/Navigation/Navbar';
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { defaultMetadata } from '@/config/metadata';
import { Providers } from '../providers';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

export const metadata = defaultMetadata;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content="fr" />
      </head>
      <body
        className={`${lato.variable} ${montserrat.variable} antialiased`}
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
