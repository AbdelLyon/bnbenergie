import { SiteSetting } from "@/payload-types";

export interface RelatedCity {
  name: string;
  slug: string;
}

export interface CityPageContentProps {
  cityName: string;
  zoneName: string;
  siteSettings: SiteSetting;
  relatedCities?: RelatedCity[];
}
