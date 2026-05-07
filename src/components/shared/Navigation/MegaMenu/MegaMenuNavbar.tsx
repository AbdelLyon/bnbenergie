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
import { Menu, X, Phone, ChevronDown, ArrowRight, Zap } from "lucide-react";
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

type LogoProps = { isScrolled: boolean; subtitle: string; className?: string };

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

const iconColors: Record<string, string> = {
  Settings: tokens.iconBg.primary,
  Camera: tokens.iconBg.purple,
  DollarSign: tokens.iconBg.success,
  Shield: tokens.iconBg.secondary,
  Euro: tokens.iconBg.primary,
  MapPin: tokens.iconBg.danger,
  HelpCircle: tokens.iconBg.success,
  Home: tokens.iconBg.primary,
  Mail: tokens.iconBg.purple,
};

export function MegaMenuNavbar({ data }: { data: MegaMenuData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  const isScrolled = useScrollPosition(120);
  const pathname = usePathname();

  const isActive = (href?: string) =>
    href
      ? pathname === href || (href !== "/" && pathname.startsWith(href))
      : false;

  const isMegaActive = (item: MegaMenuData["menuCategories"][number]) =>
    item.sections?.some((section) =>
      section.links.some((link) => isActive(link.href)),
    ) ?? false;

  useBodyScrollLock(isOpen);

  return (
    <>
      <LazyMotionNav
        initial={false}
        className={`fixed top-0 right-0 left-0 z-50 ${tokens.transition.slow} ${tokens.border.bottom.default}  ${
          isScrolled
            ? `${tokens.bg.glass} ${tokens.shadow.lg} `
            : tokens.bg.navGlass
        }`}
      >
        <div className={tokens.layout.container}>
          <div className="flex h-16 items-center justify-between">
            {/* LEFT: LOGO */}
            <NavLogo
              isScrolled={isScrolled}
              subtitle={data.logo.subtitle}
            />

            {/* RIGHT: MOBILE (theme + burger) */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeSwitcher />

              <LazyMotionButton
                whileTap={{ scale: 0.88 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${tokens.transition.base} ${
                  isScrolled
                    ? `bg-default-100 hover:bg-default-200 ${tokens.text.base}`
                    : `bg-white/10 ${tokens.bg.hoverOnDark} ${tokens.text.onDark}`
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
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </LazyMotionDiv>
                  ) : (
                    <LazyMotionDiv
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </LazyMotionDiv>
                  )}
                </AnimatePresence>
              </LazyMotionButton>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {data.menuCategories.map((item) => (
                <div key={item.label} className="relative">
                  {/* ton code desktop inchangé */}
                </div>
              ))}

              <div
                className={`mx-3 h-4 w-px ${tokens.transition.base} ${
                  isScrolled ? "bg-default-200" : "bg-white/20"
                }`}
              />

              <Link
                href={data.cta.phoneHref}
                className={`group inline-flex items-center gap-2 ${tokens.radius.sm} px-4 py-1.5 text-sm font-semibold ${tokens.transition.base} ${
                  isScrolled
                    ? `bg-secondary ${tokens.text.onDark}`
                    : `bg-white/10 ${tokens.text.onDark}`
                }`}
              >
                <Phone className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 z-40 ${tokens.bg.backdrop} lg:hidden`}
            />

            <LazyMotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className={`fixed top-0 right-0 bottom-0 z-50 flex w-full flex-col overflow-hidden ${tokens.bg.surface} sm:max-w-sm lg:hidden`}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4">
                <NavLogo
                  isScrolled={isScrolled}
                  subtitle={data.logo.subtitle}
                />

                <LazyMotionButton
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-default-100"
                >
                  <X className="h-4 w-4" />
                </LazyMotionButton>
              </div>

              {/* NAV */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-0.5">
                  {data.menuCategories.map((item) => (
                    <div key={item.label}>{item.label}</div>
                  ))}
                </div>
              </nav>

              {/* FOOTER (theme switcher SUPPRIMÉ ICI) */}
              <div className={`px-4 py-4 border-t border-default-100 ${tokens.bg.subtleFill}`}>
                <a
                  href={data.cta.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-white"
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
