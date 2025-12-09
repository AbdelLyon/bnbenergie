'use client';

import { motion } from 'framer-motion';
import { getLucideIcon } from '@/utils/getLucideIcon';

interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
  description: string;
}

interface ContactInfoProps {
  items: ContactInfoItem[];
}

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <div className="space-y-10">
      {items.map((item, index) => {
        const Icon = getLucideIcon(item.icon);
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-6 group"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/10">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold tracking-widest text-blue-200/80 uppercase mb-1">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="block text-xl font-medium text-white transition-colors hover:text-blue-300"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-xl font-medium text-white">
                  {item.value}
                </p>
              )}
              <p className="mt-1.5 text-sm text-slate-300/80 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
