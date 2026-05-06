'use client';

import { Button } from '@/components/shared/ui/Button';
import { ReactNode } from 'react';

type CTAItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
};

export function CTAGroupButtons({ items }: { items: CTAItem[] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {items.map((item, i) => {
        const props = {
          variant: item.variant,
          size: item.size,
          startIcon: item.iconLeft,
          endIcon: item.iconRight,
          className: item.className,
        };

        if (item.href) {
          return (
            <Button key={i} href={item.href} {...props}>
              {item.label}
            </Button>
          );
        }

        return (
          <Button key={i} onClick={item.onClick} {...props}>
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
