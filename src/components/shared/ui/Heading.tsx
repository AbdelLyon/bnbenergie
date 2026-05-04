import type { HTMLAttributes } from 'react';
import { cn } from '@/components/shared/ui/design-system';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
}

const levelClasses: Record<HeadingLevel, string> = {
  h1: 'text-4xl md:text-5xl leading-tight',
  h2: 'text-3xl md:text-4xl leading-tight',
  h3: 'text-2xl md:text-3xl leading-snug',
  h4: 'text-xl md:text-2xl leading-snug',
  h5: 'text-lg md:text-xl leading-normal',
  h6: 'text-base md:text-lg leading-normal',
};

export function Heading({ as: Tag = 'h2', className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display font-bold uppercase -tracking-tight text-[var(--text-primary)]',
        levelClasses[Tag],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
