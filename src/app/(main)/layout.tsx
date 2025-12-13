import { Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Footer } from '@/components/shared/Footer/Footer';
import { Navbar } from '@/components/shared/Navigation/Navbar';
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { Providers } from '../providers';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content="fr" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
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
