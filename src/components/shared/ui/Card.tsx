import type { HTMLAttributes } from 'react';
import { cn, ds } from './design-system';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-[var(--border-default)] bg-[var(--bg-card)] p-6',
        ds.radius.lg,
        ds.shadow.md,
        className,
      )}
      {...props}
    />
  );
}
