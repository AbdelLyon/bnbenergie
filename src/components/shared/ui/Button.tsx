"use client";

import Link from "next/link";
import { forwardRef, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
};

type ButtonProps =
  | (ButtonBaseProps & {
      href: string;
      onClick?: never;
      type?: never;
    })
  | (ButtonBaseProps & {
      href?: never;
      onClick?: () => void;
      type?: "button" | "submit" | "reset";
    });

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-2 border-primary-500 bg-primary-500 text-white hover:bg-primary-600",
  secondary: "border border-white/30 bg-white/5 text-white hover:bg-white/10",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
    fullWidth,
    ...props
  },
  ref,
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";

  const classes = clsx(
    base,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} ref={ref as any}>
        {startIcon}
        {children}
        {endIcon}
      </Link>
    );
  }

  // 👉 BUTTON
  return (
    <button
      ref={ref as any}
      className={classes}
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
});
