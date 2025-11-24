import realisationsData from '@/data/realisationsData.json';
import { RealisationsClient } from './RealisationsClient';

export function Realisations() {
  return <RealisationsClient data={realisationsData} />;
}
