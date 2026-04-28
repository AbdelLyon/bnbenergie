'use client';

import { useState, type FC, type SVGProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { getLucideIcon } from '@/utils/getLucideIcon';

interface FAQItemProps {
  question: string;
  answer: string;
  category?: string;
  categoryIcon?: string;
}

const categoryIcons: Record<string, string> = {
  'Prix & Budget': 'DollarSign',
  'Aides & Financement': 'Gift',
  Installation: 'Wrench',
  Rentabilité: 'LineChart',
  'Notre Entreprise': 'Building',
  Dimensionnement: 'Zap',
  Entretien: 'Brush',
  Devis: 'FileText',
  Production: 'Sun',
  Technique: 'Home',
};

export function FAQItem({ question, answer, category, categoryIcon }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const iconName: string = category
    ? categoryIcon || categoryIcons[category] || 'HelpCircle'
    : 'HelpCircle';
  const Icon: FC<SVGProps<SVGSVGElement>> = getLucideIcon(iconName);

  return (
    <div className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-neutral-100 dark:border-white/5 bg-white dark:bg-content1 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
        aria-expanded={isOpen}
        aria-label={question}
      >
        <div className="flex items-start gap-2 cursor-pointer flex-1">
          <span className="shrink-0 text-xl transition-transform duration-200 ease-out group-hover:scale-110 lg:text-2xl">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </span>
          <div className="flex-1">
            {category && (
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {category}
              </div>
            )}
            <h3 className="text-base font-bold transition-colors duration-200 ease-out group-hover:opacity-70 md:text-lg">
              {question}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 cursor-pointer dark:text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-700 px-4 pb-4 dark:text-gray-300">
          {answer}
        </p>
      </div>
    </div>
  );
}
