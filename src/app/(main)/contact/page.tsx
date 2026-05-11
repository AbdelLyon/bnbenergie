import { generateMetadata as generateMetadataHelper } from "@/config/metadata";
import { BreadcrumbStructuredData } from "@/components/shared/SEO/StructuredData";
import ContactPageContent from "./ContactPageContent";
import { Metadata } from "next";
import { getPageHeader, getSiteSettings } from "@/lib/payload-queries";

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    // Title: 57 chars (was 62 — too long)
    title: "Devis panneaux solaires à Bourg-en-Bresse (Ain 01) | 48h",

    description:
      "Devis gratuit 48h pour panneaux solaires à Bourg-en-Bresse (Ain 01). Installateur RGE QualiPV, pose clé en main et garantie décennale.",

    path: "/contact",
    keywords: [
      "devis panneaux solaires Bourg-en-Bresse gratuit",
      "devis gratuit installation photovoltaïque Ain",
      "contact installateur RGE Bourg-en-Bresse",
      "demander devis panneaux solaires Ain",
      "estimation prix panneaux solaires Bourg-en-Bresse",
      "rendez-vous installation solaire Ain",
    ],
  });
}

export default async function ContactPage() {
  const [header, siteSettings] = await Promise.all([
    getPageHeader("contact"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ContactPageContent header={header} siteSettings={siteSettings} />
      <BreadcrumbStructuredData
        items={[
          { name: "Accueil", path: "/" },
          { name: "Devis Gratuit", path: "/contact" },
        ]}
      />
    </>
  );
}
