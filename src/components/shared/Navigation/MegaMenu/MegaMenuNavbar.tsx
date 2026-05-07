"use client";

import { AnimatePresence } from "framer-motion";
import {
  LazyMotionDiv,
  LazyMotionButton,
  LazyMotionNav,
} from "@/components/LazyComponents";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ArrowRight, Zap } from "lucide-react";
import { useScrollPosition, useBodyScrollLock } from "@/hooks";
import { getLucideIcon } from "@/utils/getLucideIcon";
import { Logo as LogoIcon } from "@/components/shared/ui/Logo";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { tokens } from "@/config/tokens";

type MegaMenuData = {
  logo: { title: string; subtitle: string };
  menuCategories: Array<{
    label: string;
    type: "link" | "mega";
    href?: string;
    icon: string;
    description?: string;
    sections?: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
        description: string;
        icon: string;
      }>;
    }>;
    order: number;
  }>;
  cta: { label: string; phoneHref: string };
};

type LogoProps = {
  isScrolled: boolean;
  subtitle: string;
  className?: string;
};

const NavLogo = ({ isScrolled, subtitle, className }: LogoProps) => (
  <Link href="/" className={`group flex items-center gap-3 ${className ?? ""}`}>
    <LogoIcon isScrolled={isScrolled} showRGEBadge size="md" />
    <div className="leading-none">
      <div
        className={`font-display text-[17px] font-bold tracking-tight transition-colors duration-300 ${
          isScrolled ? tokens.text.base : tokens.text.onDark
        }`}
      >
        <span className="text-secondary">B</span>NB{" "}
        <span className="text-primary">É</span>NERGIE
      </div>
      <p
        className={`mt-0.5 text-[10px] font-medium tracking-wide transition-colors duration-300 ${
          isScrolled ? "text-default-400" : "text-white/50"
        }`}
      >
        {subtitle}
      </p>
    </div>
  </Link>
);

export function MegaMenuNavbar({ data }: { data: MegaMenuData }) {
  const [isOpen, setIsOpen] = useState(false);

  const isScrolled = useScrollPosition(120);
  const pathname = usePathname();

  useBodyScrollLock(isOpen);

  const isActive = (href?: string) =>
    href
      ? pathname === href || (href !== "/" && pathname.startsWith(href))
      : false;

  return (
    <>
      {/* NAVBAR */}
      <LazyMotionNav
        className={`fixed top-0 left-0 right-0 z-50 ${tokens.transition.slow} ${
          isScrolled ? tokens.bg.glass : tokens.bg.navGlass
        }`}
      >
        <div className={tokens.layout.container}>
          <div className="flex h-16 items-center justify-between">

            {/* LOGO */}
            <NavLogo isScrolled={isScrolled} subtitle={data.logo.subtitle} />

            {/* MOBILE RIGHT */}
            <div className="flex items-center gap-2 lg:hidden">

              {/* Theme switch moved here */}
              <ThemeSwitcher />

              {/* Burger */}
              <LazyMotionButton
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isScrolled
                    ? "bg-default-100 text-default-900"
                    : "bg-white/10 text-white"
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <LazyMotionDiv
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-5 w-5" />
                    </LazyMotionDiv>
                  ) : (
                    <LazyMotionDiv
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-5 w-5" />
                    </LazyMotionDiv>
                  )}
                </AnimatePresence>
              </LazyMotionButton>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:flex items-center gap-4">

              {data.menuCategories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={data.cta.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" />
                {data.cta.label}
              </Link>

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </LazyMotionNav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <LazyMotionDiv
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <LazyMotionDiv
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white lg:hidden"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4">
                <NavLogo
                  isScrolled={isScrolled}
                  subtitle={data.logo.subtitle}
                />

                <LazyMotionButton
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </LazyMotionButton>
              </div>

              {/* MENU */}
              <div className="px-4 py-4 space-y-2">
                {data.menuCategories.map((item) => (
                  <div key={item.label}>{item.label}</div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="border-t p-4">
                <a
                  href={data.cta.phoneHref}
                  className="flex items-center justify-center gap-2 font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  {data.cta.label}
                </a>
              </div>
            </LazyMotionDiv>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
