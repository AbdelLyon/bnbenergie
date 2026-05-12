import React from 'react';
import { cn } from '@/utils/classenames';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardBody({ className, children }: CardProps) {
  return <div className={cn(className)}>{children}</div>;
}
