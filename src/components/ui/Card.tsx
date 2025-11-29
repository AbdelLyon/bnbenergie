/**
 * Composant Card abstrait
 * Wrapper autour de HeroUI Card pour faciliter les migrations futures
 */

import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
  type CardProps as HeroCardProps,
} from '@heroui/card';

export type CardProps = HeroCardProps;

/**
 * Composant Card principal
 *
 * Note: Re-export direct pour éviter les problèmes de types complexes avec forwardRef.
 * L'abstraction reste valide car on importe depuis ce module plutôt que HeroUI directement.
 */
export const Card = HeroCard;

/**
 * Composant CardHeader
 */
export const CardHeader = HeroCardHeader;

/**
 * Composant CardBody
 */
export const CardBody = HeroCardBody;

/**
 * Composant CardFooter
 */
export const CardFooter = HeroCardFooter;
