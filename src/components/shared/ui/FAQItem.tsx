'use client';

import { useState, type FC, type SVGProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { getLucideIcon } from '@/utils/getLucideIcon';
import { Heading } from '@/components/shared/ui/Heading';

interface FAQItemProps {
  question: string;
  answer: string;
  category?: string;
  categoryIcon?: string;
}

type CategoryConfig = {
  icon: string;
  gradient: string;
  openBorder: string;
  answerBg: string;
  labelColor: string;
  chevronGradient: string;
};

const categoryConfig: Record<string, CategoryConfig> = {
  'Aides & Financement': {
    icon: 'Banknote',
    gradient: 'from-emerald-500 to-green-600',
    openBorder: 'border-l-emerald-500',
    answerBg: 'bg-emerald-50',
    labelColor: 'text-emerald-700',
    chevronGradient: 'from-emerald-500 to-green-600',
  },
  'Prix & Rentabilité': {
    icon: 'TrendingUp',
    gradient: 'from-amber-400 to-orange-500',
    openBorder: 'border-l-amber-500',
    answerBg: 'bg-amber-50',
    labelColor: 'text-amber-700',
    chevronGradient: 'from-amber-400 to-orange-500',
  },
  'Technique': {
    icon: 'Cpu',
    gradient: 'from-blue-500 to-indigo-600',
    openBorder: 'border-l-blue-500',
    answerBg: 'bg-blue-50',
    labelColor: 'text-blue-700',
    chevronGradient: 'from-blue-500 to-indigo-600',
  },
  'Démarches & Installation': {
    icon: 'ClipboardList',
    gradient: 'from-violet-500 to-purple-600',
    openBorder: 'border-l-violet-500',
    answerBg: 'bg-violet-50',
    labelColor: 'text-violet-700',
    chevronGradient: 'from-violet-500 to-purple-600',
  },
};

const defaultConfig: CategoryConfig = {
  icon: 'HelpCircle',
  gradient: 'from-primary-500 to-primary-600',
  openBorder: 'border-l-primary-500',
  answerBg: 'bg-primary-50',
  labelColor: 'text-primary-700',
  chevronGradient: 'from-primary-500 to-primary-600',
};

export function FAQItem({ question, answer, category, categoryIcon }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = (category ? categoryConfig[category] : undefined) ?? defaultConfig;
  const iconName = categoryIcon ?? config.icon;
  const Icon: FC<SVGProps<SVGSVGElement>> = getLucideIcon(iconName);

  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 border-l-4 ${
        isOpen
          ? `shadow-lg border-neutral-100 ${config.openBorder}`
          : 'shadow-sm hover:shadow-md border-neutral-100 border-l-transparent hover:border-l-neutral-200'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-5 text-left flex items-center gap-4 cursor-pointer"
        aria-expanded={isOpen}
        aria-label={question}
      >
        {/* Icône catégorie */}
        <span
          className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-linear-to-br ${config.gradient} shadow-sm transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="h-5 w-5 text-white" />
        </span>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          {category && (
            <p className={`text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${config.labelColor}`}>
              {category}
            </p>
          )}
          <Heading as="h3" className="text-sm text-neutral-900 leading-snug md:text-base pr-2">
            {question}
          </Heading>
        </div>

        {/* Chevron */}
        <div
          className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? `bg-linear-to-br ${config.chevronGradient} shadow-sm`
              : 'bg-neutral-100'
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-white' : 'text-neutral-500'
            }`}
          />
        </div>
      </button>

      {/* Réponse */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`mx-5 mb-5 rounded-xl px-4 py-4 text-sm leading-relaxed text-neutral-700 ${config.answerBg}`}>
          {answer}
        </div>
      </div>
    </div>
  );
}
