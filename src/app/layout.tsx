import './globals.css';
import { Metadata } from 'next';
import { env } from '@/lib/env';

// Root metadata shared across all routes
export const metadata: Metadata = {
  metadataBase: new URL(
    env.NEXT_PUBLIC_SITE_URL || env.SERVER_URL || 'https://www.bnbenergie01.com'
  ),
};

// This root layout only imports global styles
// Each route group provides its own <html> and <body> tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
