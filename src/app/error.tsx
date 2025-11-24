'use client';

import { Link } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600">
            Nous sommes désolés, une erreur inattendue s&apos;est produite.
            Veuillez réessayer.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-blue-700"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="block w-full rounded-full bg-gray-100 px-6 py-3 font-bold text-gray-700 transition-all hover:bg-gray-200"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Détails de l&apos;erreur (développement)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
