"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";
import { cn } from "@/utils/classenames";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  phoneNumber: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: "gradient" | "solid" | "minimal";
  className?: string;
}

export function CTASection({
  title,
  description,
  phoneNumber,
  primaryButton,
  secondaryButton,
  variant = "gradient",
  className,
}: CTASectionProps) {
  const variants = {
    gradient: "bg-linear-to-br from-primary-600 to-cyan-700 ",
    solid: "bg-neutral-900",
    minimal: "bg-neutral-50",
  };

  const textColors = {
    gradient: "text-white",
    solid: "text-white",
    minimal: "text-neutral-900",
  };

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={cn(
        "relative overflow-hidden rounded-3xl p-4 md:p-8 lg:p-12 mb-10",
        variants[variant],
        className,
      )}
    >
      <div className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3
            className={cn(
              "mb-3 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl",
              textColors[variant],
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "mb-10 text-base leading-relaxed md:text-lg",
              variant === "minimal"
                ? "text-neutral-600"
                : "text-white/90",
            )}
          >
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryButton && (
              <Link
                href={primaryButton.href ?? "#"}
                className={cn(
                  "group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold transition-all duration-200 hover:shadow-md sm:w-auto",
                  variant === "minimal"
                    ? "bg-secondary-600 text-white hover:bg-secondary-700"
                    : "bg-white text-secondary-600 hover:bg-secondary-50",
                )}
              >
                {primaryButton.text}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {phoneNumber && (
              <Link
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className={cn(
                  "group flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-base font-semibold transition-all duration-200 sm:w-auto",
                  variant === "minimal"
                    ? "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                    : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
                )}
              >
                <Phone className="h-5 w-5" />
                {phoneNumber}
              </Link>
            )}

            {secondaryButton && (
              <Link
                href={secondaryButton.href ?? "#"}
                className={cn(
                  "group flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-base font-semibold transition-all duration-200 sm:w-auto",
                  variant === "minimal"
                    ? "border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100"
                    : "border-white/30 text-white hover:bg-white/10",
                )}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </LazyMotionDiv>
  );
}
