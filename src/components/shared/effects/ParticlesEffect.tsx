'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: THREE.Color;
  floatSpeed: number;
  floatRange: number;
  pulsePhase: number;
}

// Composant pour les étoiles en arrière-plan
function StarField() {
  const starsRef = useRef<THREE.Points>(null);

  const starGeometry = useMemo(() => {
    const starCount = 800;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Distribution sphérique éloignée
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Couleurs variées (blanc, bleu clair, jaune clair)
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.8;
      }

      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starGeometry.positions.length / 3}
          array={starGeometry.positions}
          itemSize={3}
          args={[starGeometry.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starGeometry.colors.length / 3}
          array={starGeometry.colors}
          itemSize={3}
          args={[starGeometry.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starGeometry.sizes.length}
          array={starGeometry.sizes}
          itemSize={1}
          args={[starGeometry.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParticleWeb() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const pulseRef = useRef(1);

  const { size } = useThree();

  const { particles, positions, colors, sizes } = useMemo(() => {
    const sphereParticleCount = Math.floor((size.width * size.height) / 12000); // Nombre modéré de particules bien distribuées
    const ringParticleCount = Math.floor(sphereParticleCount * 0.2); // 20% de particules pour l'anneau
    const particleCount = sphereParticleCount + ringParticleCount;

    const colorPalette = [
      new THREE.Color('#22d3ee').multiplyScalar(0.8),
      new THREE.Color('#3b82f6').multiplyScalar(0.8),
      new THREE.Color('#10b981').multiplyScalar(0.8),
      new THREE.Color('#fbbf24').multiplyScalar(0.9),
      new THREE.Color('#f59e0b').multiplyScalar(0.9),
    ];

    const particles: ParticleData[] = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    let index = 0;

    // Créer les particules à l'INTÉRIEUR de la sphère (planète)
    const planetRadius = 5; // Rayon de la planète
    for (let i = 0; i < sphereParticleCount; i++) {
      // Position aléatoire à l'intérieur de la sphère
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * planetRadius; // Distribution volumique uniforme

      // Conversion en coordonnées cartésiennes
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const rand = Math.random();
      let colorIndex;

      if (rand < 0.4) {
        colorIndex = Math.floor(Math.random() * 2);
      } else if (rand < 0.7) {
        colorIndex = 3 + Math.floor(Math.random() * 2);
      } else {
        colorIndex = 2;
      }

      const color = colorPalette[colorIndex] || new THREE.Color('#ffffff');
      const size = Math.random() * 1.5 + 0.5;

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        size: size,
        color: color,
        floatSpeed: Math.random() * 0.15 + 0.08,
        floatRange: Math.random() * 0.15 + 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
      });

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;

      sizes[index] = size;
      index++;
    }

    // Créer l'anneau (comme Saturne)
    for (let i = 0; i < ringParticleCount; i++) {
      const ringInnerRadius = 6; // Rayon intérieur de l'anneau
      const ringOuterRadius = 8; // Rayon extérieur de l'anneau
      const ringRadius =
        ringInnerRadius + Math.random() * (ringOuterRadius - ringInnerRadius);

      const theta = Math.random() * Math.PI * 2; // Angle autour de la planète
      const ringThickness = (Math.random() - 0.5) * 0.3; // Épaisseur de l'anneau

      // Anneau incliné (tilt)
      const tiltAngle = Math.PI / 6; // Inclinaison de 30 degrés

      const x = ringRadius * Math.cos(theta);
      const y = ringThickness;
      const z = ringRadius * Math.sin(theta);

      // Appliquer la rotation pour l'inclinaison
      const yRotated = y * Math.cos(tiltAngle) - z * Math.sin(tiltAngle);
      const zRotated = y * Math.sin(tiltAngle) + z * Math.cos(tiltAngle);

      // Couleurs plus lumineuses pour l'anneau
      const ringColorIndex = Math.random() < 0.5 ? 0 : 1; // Cyan ou bleu
      const color = colorPalette[ringColorIndex] || new THREE.Color('#ffffff');
      const size = Math.random() * 1.2 + 0.3;

      particles.push({
        baseX: x,
        baseY: yRotated,
        baseZ: zRotated,
        size: size,
        color: color,
        floatSpeed: Math.random() * 0.12 + 0.06,
        floatRange: Math.random() * 0.12 + 0.06,
        pulsePhase: Math.random() * Math.PI * 2,
      });

      positions[index * 3] = x;
      positions[index * 3 + 1] = yRotated;
      positions[index * 3 + 2] = zRotated;

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;

      sizes[index] = size;
      index++;
    }

    return { particles, positions, colors, sizes };
  }, [size.width, size.height]);

  useFrame((_state, delta) => {
    if (
      !groupRef.current ||
      !pointsRef.current ||
      !linesRef.current ||
      !glowRef.current
    )
      return;

    timeRef.current += delta;

    // Effet de pulsation organique (respiration de la planète) - Plus lent
    pulseRef.current =
      1 +
      Math.sin(timeRef.current * 0.4) * 0.08 +
      Math.sin(timeRef.current * 0.65) * 0.05;

    // Appliquer la pulsation au glow
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulseRef.current * 1.3);
    }

    // Sphère en position fixe au centre
    groupRef.current.position.set(0, 0, 0);

    // Rotation très lente et constante
    groupRef.current.rotation.x += 0.05 * delta;
    groupRef.current.rotation.y += 0.08 * delta;
    groupRef.current.rotation.z += 0.03 * delta;

    const posAttr = pointsRef.current.geometry.attributes[
      'position'
    ] as THREE.BufferAttribute;
    const sizeAttr = pointsRef.current.geometry.attributes[
      'size'
    ] as THREE.BufferAttribute;

    const planetRadius = 5; // Rayon de la planète (même que lors de la création)

    particles.forEach((particle, i) => {
      const floatX =
        Math.sin(timeRef.current * particle.floatSpeed + particle.pulsePhase) *
        particle.floatRange *
        2.5;
      const floatY =
        Math.cos(
          timeRef.current * particle.floatSpeed * 0.8 + particle.pulsePhase
        ) *
        particle.floatRange *
        2.5;
      const floatZ =
        Math.sin(
          timeRef.current * particle.floatSpeed * 0.6 + particle.pulsePhase
        ) *
        particle.floatRange *
        2.5;

      let newX = particle.baseX + floatX;
      let newY = particle.baseY + floatY;
      let newZ = particle.baseZ + floatZ;

      // Contraindre la particule à rester à l'intérieur de la sphère
      const distance = Math.sqrt(newX * newX + newY * newY + newZ * newZ);
      if (distance > planetRadius) {
        const scale = planetRadius / distance;
        newX *= scale;
        newY *= scale;
        newZ *= scale;
      }

      posAttr.setXYZ(i, newX, newY, newZ);

      // Pulsation individuelle des particules combinée avec la pulsation globale - Plus lent
      const individualPulse =
        1 + Math.sin(timeRef.current * 1 + particle.pulsePhase) * 0.2;
      sizeAttr.setX(i, particle.size * individualPulse * pulseRef.current);
    });

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const connectDistance = 1.5; // Distance modérée pour les connexions

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = posAttr.getX(i) - posAttr.getX(j);
        const dy = posAttr.getY(i) - posAttr.getY(j);
        const dz = posAttr.getZ(i) - posAttr.getZ(j);

        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectDistance * connectDistance) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / connectDistance) * 0.18; // Opacité équilibrée

          if (opacity > 0) {
            const p1 = particles[i];
            const p2 = particles[j];

            if (p1 && p2) {
              linePositions.push(
                posAttr.getX(i),
                posAttr.getY(i),
                posAttr.getZ(i),
                posAttr.getX(j),
                posAttr.getY(j),
                posAttr.getZ(j)
              );

              const c1 = p1.color;
              const c2 = p2.color;

              lineColors.push(c1.r, c1.g, c1.b);
              lineColors.push(c2.r, c2.g, c2.b);
            }
          }
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesRef.current.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineColors, 3)
    );
  });

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.premultiplyAlpha = true;
    return tex;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Aura lumineuse autour de la planète (glow effect) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[5.5, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Deuxième couche de glow pour l'effet de profondeur */}
      <mesh>
        <sphereGeometry args={[6, 64, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Contour de la sphère (wireframe uniquement) - Plus rond et visible */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          wireframe={true}
        />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.length}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.length}
            array={sizes}
            itemSize={1}
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          vertexColors
          transparent
          opacity={0.8}
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export function ParticlesEffect() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-2"
      style={{ opacity: 0.4 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Étoiles en arrière-plan pour la profondeur spatiale */}
        <StarField />

        {/* Lumière ambiante subtile pour donner de la profondeur */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#22d3ee"
        />

        {/* La planète principale avec ses particules */}
        <ParticleWeb />
      </Canvas>
    </div>
  );
}
