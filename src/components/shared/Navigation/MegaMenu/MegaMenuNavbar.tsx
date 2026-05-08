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

//new MegaMenuData
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
        className={`fixed top-0 right-0 left-0 z-50 ${tokens.transition.slow} ${tokens.border.bottom.default} ${
          isScrolled
            ? `${tokens.bg.glass} ${tokens.shadow.lg}`
            : tokens.bg.navGlass
        }`}
      >
        <div className={tokens.layout.container}>
          <div className="flex h-16 items-center justify-between">
            <NavLogo
              isScrolled={isScrolled}
              subtitle={data.logo.subtitle}
            />

            {/* Desktop nav */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {data.menuCategories.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.type === "mega" && setActiveMega(item.label)
                  }
                  onMouseLeave={() => setActiveMega(null)}
                >
                  {item.type === "link" ? (
                    <Link
                      href={item.href ?? "#"}
                      className={`relative flex items-center ${tokens.radius.sm} px-4 mx-1 py-1.5 text-sm font-medium ${tokens.transition.base} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        isActive(item.href)
                          ? isScrolled
                            ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/15"
                            : `${tokens.bg.activeOnDark} ${tokens.text.onDark} font-semibold`
                          : isScrolled
                            ? `${tokens.text.muted} ${tokens.bg.hoverPrimary} hover:text-primary`
                            : `${tokens.text.onDarkSubtle} ${tokens.bg.hoverOnDark} hover:text-white`
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex cursor-pointer items-center gap-1 ${tokens.radius.sm} px-4 mx-1 py-1.5 text-sm font-medium ${tokens.transition.base} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        isMegaActive(item)
                          ? isScrolled
                            ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/15"
                            : `${tokens.bg.activeOnDark} ${tokens.text.onDark} font-semibold`
                          : isScrolled
                            ? `${tokens.text.muted} ${tokens.bg.hoverPrimary} hover:text-primary`
                            : `${tokens.text.onDarkSubtle} ${tokens.bg.hoverOnDark} hover:text-white`
                      }`}
                    >
                      {item.label}

                      <ChevronDown
                        className={`h-3.5 w-3.5 ${tokens.transition.base} ${
                          activeMega === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  <AnimatePresence>
                    {item.type === "mega" && activeMega === item.label && (
                      <LazyMotionDiv
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute top-full left-1/2 z-50 w-140 -translate-x-1/2 pt-3"
                      >
                        <div
                          className={`overflow-hidden ${tokens.radius.cardLg} border border-content2/80 ${tokens.bg.glass} ${tokens.shadow.drop}`}
                        >
                          <div className="grid grid-cols-2 gap-0 p-4">
                            {item.sections?.map((section, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx % 2 === 0
                                    ? "border-r border-default dark:border-content2/80 pr-4"
                                    : "pl-4"
                                }
                              >
                                <div className="flex items-center gap-1.5 mb-2.5 px-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />

                                  <p
                                    className={`${tokens.text.label} ${tokens.text.faint}`}
                                  >
                                    {section.title}
                                  </p>
                                </div>

                                <div className="space-y-0.5">
                                  {section.links.map((link) => {
                                    const IconComponent = getLucideIcon(
                                      link.icon,
                                    );

                                    const iconCls =
                                      iconColors[link.icon] ??
                                      tokens.iconBg.default;

                                    const childActive = isActive(link.href);

                                    return (
                                      <Link
                                        key={link.href}
                                        href={link.href ?? "#"}
                                        className={`group flex items-center gap-3 ${tokens.radius.sm} p-2.5 ${tokens.transition.base} cursor-pointer ${
                                          childActive
                                            ? "bg-primary/8 ring-1 ring-primary/15"
                                            : tokens.bg.hoverDefault
                                        }`}
                                        onClick={() => setActiveMega(null)}
                                      >
                                        <div
                                          className={`flex h-9 w-9 shrink-0 items-center justify-center ${tokens.radius.icon} ${iconCls} transition-transform duration-200 group-hover:scale-110`}
                                        >
                                          <IconComponent
                                            className="h-4 w-4"
                                            strokeWidth={2}
                                          />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                          <div
                                            className={`text-[12.5px] font-semibold transition-colors duration-150 ${
                                              childActive
                                                ? "text-primary"
                                                : "text-foreground/85 group-hover:text-foreground"
                                            }`}
                                          >
                                            {link.label}
                                          </div>

                                          <p
                                            className={`line-clamp-1 text-[11px] ${tokens.text.faint} mt-0.5`}
                                          >
                                            {link.description}
                                          </p>
                                        </div>

                                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/50 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer dropdown */}
                          <div
                            className={`px-4 py-2.5 border-t border-default dark:border-content2/80 ${tokens.bg.subtleFill} flex items-center justify-between`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Zap className="h-3 w-3 text-primary/60" />

                              <span
                                className={`text-[11px] ${tokens.text.faint} font-medium`}
                              >
                                Certifié RGE · Intervention rapide
                              </span>
                            </div>

                            <Link
                              href="/contact"
                              className={`text-[11px] font-semibold text-primary/70 hover:text-primary ${tokens.transition.base} flex items-center gap-1`}
                              onClick={() => setActiveMega(null)}
                            >
                              Devis gratuit

                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </LazyMotionDiv>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Divider */}
              <div
                className={`mx-3 h-4 w-px ${tokens.transition.base} ${
                  isScrolled ? "bg-default-200" : "bg-white/20"
                }`}
              />

              {/* CTA */}
              <Link
                href={data.cta.phoneHref}
                className={`group inline-flex items-center gap-2 ${tokens.radius.sm} px-4 py-1.5 text-sm font-semibold ${tokens.transition.base} hover:scale-[1.04] active:scale-[0.98] ${
                  isScrolled
                    ? `bg-secondary ${tokens.text.onDark} ${tokens.shadow.md} hover:bg-secondary/90`
                    : `bg-white/10 ${tokens.text.onDark} ${tokens.bg.hoverOnDark}`
                }`}
              >
                <Phone
                  className={`h-3.5 w-3.5 ${tokens.transition.base} group-hover:rotate-12`}
                />

                {data.cta.label}
              </Link>

              <ThemeSwitcher />
            </div>

            {/* MOBILE RIGHT */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeSwitcher />

              {/* Burger */}
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
          </div>
        </div>
      </LazyMotionNav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <LazyMotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 z-40 ${tokens.bg.backdrop} lg:hidden`}
            />

            {/* Drawer */}
            <LazyMotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 right-0 bottom-0 z-50 flex w-full flex-col overflow-hidden ${tokens.bg.surface} sm:max-w-sm lg:hidden`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <NavLogo
                  isScrolled
                  subtitle={data.logo.subtitle}
                />

                <LazyMotionButton
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setIsOpen(false)}
                  className={`flex h-8 w-8 items-center justify-center ${tokens.radius.sm} bg-default-100 hover:bg-default-200 dark:bg-content2 dark:hover:bg-content3 ${tokens.text.muted} ${tokens.transition.base}`}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </LazyMotionButton>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-0.5">
                  {data.menuCategories.map((item, i) => (
                    <LazyMotionDiv
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {item.type === "link" ? (
                        <Link
                          href={item.href ?? "#"}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 ${tokens.radius.sm} px-3 py-2.5 text-sm font-medium ${tokens.transition.base} ${
                            isActive(item.href)
                              ? "bg-primary/8 text-primary font-semibold"
                              : `${tokens.text.muted} ${tokens.bg.hoverPrimary} hover:text-primary`
                          }`}
                        >
                          {(() => {
                            const Icon = getLucideIcon(item.icon);

                            const cls =
                              iconColors[item.icon] ??
                              tokens.iconBg.default;

                            return (
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center ${tokens.radius.icon} ${cls}`}
                              >
                                <Icon
                                  className="h-3.5 w-3.5"
                                  strokeWidth={2}
                                />
                              </span>
                            );
                          })()}

                          {item.label}
                        </Link>
                      ) : (
                        <div>
                          <p
                            className={`mb-1 mt-4 px-3 flex items-center gap-1.5 ${tokens.text.label} ${tokens.text.faint}`}
                          >
                            <span className="h-1 w-1 rounded-full bg-primary/50" />

                            {item.label}
                          </p>

                          <div className="space-y-0.5">
                            {item.sections?.map((section) =>
                              section.links.map((link) => {
                                const Icon = getLucideIcon(link.icon);

                                const cls =
                                  iconColors[link.icon] ??
                                  tokens.iconBg.default;

                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href ?? "#"}
                                    onClick={() => setIsOpen(false)}
                                    className={`group flex items-center gap-3 ${tokens.radius.sm} px-3 py-2.5 text-sm ${tokens.transition.base} ${tokens.bg.hoverDefault}`}
                                  >
                                    <span
                                      className={`flex h-7 w-7 shrink-0 items-center justify-center ${tokens.radius.icon} ${cls} transition-transform duration-200 group-hover:scale-110`}
                                    >
                                      <Icon
                                        className="h-3.5 w-3.5"
                                        strokeWidth={2}
                                      />
                                    </span>

                                    <div className="min-w-0">
                                      <div className="font-semibold text-foreground/85 text-[13px]">
                                        {link.label}
                                      </div>

                                      <div
                                        className={`text-[11px] ${tokens.text.faint} truncate`}
                                      >
                                        {link.description}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              }),
                            )}
                          </div>
                        </div>
                      )}
                    </LazyMotionDiv>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div
                className={`px-4 py-4 border-t border-default-100 ${tokens.bg.subtleFill} space-y-3`}
              >
                <a
                  href={data.cta.phoneHref}
                  className={`flex w-full items-center justify-center gap-2 ${tokens.radius.sm} ${tokens.gradient.primary} px-6 py-3 text-sm font-bold ${tokens.text.onDark} ${tokens.gradient.primaryShadow} shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]`}
                >
                  <Phone className="h-4 w-4" />

                  {data.cta.label}
                </a>

                <div className="flex items-center gap-1.5 px-1">
                  <Zap className="h-3 w-3 text-primary/50" />

                  <p
                    className={`text-[11px] ${tokens.text.faint} font-medium`}
                  >
                    Devis gratuit · Sans engagement
                  </p>
                </div>
              </div>
            </LazyMotionDiv>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
