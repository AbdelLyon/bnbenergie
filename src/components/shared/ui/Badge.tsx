import type { HTMLAttributes } from 'react';
import { cn, ds } from './design-system';

type BadgeVariant = 'primary' | 'success' | 'neutral';

const styles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200',
  success: 'bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-200',
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200',
};

export function Badge({ className, variant = 'neutral', ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      {...props}
      className={cn('inline-flex items-center px-2.5 py-1 text-xs font-semibold uppercase tracking-wide', ds.radius.sm, styles[variant], className)}
    />
  );
}
