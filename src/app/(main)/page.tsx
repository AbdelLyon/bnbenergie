import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';

// ISR - Incremental Static Regeneration
// Page d'accueil avec forte fréquence de mise à jour (HIGH_FREQUENCY)
export const revalidate = 30;

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
