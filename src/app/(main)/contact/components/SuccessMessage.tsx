'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@heroui/button';

interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50/50 py-16 text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-inner">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-slate-800 dark:text-foreground">
        Message envoyé !
      </h3>
      <p className="mx-auto max-w-md text-slate-600 dark:text-default-500">
        {message ||
          'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.'}
      </p>
      <Button
        className="mt-6 bg-white dark:bg-content1 text-slate-600 dark:text-default-500 shadow-sm hover:bg-slate-50"
        onClick={() => window.location.reload()}
      >
        Envoyer un autre message
      </Button>
    </motion.div>
  );
}
