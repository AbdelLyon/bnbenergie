/**
 * Export centralisé des composants UI
 * Tous les composants UI doivent être importés depuis ce fichier
 *
 * @example
 * import { Button, Card, Accordion } from '@/components/ui';
 */

export { Button, type ButtonProps } from './Button';
export { Card, CardHeader, CardBody, CardFooter, type CardProps } from './Card';
export {
  Accordion,
  AccordionItem,
  type AccordionProps,
  type AccordionItemProps,
} from './Accordion';
