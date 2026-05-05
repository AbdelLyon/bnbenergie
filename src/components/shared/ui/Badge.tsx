"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/cn";

type BadgeVariant = "primary" | "warning" | "success" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  glow?: boolean;
  shimmer?: boolean;
}

export function Badge({
  children,
  variant = "primary",
  className,
  glow = false,
  shimmer = false,
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    primary: `
      border-primary/30
      bg-primary/10
      text-primary
      shadow-primary/10
    `,
    warning: `
      border-secondary/30
      bg-secondary/10
      text-secondary
      shadow-secondary/10
    `,
    success: `
      border-success/30
      bg-success/10
      text-success
      shadow-success/10
    `,
    neutral: `
      border-default-300/40
      bg-default-500/10
      text-default-700
      shadow-default-500/10
    `,
  };

  return (
    <span
      className={cn(
        `
        relative inline-flex items-center
        rounded-full border

        px-4 py-1.5 md:px-5 md:py-2
        text-xs md:text-sm font-semibold

        backdrop-blur-md
        shadow-lg
        hover:shadow-xl
        `,
        variants[variant],
        className,
      )}
    >
      {/* glow */}
      {glow && (
        <span className="absolute inset-0 -z-10 rounded-full blur-xl opacity-40 bg-current" />
      )}

      {/* shimmer */}
      {shimmer && (
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      )}

      <span className="relative z-10">{children}</span>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </span>
  );
}
