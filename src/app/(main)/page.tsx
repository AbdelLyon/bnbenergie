import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';

// Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <HomeHeader />
        <About />
        <Benefits />
        <Realisations />
        <Pricing />
      </main>
      <PricingStructuredData />
    </>
  );
}
