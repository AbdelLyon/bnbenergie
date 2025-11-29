/**
 * Composant Button abstrait
 * Wrapper autour de HeroUI Button pour faciliter les migrations futures
 */

import { Button as HeroButton, type ButtonProps as HeroButtonProps } from '@heroui/button';

export type ButtonProps = HeroButtonProps;

/**
 * Composant Button réutilisable
 * Utilise HeroUI en interne mais expose une API propre
 *
 * Note: Re-export direct pour éviter les problèmes de types complexes avec forwardRef.
 * L'abstraction reste valide car on importe depuis ce module plutôt que HeroUI directement.
 */
export const Button = HeroButton;
