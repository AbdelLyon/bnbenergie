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
  default: "bg-primary text-white hover:bg-primary-600",
  outline: "border border-white/20 bg-white/10 text-white hover:bg-white/5",
  ghost:
    "bg-transparent text-default-600 hover:bg-default-100 hover:text-foreground",
  secondary: "bg-secondary text-white hover:bg-secondary-600",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-12 px-8 py-4 text-base",
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
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

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
