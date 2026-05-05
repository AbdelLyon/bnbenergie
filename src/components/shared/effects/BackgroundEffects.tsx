'use client';

interface BackgroundEffectsProps {
  variant?: 'default' | 'gradient' | 'subtle' | 'full';
  particleCount?: number;
}

const STATIC_PARTICLES = [
  { x: 8, y: 15, d: 14, delay: 0 },
  { x: 22, y: 72, d: 18, delay: 2.5 },
  { x: 37, y: 34, d: 11, delay: 5 },
  { x: 51, y: 88, d: 16, delay: 1.2 },
  { x: 63, y: 22, d: 20, delay: 7 },
  { x: 76, y: 58, d: 13, delay: 3.8 },
  { x: 89, y: 41, d: 15, delay: 9 },
  { x: 14, y: 95, d: 12, delay: 4.5 },
  { x: 44, y: 63, d: 19, delay: 6.2 },
  { x: 58, y: 7, d: 10, delay: 1.8 },
  { x: 71, y: 79, d: 17, delay: 8.1 },
  { x: 83, y: 28, d: 14, delay: 3 },
  { x: 28, y: 49, d: 11, delay: 5.7 },
  { x: 95, y: 66, d: 16, delay: 0.9 },
  { x: 6, y: 53, d: 13, delay: 7.4 },
  { x: 33, y: 11, d: 18, delay: 2.1 },
  { x: 47, y: 82, d: 15, delay: 4.8 },
  { x: 68, y: 44, d: 12, delay: 6.9 },
  { x: 81, y: 91, d: 20, delay: 1.5 },
  { x: 19, y: 37, d: 10, delay: 8.6 },
];

export function BackgroundEffects({
  variant = 'default',
}: BackgroundEffectsProps) {
  if (variant === 'default') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary-500/5 absolute top-0 right-0 h-125 w-200 translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-secondary-500/5 absolute bottom-0 left-0 h-125 w-200 -translate-x-1/4 translate-y-1/3 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />

      <div
        className="bg-primary-500/5 absolute top-0 right-0 h-200 w-200 translate-x-1/3 -translate-y-1/2 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="bg-secondary-500/5 absolute bottom-0 left-0 h-200 w-200 -translate-x-1/4 translate-y-1/3 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite]"
        style={{ animationDelay: '2s' }}
      />

      {STATIC_PARTICLES.map((p) => (
        <div
          key={p.x}
          className="bg-primary-400/20 absolute h-1 w-1 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `solarFloat ${p.d}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

