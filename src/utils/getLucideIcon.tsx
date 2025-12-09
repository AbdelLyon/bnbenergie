import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function getLucideIcon(iconName: string | undefined): LucideIcon {
  // Si l'iconName est undefined ou vide, retourner l'icône par défaut
  if (!iconName) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Icon name is undefined, using default HelpCircle icon');
    }
    return LucideIcons.HelpCircle;
  }

  const cleanIconName = iconName.trim();
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[
    cleanIconName
  ];

  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ Icon "${iconName}" not found in lucide-react`);
      console.log(
        '📋 Available icons sample:',
        Object.keys(LucideIcons)
          .filter(
            (k) =>
              typeof (LucideIcons as Record<string, unknown>)[k] === 'function'
          )
          .slice(0, 20)
      );
    }
    return LucideIcons.HelpCircle;
  }

  return IconComponent;
}
