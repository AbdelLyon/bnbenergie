import { About } from "@/app/(main)/_components/About/About";
import { Benefits } from "@/app/(main)/_components/Benefits/Benefits";
import { GoogleReviewsWrapper } from "@/app/(main)/_components/GoogleReviews/GoogleReviewsWrapper";
import { HomeHeader } from "@/app/(main)/_components/HomeHeader/HomeHeader";
import { Pricing } from "@/app/(main)/_components/Pricing/Pricing";
import { Realisations } from "@/app/(main)/_components/Realisations/Realisations";
import { PageMainWrapper } from "@/components/shared/layout/PageMainWrapper";
import { generateMetadata as generateMetadataHelper } from "@/config/metadata";
import { Metadata } from "next";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: "Installateur Panneaux Solaires Bourg-en-Bresse (ain) | BNB Énergie",
    description:
      "Installateur panneaux solaires certifié RGE QualiPV à Bourg-en-Bresse. Devis gratuit 48h, installation clé en main dans l'Ain.",
    path: "/",
    keywords: [
      "installateur panneaux solaires Bourg-en-Bresse",
      "installateur panneaux photovoltaïques Bourg-en-Bresse",
      "installation panneaux solaires Bourg-en-Bresse",
      "panneaux solaires Bourg-en-Bresse",
      "photovoltaïque Bourg-en-Bresse",
      "installateur RGE QualiPV Bourg-en-Bresse",
      "devis panneaux solaires Bourg-en-Bresse gratuit",
      "installation solaire Ain 01",
      "installateur panneaux solaires Ain 01",
      "installateur panneaux photovoltaïques Ain 01",
      "autoconsommation panneaux solaires Ain 01",
    ],
  });
}

export default function Home() {
  return (
    <>
      <PageMainWrapper variant="amber">
        <HomeHeader />
        <About />
        <Benefits />
      </PageMainWrapper>
      <GoogleReviewsWrapper />
      <PageMainWrapper variant="amber">
        <Realisations />
        <Pricing />
      </PageMainWrapper>
    </>
  );
}
