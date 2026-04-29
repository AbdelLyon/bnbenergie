export const getInputClasses = (err?: string) =>
  `w-full rounded-lg border bg-white dark:bg-neutral-800/50 p-2 text-slate-800 dark:text-white placeholder-slate-400 placeholder:text-sm dark:placeholder-neutral-500 transition-all duration-300 focus:shadow-md focus:shadow-blue-100/40 dark:focus:shadow-blue-900/20 focus:outline-none ${
    err
      ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-500'
      : 'border-slate-200 dark:border-neutral-700 focus:border-blue-500/30 dark:focus:border-blue-400/30'
  }`;
