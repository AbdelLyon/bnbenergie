'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BenefitsCTAProps {
  title: string;
  description: string;
  button1: string;
  button2: string;
}

export function BenefitsCTA({
  title,
  description,
  button1,
  button2,
}: BenefitsCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      <div className="from-primary-600 to-primary-800 shadow-primary-500/30 relative overflow-hidden rounded-3xl bg-linear-to-br p-10 text-white shadow-2xl md:p-12">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 text-3xl font-black drop-shadow-lg md:text-4xl"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-10 text-lg text-white/90 drop-shadow"
          >
            {description}
          </motion.p>

          <div className="flex flex-col gap-5 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#pricing"
                className="text-primary-600 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-extrabold shadow-xl transition-all duration-300 hover:bg-neutral-50 hover:shadow-2xl"
              >
                {button1}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-xl"
              >
                {button2}
              </Link>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute -right-10 -bottom-10 h-60 w-60 animate-pulse rounded-full bg-white/10 blur-3xl"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="bg-accent-400/20 absolute -top-10 -left-10 h-60 w-60 animate-pulse rounded-full blur-3xl"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
      </div>
    </motion.div>
  );
}
