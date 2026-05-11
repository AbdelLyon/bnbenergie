import { generateMetadata as generateMetadataHelper } from "@/config/metadata";
import { BreadcrumbStructuredData } from "@/components/shared/SEO/StructuredData";
import ZonesPageContent from "./ZonesPageContent";
import {
  getInterventionZones,
  getPageHeader,
  getSiteSettings,
} from "@/lib/payload-queries";
import { Metadata } from "next";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: "Installateur panneaux solaires à Bourg-en-Bresse (01) | 50 km",

    description:
      "Installateur panneaux solaires à Bourg-en-Bresse (Ain 01) puis dans tout l’Ain : Oyonnax, Bellegarde, Gex, Ferney-Voltaire. Devis gratuit 48h.",

    path: "/zones-intervention",
    keywords: [
      "installateur panneaux solaires Bourg-en-Bresse Ain 01",
      "zone intervention installateur solaire Ain",
      "panneaux solaires Bourg-en-Bresse",
      "panneaux solaires Ain 01",
      "installateur RGE QualiPV Bourg-en-Bresse",
      "installateur panneaux solaires Oyonnax",
      "installation photovoltaïque Bellegarde Ain",
      "panneaux solaires Gex Ain",
      "installateur panneaux solaires Ain 01",
      "couverture géographique installateur Ain 01",
      "déplacement gratuit installation solaire Ain",
    ],
  });
}

export default async function ZonesInterventionPage() {
  const [zones, header, siteSettings] = await Promise.all([
    getInterventionZones(),
    getPageHeader("zones"),
    getSiteSettings(),
  ]);

  return (
    <>
      <ZonesPageContent
        zones={zones}
        header={header}
        siteSettings={siteSettings}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Accueil", path: "/" },
          { name: "Zones d'Intervention", path: "/zones-intervention" },
        ]}
      />
    </>
  );
}
