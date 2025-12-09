'use client';

import { motion } from 'framer-motion';

interface ContactMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export function ContactMap({ latitude, longitude, address }: ContactMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      <div className="overflow-hidden rounded-3xl border border-white dark:border-content2/60 bg-white dark:bg-content1/70 p-3 shadow-xl backdrop-blur-xl">
        <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.5!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDEyJzIxLjIiTiA1wrAxMyczMS44IkU!5e0!3m2!1sfr!2sfr!4v1234567890`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation BNB ÉNERGIE"
            className="absolute inset-0 grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
          />

          <div className="absolute bottom-6 left-6 rounded-2xl border border-white dark:border-content2/50 bg-white dark:bg-content1/90 p-6 shadow-lg backdrop-blur-md">
            <h3 className="mb-1 text-lg font-bold text-slate-800 dark:text-foreground">
              Nous Trouver
            </h3>
            <p className="text-sm text-slate-600 dark:text-default-500">
              {address}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
