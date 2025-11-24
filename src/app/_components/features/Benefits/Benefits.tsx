import benefitsData from '@/data/aboutData.json';
import { BenefitsClient } from './BenefitsClient';

export function Benefits() {
  return <BenefitsClient data={benefitsData} />;
}
