"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

export type Variant = "default" | "outline" | "ghost" | "secondary";
type Size = "sm" | "md" | "lg";

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
  type?: "button" | "submit" | "reset";
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANTS: Record<Variant, string> = {
  default: "bg-primary-500 text-white hover:bg-primary-600",
  outline: "border border-white/30 bg-white/5 text-white hover:bg-white/10",
  ghost:
    "bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "p-2",
  md: "p-2.5",
  lg: "p-3",
};

function isLink(props: ButtonProps): props is LinkButtonProps {
  return "href" in props && !!props.href;
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "default",
    size = "md",
    startIcon,
    endIcon,
    fullWidth,
    isIconOnly,
    disabled,
  } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

  const sizeClass = isIconOnly ? ICON_SIZES[size] : SIZES[size];

  const classes = clsx(
    base,
    VARIANTS[variant],
    sizeClass,
    fullWidth && "w-full",
    disabled && "cursor-not-allowed opacity-60 pointer-events-none",
    className,
  );

  if (isLink(props)) {
    return (
      <Link href={props.href} className={classes}>
        {startIcon}
        {children}
        {endIcon}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={props.type ?? "button"}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
