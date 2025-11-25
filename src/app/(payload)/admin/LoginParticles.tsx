'use client';

import dynamic from 'next/dynamic';

const ParticlesEffect = dynamic(
  () =>
    import('../../_components/shared/effects/ParticlesEffect').then(
      (mod) => mod.ParticlesEffect
    ),
  { ssr: false }
);

const LoginParticles = () => {
  // On ne veut afficher les particules que sur la page de login
  // L'injection 'beforeLogin' ne s'affiche QUE sur la page de login, donc c'est parfait.

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Juste derrière le contenu (le contenu de login a souvent un z-index plus élevé ou on ajustera le CSS)
        pointerEvents: 'none', // Pour ne pas bloquer les clics
      }}
    >
      <ParticlesEffect />
    </div>
  );
};

export default LoginParticles;
