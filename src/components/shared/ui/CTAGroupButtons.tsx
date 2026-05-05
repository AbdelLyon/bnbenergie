"use client";

import { ReactNode } from "react";
import { LazyMotionDiv } from "@/components/LazyComponents";
import { Button } from "./Button";

type CTAItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
};

interface CTAGroupProps {
  items: CTAItem[];
  direction?: "row" | "column";
  align?: "left" | "center" | "right";
  animated?: boolean;
}

export function CTAGroupButtons({
  items,
  direction = "row",
  align = "center",
  animated = true,
}: CTAGroupProps) {
  const justify =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <div
      className={`flex gap-4 ${
        direction === "row" ? "flex-row" : "flex-col"
      } ${justify}`}
    >
      {items.map((item, i) => {
        const btn = (
          <Button
            key={i}
            href={item.href}
            variant={item.variant}
            size={item.size}
            startIcon={item.iconLeft}
            endIcon={item.iconRight}
            className={item.className}
          >
            {item.label}
          </Button>
        );

        if (!animated) return btn;

        return (
          <LazyMotionDiv
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            {btn}
          </LazyMotionDiv>
        );
      })}
    </div>
  );
}
