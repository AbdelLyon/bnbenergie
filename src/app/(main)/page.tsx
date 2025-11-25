import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';

export const dynamic = 'force-static';

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
