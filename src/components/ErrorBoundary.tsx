'use client';

/**
 * Error Boundary pour capturer et gérer les erreurs React
 * Utilise la nouvelle API Error Boundary de React
 */

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log l'erreur pour le debugging
    console.error('ErrorBoundary a capturé une erreur:', error, errorInfo);

    // Appeler le callback custom si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Envoyer au service de monitoring (Sentry)
    // if (isProduction) {
    //   Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    // }
  }

  override render() {
    if (this.state.hasError) {
      // Utiliser le fallback custom si fourni, sinon afficher un message par défaut
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md text-center">
            <div className="mb-4 text-6xl">⚠️</div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Une erreur est survenue
            </h1>
            <p className="mb-6 text-gray-600">
              Nous sommes désolés, quelque chose s'est mal passé. Veuillez
              rafraîchir la page ou réessayer plus tard.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Rafraîchir la page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer font-semibold text-red-600">
                  Détails de l'erreur (dev only)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-red-50 p-4 text-xs text-red-900">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Error Boundary spécialisé pour les sections de page
 */
export function SectionErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-800">
            Cette section n'a pas pu être chargée. Veuillez réessayer plus tard.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
