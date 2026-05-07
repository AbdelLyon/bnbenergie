"use client";

import { ReactNode } from "react";

interface PageMainWrapperProps {
  children: ReactNode;
  variant?: string;
  className?: string;
}

export function PageMainWrapper({
  children,
  className = "",
}: PageMainWrapperProps) {
  return (
    <main className={`relative min-h-screen overflow-x-hidden bg-background ${className}`}>
      {children}
    </main>
  );
}
