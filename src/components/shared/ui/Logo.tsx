"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { Zap } from "lucide-react";

interface LogoProps {
  isScrolled?: boolean;
  showRGEBadge?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  subtitle?: string;
}

export function Logo({
  isScrolled = false,
  showRGEBadge = true,
  size = "md",
  animated = true,
  subtitle,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-7 w-7",
  };

  const containerSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
    xl: "p-3",
  };

  return (
    <div className="relative inline-block">
      <LazyMotionDiv
        whileHover={animated ? { scale: 1.05 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${containerSizeClasses[size]} ${
          isScrolled
            ? "bg-linear-to-br from-secondary/20 to-secondary/10 border border-secondary/30 backdrop-blur-md"
            : "bg-linear-to-br from-white/15 to-white/5 border border-white/25 backdrop-blur-lg"
        }`}
      >
        <Zap
          className={`${sizeClasses[size]} transition-colors duration-300 ${
            isScrolled
              ? "text-secondary drop-shadow-sm"
              : "text-amber-300 drop-shadow-md"
          }`}
          strokeWidth={2}
          fill={isScrolled ? "rgb(245 158 11 / 0.2)" : "rgb(252 211 77 / 0.15)"}
        />
      </LazyMotionDiv>

      {subtitle && (
        <div
          className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium transition-colors duration-300 ${
            isScrolled ? "text-secondary/70" : "text-white"
          }`}
        >
          {subtitle}
        </div>
      )}

      {showRGEBadge && (
        <div
          className={`absolute -right-2 -bottom-1 rounded-lg text-[7px] font-bold tracking-wider uppercase px-2 py-1 shadow-md transition-all duration-300 ${
            isScrolled
              ? "bg-linear-to-br from-secondary to-secondary-600 text-white border border-secondary-400"
              : "bg-linear-to-br from-amber-400 to-amber-500 text-white border border-amber-300"
          }`}
        >
          RGE
        </div>
      )}
    </div>
  );
}
