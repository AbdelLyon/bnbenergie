/**
 * Composant Accordion abstrait
 * Wrapper autour de HeroUI Accordion pour faciliter les migrations futures
 */

import {
  Accordion as HeroAccordion,
  AccordionItem as HeroAccordionItem,
  type AccordionProps as HeroAccordionProps,
  type AccordionItemProps as HeroAccordionItemProps,
} from '@heroui/accordion';

export type AccordionProps = HeroAccordionProps;
export type AccordionItemProps = HeroAccordionItemProps;

/**
 * Composant Accordion principal
 *
 * Note: Re-export direct pour éviter les problèmes de types complexes avec forwardRef.
 * L'abstraction reste valide car on importe depuis ce module plutôt que HeroUI directement.
 */
export const Accordion = HeroAccordion;

/**
 * Composant AccordionItem
 */
export const AccordionItem = HeroAccordionItem;
