import headerData from '@/data/headerData.json';
import { HeroClient } from './HeroClient';

export function Hero() {
  return <HeroClient data={headerData} />;
}
