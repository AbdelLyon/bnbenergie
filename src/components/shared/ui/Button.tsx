'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

export type Variant = 'default' | 'outline' | 'ghost' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  isIconOnly?: boolean;
  disabled?: boolean;
};

type LinkButtonProps = SharedProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type NativeButtonProps = SharedProps & {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANTS: Record<Variant, string> = {
  default: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  outline: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
  ghost:
    'bg-transparent text-default-600 hover:bg-default-100 hover:text-foreground',
  secondary:
    'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm sm:text-base',
  lg: 'h-12 px-6 text-base',
};

const ICON_SIZES: Record<Size, string> = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
};

function isLink(props: ButtonProps): props is LinkButtonProps {
  return 'href' in props && !!props.href;
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = 'default',
    size = 'md',
    startIcon,
    endIcon,
    fullWidth,
    isIconOnly,
    disabled,
  } = props;

  const base = clsx(
    'inline-flex items-center justify-center',
    'gap-2 rounded-full font-semibold',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
    'select-none',
    'whitespace-nowrap'
  );

  const sizeClass = isIconOnly ? ICON_SIZES[size] : SIZES[size];

  const classes = clsx(
    base,
    VARIANTS[variant],
    sizeClass,
    fullWidth && 'w-full',
    disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
    className
  );

  const content = (
    <>
      {startIcon && (
        <span className="flex items-center shrink-0">{startIcon}</span>
      )}

      {!isIconOnly && <span className="truncate">{children}</span>}

      {endIcon && <span className="flex items-center shrink-0">{endIcon}</span>}
    </>
  );

  if (isLink(props)) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={props.type ?? 'button'}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {content}
    </button>
  );
}
