"use client";

import { ReactNode } from "react";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { Button } from "./Button";
import type { Variant } from "./Button";

type CTAItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
};

interface CTAGroupProps {
  items: CTAItem[];
  align?: "left" | "center" | "right";
  animated?: boolean;
  wrap?: boolean; // 👈 contrôle du comportement responsive
}

export function CTAGroupButtons({
  items,
  align = "center",
  animated = true,
  wrap = true,
}: CTAGroupProps) {
  const justify =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <div
      className={`
        flex flex-row items-center gap-3
        ${wrap ? "flex-wrap" : "flex-nowrap overflow-x-auto"}
        ${justify}
      `}
    >
      {items.map((item, i) => {
        const sharedProps = {
          variant: item.variant,
          size: item.size,
          startIcon: item.iconLeft,
          endIcon: item.iconRight,
          className: item.className,
        };

        const btn = item.href ? (
          <Button href={item.href} {...sharedProps}>
            {item.label}
          </Button>
        ) : (
          <Button onClick={item.onClick} {...sharedProps}>
            {item.label}
          </Button>
        );

        const wrapperClass = "shrink-0";

        if (!animated) {
          return (
            <div key={i} className={wrapperClass}>
              {btn}
            </div>
          );
        }

        return (
          <LazyMotionDiv
            key={i}
            className={wrapperClass}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {btn}
          </LazyMotionDiv>
        );
      })}
    </div>
  );
}
