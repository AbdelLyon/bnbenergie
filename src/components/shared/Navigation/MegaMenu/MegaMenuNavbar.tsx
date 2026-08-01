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
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { useBodyScrollLock } from "@/hooks";
import { getLucideIcon } from "@/utils/getLucideIcon";
import Image from "next/image";

type MegaMenuData = {
  logo: {
    title: string;
    subtitle: string;
  };
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
  cta: {
    label: string;
    phoneHref: string;
  };
};




const iconColors: Record<string, string> = {
  Settings: "bg-primary/10 text-primary",
  Camera: "bg-purple-500/10 text-purple-500",
  DollarSign: "bg-success/10 text-success",
  Shield: "bg-secondary/10 text-secondary",
  Euro: "bg-primary/10 text-primary",
  MapPin: "bg-danger/10 text-danger",
  HelpCircle: "bg-success/10 text-success",
  Home: "bg-primary/10 text-primary",
  Mail: "bg-purple-500/10 text-purple-500",
};

export function MegaMenuNavbar({ data }: { data: MegaMenuData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const isScrolled: boolean = true;
  const pathname = usePathname();

  const isActive = (href?: string) =>
    href
      ? pathname === href || (href !== "/" && pathname.startsWith(href))
      : false;

  useBodyScrollLock(isOpen);

  return (
    <>
      <LazyMotionNav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg shadow-black/5"
            : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
           
          <Image alt="logo" src="/logo-final.png" className="object-contain -mt-2.5" width={120} height={40} />

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
                      className={`relative flex items-center rounded-full px-5 py-1.5 mx-1 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        isActive(item.href)
                          ? isScrolled
                            ? "bg-primary/8 text-primary font-semibold"
                            : "bg-white/10 text-white font-semibold"
                          : isScrolled
                            ? "text-default-600 hover:bg-default-100 hover:text-foreground"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex cursor-pointer items-center gap-1 rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        activeMega === item.label
                          ? isScrolled
                            ? "bg-primary/8 text-primary font-medium"
                            : "bg-white/10 text-white font-medium"
                          : isScrolled
                            ? "text-default-600 hover:bg-default-100 hover:text-foreground"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          activeMega === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  <AnimatePresence>
                    {item.type === "mega" && activeMega === item.label && (
                      <LazyMotionDiv
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 z-50 w-145 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-black/5">
                          <div className="grid grid-cols-2 gap-0 p-4">
                            {item.sections?.map((section, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx % 2 === 0
                                    ? "border-r border-default-100 pr-4"
                                    : "pl-4"
                                }
                              >
                                <p className="mb-2 px-2 text-[10px] font-bold tracking-widest text-default-400 uppercase">
                                  {section.title}
                                </p>
                                <div className="space-y-0.5">
                                  {section.links.map((link) => {
                                    const IconComponent = getLucideIcon(
                                      link.icon,
                                    );
                                    const iconCls =
                                      iconColors[link.icon] ??
                                      "bg-default-100 text-default-500";
                                    return (
                                      <Link
                                        key={link.href}
                                        href={link.href ?? "#"}
                                        className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-150 hover:bg-default-50"
                                        onClick={() => setActiveMega(null)}
                                      >
                                        <div
                                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconCls}`}
                                        >
                                          <IconComponent
                                            className="h-4 w-4"
                                            strokeWidth={2}
                                          />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="text-sm font-medium text-foreground">
                                            {link.label}
                                          </div>
                                          <p className="line-clamp-1 text-[11px] text-default-400">
                                            {link.description}
                                          </p>
                                        </div>
                                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-default-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </LazyMotionDiv>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Divider */}
              <div
                className={`mx-2 h-4 w-px ${isScrolled ? "bg-default-200" : "bg-white/20"}`}
              />

              {/* CTA */}
              <Link
                href={data.cta.phoneHref}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                  isScrolled
                    ? "bg-secondary text-white shadow-small hover:shadow-medium"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/25"
                }`}
              >
                <Phone className="h-3.5 w-3.5" />
                {data.cta.label}
              </Link>

            </div>

            {/* Burger */}
            <LazyMotionButton
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <LazyMotionDiv
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X
                      className={`h-5 w-5 ${isScrolled ? "text-foreground" : "text-white"}`}
                    />
                  </LazyMotionDiv>
                ) : (
                  <LazyMotionDiv
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu
                      className={`h-5 w-5 ${isScrolled ? "text-foreground" : "text-white"}`}
                    />
                  </LazyMotionDiv>
                )}
              </AnimatePresence>
            </LazyMotionButton>
          </div>
        </div>
      </LazyMotionNav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <LazyMotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <LazyMotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-full flex-col overflow-hidden bg-background sm:max-w-sm lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between h-16 border-b border-default-100 px-5 py-4">
                <Image alt="logo" src="/logo-final.png" className="object-contain -mt-2.5" width={120} height={40} />

                <LazyMotionButton
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-default-100 text-default-500 transition-all hover:bg-default-200"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </LazyMotionButton>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto px-5 py-4">
                <div className="space-y-1">
                  {data.menuCategories.map((item, i) => (
                    <LazyMotionDiv
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      {item.type === "link" ? (
                        <Link
                          href={item.href ?? "#"}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                            isActive(item.href)
                              ? "bg-primary/8 text-primary font-semibold"
                              : "text-default-600 hover:bg-default-50 hover:text-foreground"
                          }`}
                        >
                          {(() => {
                            const Icon = getLucideIcon(item.icon);
                            const cls =
                              iconColors[item.icon] ??
                              "bg-default-100 text-default-500";
                            return (
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cls}`}
                              >
                                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                              </span>
                            );
                          })()}
                          {item.label}
                        </Link>
                      ) : (
                        <div>
                          <p className="mb-1 mt-3 px-3 text-[10px] font-bold tracking-widest text-default-400 uppercase">
                            {item.label}
                          </p>
                          <div className="space-y-1">
                            {item.sections?.map((section) =>
                              section.links.map((link) => {
                                const Icon = getLucideIcon(link.icon);
                                const cls =
                                  iconColors[link.icon] ??
                                  "bg-default-100 text-default-500";
                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href ?? "#"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-default-50"
                                  >
                                    <span
                                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cls}`}
                                    >
                                      <Icon
                                        className="h-3.5 w-3.5"
                                        strokeWidth={2}
                                      />
                                    </span>
                                    <div>
                                      <div className="font-semibold text-foreground">
                                        {link.label}
                                      </div>
                                      <div className="text-[11px] text-default-400">
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

              {/* Drawer footer */}
              <div className="border-t border-default-100 px-5 py-4 space-y-3">
                <a
                  href={data.cta.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-medium transition-all hover:scale-[1.02]"
                >
                  <Phone className="h-4 w-4" />
                  {data.cta.label}
                </a>
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs text-default-400">
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
