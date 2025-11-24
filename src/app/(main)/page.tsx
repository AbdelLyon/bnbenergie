import { About } from '../_components/features/About/About';
import { Benefits } from '../_components/features/Benefits/Benefits';
import { Hero } from '../_components/features/Hero/Hero';
import { Pricing } from '../_components/features/Pricing/Pricing';
import { Realisations } from '../_components/features/Realisations/Realisations';
import { PricingStructuredData } from '../_components/features/SEO/StructuredData';

export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <Hero />
        <About />
        <Benefits />
        <Realisations />
        <Pricing />
      </main>
      <PricingStructuredData />
    </>
  );
}
