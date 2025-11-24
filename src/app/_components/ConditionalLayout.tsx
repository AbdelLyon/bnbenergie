'use client';

import { usePathname } from 'next/navigation';
import Footer from './features/Footer/Footer';
import { Navbar } from './features/Navigation/Navbar';
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from './features/SEO/StructuredData';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <LocalBusinessStructuredData />
      <WebSiteStructuredData />
      <OrganizationStructuredData />
    </>
  );
}
