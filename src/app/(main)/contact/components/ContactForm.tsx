'use client';

import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { Send, AlertCircle } from 'lucide-react';
import type { ContactState } from '@/actions/contact';

interface ContactFormProps {
  formAction: (formData: FormData) => void;
  state: ContactState;
  isPending: boolean;
}

export function ContactForm({
  formAction,
  state,
  isPending,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
  }, [state.success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action={formAction} className="space-y-6">
      <FormField
        label="Nom complet"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={state.errors?.name?.[0]}
        placeholder="Votre nom et prénom"
        delay={0.1}
        required
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={state.errors?.email?.[0]}
          placeholder="votre@email.com"
          delay={0.2}
          required
        />
        <FormField
          label="Téléphone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={state.errors?.phone?.[0]}
          placeholder="06 12 34 56 78"
          delay={0.2}
          slideFrom="right"
          required
        />
      </div>

      <FormField
        label="Sujet"
        name="subject"
        type="text"
        value={formData.subject}
        onChange={handleChange}
        error={state.errors?.subject?.[0]}
        placeholder="Demande de devis, Renseignements..."
        required
      />

      <FormField
        label="Message"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        error={state.errors?.message?.[0]}
        placeholder="Décrivez votre projet..."
        rows={6}
        required
      />
      <div className="flex justify-end w-full">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="rounded-xl bg-linear-to-r w-max  from-blue-600 via-sky-500 to-cyan-500 py-7 text-lg font-bold text-white shadow-md shadow-sky-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70"
          endContent={!isPending && <Send className="h-5 w-5" />}
        >
          {isPending ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </Button>
      </div>

      {state.message && !state.success && (
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{state.message}</p>
        </div>
      )}
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  delay?: number;
  slideFrom?: 'left' | 'right';
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
  rows,
  delay = 0,
  slideFrom = 'left',
}: FormFieldProps) {
  const inputClasses = `w-full rounded-lg border bg-white dark:bg-neutral-800/50 px-5 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 transition-all duration-300 focus:shadow-lg focus:shadow-blue-100 dark:focus:shadow-blue-900/20 focus:outline-none ${
    error
      ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-500'
      : 'border-slate-200 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400'
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="group"
    >
      <label
        htmlFor={name}
        className="mb-2 ml-1 block text-sm font-bold text-slate-700 dark:text-default-700 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
      >
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={`${inputClasses} min-h-[150px] resize-none`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <p className="mt-1 ml-1 text-xs text-red-500">{error}</p>}
    </motion.div>
  );
}
