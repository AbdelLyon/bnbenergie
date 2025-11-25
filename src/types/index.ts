/**
 * Shared TypeScript type definitions for the application
 * Centralized types improve consistency and reduce duplication
 */

// SectionHeader interface retirée car non utilisée

/**
 * Icon-based card with statistics
 */
export interface IconCard {
  icon: string;
  title: string;
  content: string;
  gradient?: string;
  stat?: string;
  statLabel?: string;
}

/**
 * Pricing pack data structure
 */
export interface PricingPack {
  name: string;
  panels: string;
  price: string;
  originalPrice?: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

/**
 * Pricing section data
 */
export interface PricingData {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  packs: PricingPack[];
  footer: {
    note: string;
    tags: string[];
  };
}

/**
 * About section data
 */
export interface AboutData {
  header: {
    badge: string;
    title: string | string[];
    description: string;
  };
  benefits: {
    title: string;
    list: string[];
  };
  cta: {
    title: string;
    description: string;
    button1: string;
    button2: string;
  };
  seoContent: IconCard[];
}

/**
 * Benefits section data (subset of AboutData)
 */
export interface BenefitsData {
  benefits: {
    title: string;
    list: string[];
  };
  cta: {
    title: string;
    description: string;
    button1: string;
    button2: string;
  };
}

// AnimationProps interface retirée car non utilisée

/**
 * Common component props
 */
export interface BaseCardProps {
  index: number;
  className?: string;
}

/**
 * Section wrapper background variants
 */
export type SectionBackground = 'white' | 'gray' | 'gradient' | 'dark';

/**
 * Section container width variants
 */
export type SectionWidth = 'default' | 'narrow' | 'wide' | 'full';

/**
 * Text alignment options
 */
export type TextAlignment = 'left' | 'center' | 'right';
