export const getInputClasses = (err?: string) =>
  `w-full rounded-[var(--radius-md)] border bg-[var(--bg-card)] px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
    err
      ? 'border-red-400 dark:border-red-700'
      : 'border-[var(--border-default)]'
  }`;
