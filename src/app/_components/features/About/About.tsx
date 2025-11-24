import aboutData from '@/data/aboutData.json';
import { AboutClient } from './AboutClient';

export function About() {
  return <AboutClient data={aboutData} />;
}
