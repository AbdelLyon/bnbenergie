import type { HTMLAttributes } from 'react';
import { cn, ds } from './design-system';

export function Modal({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-neutral-900/60 p-4"
    >
      <div
        className={cn(
          'w-full max-w-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-6',
          ds.radius.xl,
          ds.shadow.lg,
          className,
        )}
        {...props}
      />
    </div>
  );
}
