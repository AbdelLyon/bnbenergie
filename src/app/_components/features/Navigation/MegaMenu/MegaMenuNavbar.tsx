'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@heroui/button';
import { useScrollPosition, useBodyScrollLock } from '@/app/_hooks';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';
import { Logo as LogoIcon } from '@/app/_components/shared/ui/Logo';

type MegaMenuData = {
  logo: {
    title: string;
    subtitle: string;
  };
  menuCategories: Array<{
    label: string;
    type: 'link' | 'mega';
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
    phone: string;
    phoneHref: string;
  };
};

type LogoPrpos = {
  isScrolled: boolean;
  subtitle: string;
  className?: string;
};

const Logo = ({ isScrolled, subtitle, className }: LogoPrpos) => {
  return (
    <Link href="/" className={`group flex items-center gap-2 ${className}`}>
      <LogoIcon isScrolled={isScrolled} showRGEBadge={true} size="md" />
      <div>
        <div
          className={`font-display text-xl font-bold transition-all duration-300 ease-out ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          BNB{' '}
          <span
            className={`bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}
          >
            ÉNERGIE
          </span>
        </div>
        <p
          className={`font-display ml-1 text-[10px] transition-all duration-300 ease-out ${
            isScrolled ? 'text-gray-600' : 'text-white/80'
          }`}
        >
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

export function MegaMenuNavbar({ data }: { data: MegaMenuData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const isScrolled = useScrollPosition(20);

  useBodyScrollLock(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white shadow-lg shadow-black/5'
            : 'bg-black/10 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-32">
          <div className="flex h-[70px] items-center justify-between">
            {}
            <Logo isScrolled={isScrolled} subtitle={data.logo.subtitle} />

            {}
            <div className="hidden items-center gap-1 lg:flex">
              {data.menuCategories.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                  onMouseEnter={() =>
                    item.type === 'mega' && setActiveMega(item.label)
                  }
                  onMouseLeave={() => setActiveMega(null)}
                >
                  {item.type === 'link' ? (
                    <Link
                      href={item.href!}
                      className={`group relative rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        isScrolled
                          ? 'text-gray-700 hover:text-blue-600'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:w-3/4" />
                    </Link>
                  ) : (
                    <button
                      className={`group flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        isScrolled
                          ? 'text-gray-700 hover:text-blue-600'
                          : 'text-white/90 hover:text-white'
                      } ${
                        activeMega === item.label
                          ? isScrolled
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-white/10 text-white'
                          : ''
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeMega === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}

                  {}
                  <AnimatePresence>
                    {item.type === 'mega' && activeMega === item.label && (
                      <div className="absolute top-full left-1/2 z-50 w-[580px] -translate-x-1/2 pt-2">
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-black/5">
                          {}
                          <div className="grid grid-cols-2 gap-0 p-5">
                            {item.sections?.map((section, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx % 2 === 0
                                    ? 'border-r border-gray-100 pr-5'
                                    : 'pl-5'
                                }
                              >
                                {}
                                <h3 className="mb-3 px-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                  {section.title}
                                </h3>

                                {}
                                <div className="space-y-0.5">
                                  {section.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      className="group flex items-center gap-3 rounded-lg p-2.5 transition-all duration-200 hover:bg-gray-50"
                                      onClick={() => setActiveMega(null)}
                                    >
                                      {}
                                      {(() => {
                                        const IconComponent = getLucideIcon(
                                          link.icon
                                        );

                                        const iconColors: Record<
                                          string,
                                          string
                                        > = {
                                          Settings:
                                            'bg-linear-to-br from-blue-500 to-cyan-500',
                                          Camera:
                                            'bg-linear-to-br from-purple-500 to-pink-500',
                                          DollarSign:
                                            'bg-linear-to-br from-green-500 to-emerald-500',
                                          Shield:
                                            'bg-linear-to-br from-amber-500 to-orange-500',
                                          Euro: 'bg-linear-to-br from-indigo-500 to-blue-500',
                                          MapPin:
                                            'bg-linear-to-br from-red-500 to-rose-500',
                                          HelpCircle:
                                            'bg-linear-to-br from-teal-500 to-cyan-500',
                                        };
                                        const bgColor =
                                          iconColors[link.icon] ||
                                          'bg-linear-to-br from-gray-500 to-gray-600';

                                        return (
                                          <div
                                            className={`rounded-xl p-2 ${bgColor} shadow-md transition-all group-hover:shadow-lg`}
                                          >
                                            <IconComponent
                                              className="h-4 w-4 text-white"
                                              strokeWidth={2}
                                            />
                                          </div>
                                        );
                                      })()}

                                      {}
                                      <div className="min-w-0 flex-1">
                                        <div className="text-sm leading-tight font-semibold text-gray-700 transition-colors group-hover:text-gray-900">
                                          {link.label}
                                        </div>
                                        <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-gray-400">
                                          {link.description}
                                        </p>
                                      </div>

                                      {}
                                      <svg
                                        className="h-3.5 w-3.5 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-gray-600 group-hover:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {}
              <Button
                as="a"
                href={data.cta.phoneHref}
                size="sm"
                className="ml-2 bg-linear-to-r from-blue-600 to-cyan-600 font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-lg"
                startContent={<Phone className="h-4 w-4" />}
              >
                {data.cta.label}
              </Button>
            </div>

            {}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="relative z-50 flex items-center justify-center rounded-xl transition-all lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu
                      className={`h-6 w-6 ${
                        isScrolled ? 'text-gray-900' : 'text-white'
                      }`}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {}
      <AnimatePresence>
        {isOpen && (
          <>
            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden"
            />

            {}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-full flex-col overflow-hidden bg-white sm:max-w-md lg:hidden"
            >
              {}
              <div className="relative bg-black/90 px-6 py-6">
                {}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="absolute top-2 right-2 z-50 flex size-7 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
                  aria-label="Close menu"
                >
                  <X className="size-5 text-white" />
                </motion.button>

                {}
                <Logo isScrolled={isScrolled} subtitle={data.logo.subtitle} />

                {}
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-400/30 blur-3xl" />
              </div>

              {}
              <nav className="flex-1 overflow-y-auto bg-gray-100 px-6 py-6">
                <div className="space-y-3">
                  {data.menuCategories.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    >
                      {item.type === 'link' ? (
                        <Link
                          href={item.href!}
                          onClick={toggleMenu}
                          className="group flex items-start gap-3 rounded-xl border border-amber-600/30 bg-white p-3.5 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                        >
                          {(() => {
                            const IconComponent = getLucideIcon(item.icon);
                            const iconColors: Record<string, string> = {
                              Home: 'from-blue-500 to-cyan-500',
                              Mail: 'from-purple-500 to-pink-500',
                            };
                            const gradient =
                              iconColors[item.icon] ||
                              'from-gray-500 to-gray-600';

                            return (
                              <div
                                className={`rounded-lg bg-linear-to-br p-2.5 ${gradient} shrink-0 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md`}
                              >
                                <IconComponent
                                  className="h-4 w-4 text-white"
                                  strokeWidth={2}
                                />
                              </div>
                            );
                          })()}
                          <div className="min-w-0 flex-1">
                            <div className="text-sm leading-tight font-semibold text-gray-900">
                              {item.label}
                            </div>
                          </div>
                          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 -rotate-90 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <div className="space-y-2">
                          {}
                          <div className="flex items-center gap-2 px-2 py-1">
                            {(() => {
                              const IconComponent = getLucideIcon(item.icon);
                              return (
                                <IconComponent
                                  className="h-4 w-4 text-gray-400"
                                  strokeWidth={2}
                                />
                              );
                            })()}
                            <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                              {item.label}
                            </span>
                          </div>

                          {}
                          <div className="space-y-2">
                            {item.sections?.map((section) =>
                              section.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={toggleMenu}
                                  className="group flex items-start gap-3 rounded-xl border border-amber-600/30 bg-white p-3.5 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                                >
                                  {(() => {
                                    const IconComponent = getLucideIcon(
                                      link.icon
                                    );
                                    const iconColors: Record<string, string> = {
                                      Settings: 'from-blue-500 to-cyan-500',
                                      Camera: 'from-purple-500 to-pink-500',
                                      DollarSign:
                                        'from-green-500 to-emerald-500',
                                      Shield: 'from-amber-500 to-orange-500',
                                      Euro: 'from-indigo-500 to-blue-500',
                                      MapPin: 'from-red-500 to-rose-500',
                                      HelpCircle: 'from-teal-500 to-cyan-500',
                                    };
                                    const gradient =
                                      iconColors[link.icon] ||
                                      'from-gray-500 to-gray-600';

                                    return (
                                      <div
                                        className={`rounded-lg bg-linear-to-br p-2.5 ${gradient} shrink-0 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md`}
                                      >
                                        <IconComponent
                                          className="h-4 w-4 text-white"
                                          strokeWidth={2}
                                        />
                                      </div>
                                    );
                                  })()}
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-0.5 text-sm leading-tight font-semibold text-gray-900">
                                      {link.label}
                                    </div>
                                    <div className="text-xs leading-snug text-gray-500">
                                      {link.description}
                                    </div>
                                  </div>
                                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 -rotate-90 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {}
              <div className="border-t border-gray-200 bg-white px-6 py-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-3"
                >
                  <Button
                    as="a"
                    href={data.cta.phoneHref}
                    size="lg"
                    className="w-full bg-linear-to-r from-blue-600 to-cyan-600 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-xl"
                    startContent={<Phone className="h-5 w-5" />}
                  >
                    {data.cta.label}
                  </Button>
                  <p className="text-center text-xs text-gray-500">
                    Devis gratuit • Sans engagement • Réponse en 24h
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
