"use client";

import Link from "next/link";
import React, { forwardRef, ReactNode } from "react";
import clsx from "clsx";

export type Variant = "default" | "outline" | "ghost" | "secondary";
export type Size = "sm" | "md" | "lg";

type BaseProps = {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

type ButtonAsLink = BaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANTS: Record<Variant, string> = {
  default: "bg-primary text-white hover:bg-primary-600",
  outline: "border border-white/20 bg-white/10 text-white",
  ghost: "bg-transparent text-white",
  secondary: "bg-secondary text-white",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

function isLink(props: ButtonProps): props is ButtonAsLink {
  return "href" in props;
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    children,
    className,
    variant = "default",
    size = "md",
    startIcon,
    endIcon,
    fullWidth,
    disabled,
  } = props;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  );

  if (isLink(props)) {
    return (
      <Link
        href={props.href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      onClick={props.onClick}
      disabled={disabled}
      type={props.type}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
