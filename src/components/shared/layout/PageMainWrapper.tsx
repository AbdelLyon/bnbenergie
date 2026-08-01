"use client";

import { ReactNode } from "react";

interface PageMainWrapperProps {
  children: ReactNode;
  /** Conservé pour compatibilité — n'affecte plus le fond (aucun dégradé). */
  variant?: "purple" | "green" | "teal" | "blue" | "amber" | "transparent";
  className?: string;
}

export function PageMainWrapper({
  children,
  className = "",
}: PageMainWrapperProps) {
  return (
    <main
      className={`relative min-h-screen overflow-x-hidden bg-transparent ${className}`}
    >
      {children}
    </main>
  );
}
