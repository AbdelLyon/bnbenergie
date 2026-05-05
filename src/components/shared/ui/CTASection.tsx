"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";
import { cn } from "@/utils/cn";
import { Heading } from "@/components/shared/ui/Heading";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  phoneNumber: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  variant?: "gradient" | "solid" | "minimal";
  className?: string;
}

export function CTASection({
  title,
  description,
  phoneNumber,
  primaryButton,
  secondaryButton,
  className,
}: CTASectionProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-default-200 bg-content1 p-7 shadow-small",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10">
            <Phone className="h-5 w-5 text-secondary" />
          </div>

          <Heading className="mb-2 text-base font-bold text-foreground">
            {title}
          </Heading>

          <p className="text-sm leading-relaxed text-default-500">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryButton && (
            <Link
              href={primaryButton.href}
              className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
            >
              {primaryButton.text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}

          {phoneNumber && (
            <Link
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-default-200 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-default-300 hover:bg-default-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {phoneNumber}
            </Link>
          )}

          {secondaryButton && (
            <Link
              href={secondaryButton.href}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full border border-default-200 px-5 py-2.5 text-sm font-semibold text-default-600 transition-all duration-200 hover:bg-default-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2 sm:w-auto"
            >
              {secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </LazyMotionDiv>
  );
}
