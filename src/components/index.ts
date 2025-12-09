// UI Components (Client-safe)
export { AidCard } from './shared/ui/AidCard';
export { CTASection } from './shared/ui/CTASection';
export { FeatureCard } from './shared/ui/FeatureCard';
export { IntroSection } from './shared/ui/IntroSection';
export { Logo } from './shared/ui/Logo';
export { ProjectCard } from './shared/ui/ProjectCard';
export { ScrollDownButton } from './shared/ui/ScrollDownButton';
export { ServiceStep } from './shared/ui/ServiceStep';
export { StatCard } from './shared/ui/StatCard';
export { Stats } from './shared/ui/Stats';
export { StatsGrid } from './shared/ui/StatsGrid';
export { Title } from './shared/ui/Title';
export { WarrantyCard } from './shared/ui/WarrantyCard';

// Theme-aware Components (Client-safe)
export { ThemeText } from './shared/ui/ThemeText';

// Layout Components (Client-safe)
export { PageHeader } from './shared/layout/PageHeader';
export { PageMainWrapper } from './shared/layout/PageMainWrapper';
export {
  SectionContainer,
  SectionWrapper,
} from './shared/layout/SectionWrapper';

// Effects (Client-side)
export { BackgroundEffects } from './shared/effects/BackgroundEffects';
export { HeaderBackground } from './shared/effects/HeaderBackground';
export { ParticlesEffect } from './shared/effects/ParticlesEffect';

// Animations (Client-side)
export { AnimationOrchestrator, OrchestratedSection } from './shared/animations';

// NOTE: Footer and Navbar are server components that use Payload queries
// Import them directly from their files:
// import { Footer } from '@/components/shared/Footer/Footer'
// import { Navbar } from '@/components/shared/Navigation/Navbar'
