import type { HTMLAttributes } from 'react';
import { cn, ds } from './design-system';

export function IconWrapper({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center border border-[var(--border-default)] bg-neutral-50 text-primary-700 dark:bg-neutral-800 dark:text-primary-300',
        ds.radius.md,
        className,
      )}
      {...props}
    />
  );
}
