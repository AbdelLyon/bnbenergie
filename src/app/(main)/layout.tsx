import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Navigation/Navbar";
import {
  LocalBusinessStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from "@/components/shared/SEO/StructuredData";
import { Providers } from "../providers";
import { defaultMetadata } from "@/config/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = defaultMetadata;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Inter({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
  weight: "400",
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable}  antialiased`}
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
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
