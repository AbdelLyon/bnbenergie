'use client';

import React from 'react';
import { Logo as LogoIcon } from '@/app/_components/shared/ui/Logo';

export const Logo = () => (
  <div className="group flex items-center gap-2">
    {/* isScrolled={false} pour le style sur fond sombre (Glassmorphism + Texte Blanc) comme dans la Navbar */}
    <LogoIcon isScrolled={false} showRGEBadge={true} size="md" />
    <div>
      <div className="font-display text-xl font-bold transition-all duration-300 ease-out text-white">
        BNB{' '}
        <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          ÉNERGIE
        </span>
      </div>
      <p className="font-display pl-2 text-[10px] transition-all duration-300 ease-out text-white/80">
        Certifié RGE QualiPV
      </p>
    </div>
  </div>
);

export const Icon = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      width="24"
      height="24"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient
          id="payloadLogoGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#2563eb', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      {/* Carré avec gradient - ajusté pour remplir le viewBox */}
      <rect
        x="0"
        y="0"
        width="60"
        height="60"
        rx="12"
        fill="url(#payloadLogoGradient)"
      />
      {/* Éclair centré */}
      <path
        d="M35 15L22 35h10l-5 15 15-23h-10l5-12z"
        fill="#FBBF24"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="absolute -right-1.5 mt-6 px-1 rounded-sm uppercase bg-amber-500 text-[8px]">
      RGE
    </span>
  </div>
);
