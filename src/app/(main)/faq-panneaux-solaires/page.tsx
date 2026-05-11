import { generateMetadata as generateMetadataHelper } from "@/config/metadata";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/shared/SEO/StructuredData";
import { Metadata } from "next";
import FAQPageContent from "./FAQPageContent";
import { getFaqs, getPageHeader, getSiteSettings } from "@/lib/payload-queries";

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    // Title: 58 chars (was 61 — 1 char over)
    title: "FAQ panneaux solaires Bourg-en-Bresse (Ain 01) | Questions",

    // Description: 150-160 chars
    description:
      "FAQ panneaux solaires à Bourg-en-Bresse (Ain 01) : prix, rentabilité, aides, installation. RGE QualiPV dans l’Ain (01). Devis gratuit 48h.",

    path: "/faq-panneaux-solaires",
    keywords: [
      "FAQ panneaux solaires Bourg-en-Bresse",
      "questions panneaux photovoltaïques Ain",
      "prix rentabilité panneaux solaires",
      "aides installation solaire Bourg-en-Bresse",
      "conseils installateur photovoltaïque Ain",
      "questions installateur RGE QualiPV Bourg-en-Bresse",
    ],
  });
}

export default async function FAQPage() {
  const [faqs, header, siteSettings] = await Promise.all([
    getFaqs(),
    getPageHeader("faq"),
    getSiteSettings(),
  ]);

  return (
    <>
      <FAQPageContent faqs={faqs} header={header} siteSettings={siteSettings} />
      <FAQStructuredData
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Accueil", path: "/" },
          { name: "FAQ Panneaux Solaires", path: "/faq-panneaux-solaires" },
        ]}
      />
    </>
  );
}
