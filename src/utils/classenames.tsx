export const getInputClasses = (err?: string) =>
  `w-full rounded-lg border bg-white p-2 text-slate-800 placeholder-slate-400 placeholder:text-sm transition-all duration-300 focus:shadow-md focus:shadow-blue-100/40 focus:outline-none ${
    err
      ? 'border-red-300 focus:border-red-500'
      : 'border-slate-200 focus:border-blue-500/30'
  }`;

export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.filter(Boolean).join(' ');
}
