"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 280;
const FIELD_RADIUS = 28;
const FIELD_DEPTH = 120;
const BASE_SPEED = 2.2;
const CAMERA_Z = 6;

const STREAK_COUNT = 18;

function SpaceDrift() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, baseSizes, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const baseSizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -(Math.random() * FIELD_DEPTH);

      const t = Math.random();
      if (t < 0.55) {
        // blanc bleuté
        colors[i * 3] = 0.88;
        colors[i * 3 + 1] = 0.94;
        colors[i * 3 + 2] = 1;
      } else if (t < 0.8) {
        // bleu cyan
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.65;
        colors[i * 3 + 2] = 1;
      } else {
        // doré ambré
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.2;
      }

      baseSizes[i] = Math.random() * 1.6 + 0.4;
      speeds[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, colors, baseSizes, speeds };
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const pa = ref.current.geometry.attributes[
      "position"
    ] as THREE.BufferAttribute;
    const sa = ref.current.geometry.attributes["size"] as THREE.BufferAttribute;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let z = pa.getZ(i) + (speeds[i] ?? 0) * BASE_SPEED * dt;

      if (z > CAMERA_Z) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
        pa.setX(i, Math.cos(angle) * radius);
        pa.setY(i, Math.sin(angle) * radius);
        z = -FIELD_DEPTH;
      }

      pa.setZ(i, z);

      const depth = (z + FIELD_DEPTH) / (FIELD_DEPTH + CAMERA_Z);
      sa.setX(i, (baseSizes[i] ?? 0) * (0.04 + depth * depth * depth * 3.5));
    }

    pa.needsUpdate = true;
    sa.needsUpdate = true;
  });

  const tex = useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.12, "rgba(255,255,255,0.9)");
    g.addColorStop(0.45, "rgba(255,255,255,0.2)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(cv);
    t.premultiplyAlpha = true;
    return t;
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={baseSizes}
          itemSize={1}
          args={[baseSizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WarpStreaks() {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, colors, speeds, lengths } = useMemo(() => {
    const positions = new Float32Array(STREAK_COUNT * 6);
    const colors = new Float32Array(STREAK_COUNT * 6);
    const speeds = new Float32Array(STREAK_COUNT);
    const lengths = new Float32Array(STREAK_COUNT);

    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * FIELD_RADIUS * 0.85;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -(Math.random() * FIELD_DEPTH);
      const l = Math.random() * 0.9 + 0.15;

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z + l;

      const warm = Math.random() < 0.25;
      const r = warm ? 1 : 0.4,
        g = warm ? 0.78 : 0.72,
        b = warm ? 0.15 : 1;
      colors[i * 6] = r;
      colors[i * 6 + 1] = g;
      colors[i * 6 + 2] = b;
      colors[i * 6 + 3] = r;
      colors[i * 6 + 4] = g;
      colors[i * 6 + 5] = b;

      speeds[i] = Math.random() * 2.2 + 0.8;
      lengths[i] = l;
    }

    return { positions, colors, speeds, lengths };
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const pa = ref.current.geometry.attributes[
      "position"
    ] as THREE.BufferAttribute;

    for (let i = 0; i < STREAK_COUNT; i++) {
      const spd = speeds[i] ?? 0;
      const len = lengths[i] ?? 0;
      let z = pa.getZ(i * 2) + spd * BASE_SPEED * dt;

      if (z > CAMERA_Z) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * FIELD_RADIUS * 0.85;
        const nx = Math.cos(angle) * radius;
        const ny = Math.sin(angle) * radius;
        z = -FIELD_DEPTH;
        pa.setXYZ(i * 2, nx, ny, z);
        pa.setXYZ(i * 2 + 1, nx, ny, z + len);
      } else {
        pa.setZ(i * 2, z);
        pa.setZ(i * 2 + 1, z + len);
      }
    }

    pa.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STREAK_COUNT * 2}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STREAK_COUNT * 2}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function NebulaGlow() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const t = useRef(0);

  const blobs = useMemo(
    () => [
      { x: -8, y: 5, z: -45, r: 12, color: "#3b82f6", speed: 0.03 },
      { x: 9, y: -4, z: -50, r: 10, color: "#f59e0b", speed: 0.025 },
    ],
    [],
  );

  useFrame((_, dt) => {
    t.current += dt;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const b = blobs[i]!;
      mesh.position.x = b.x + Math.sin(t.current * b.speed) * 2.5;
      mesh.position.y = b.y + Math.cos(t.current * b.speed * 0.8) * 1.8;
    });
  });

  return (
    <>
      {blobs.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[b.x, b.y, b.z]}
        >
          <sphereGeometry args={[b.r, 12, 12]} />
          <meshBasicMaterial
            color={b.color}
            transparent
            opacity={0.035}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

const GLOBE_RADIUS = 380;

function GiantGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const atmoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!globeRef.current || !gridRef.current || !atmoRef.current) return;
    const t = state.clock.elapsedTime;

    const rotSpeed = 0.025;
    globeRef.current.rotation.y = t * rotSpeed;
    gridRef.current.rotation.y = t * rotSpeed;

    globeRef.current.rotation.x = Math.sin(t * 0.01) * 0.03;
    gridRef.current.rotation.x = Math.sin(t * 0.01) * 0.03;

    const pulse = 1 + Math.sin(t * 0.04) * 0.015;
    atmoRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={[0, 0, -120]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshBasicMaterial color="#0f1a2e" transparent opacity={0.15} />
      </mesh>

      <mesh ref={gridRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 1.008, 40, 40]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>

      {[0, 0.3, 0.6].map((offset, i) => (
        <mesh key={i} rotation={[Math.PI / 2, offset, 0]}>
          <torusGeometry
            args={[GLOBE_RADIUS * (0.96 - i * 0.08), 1.2, 2, 120]}
          />
          <meshBasicMaterial
            color={i === 0 ? "#60a5fa" : "#f59e0b"}
            transparent
            opacity={i === 0 ? 0.2 : 0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <mesh ref={atmoRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 1.04, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function CameraWander() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const axialRoll = t * 0.057;
    state.camera.up.set(Math.sin(axialRoll), Math.cos(axialRoll), 0);

    const x = Math.sin(t * 0.038) * 0.9;
    const y = Math.cos(t * 0.031) * 0.6;
    const z = CAMERA_Z + Math.sin(t * 0.025) * 0.5;
    state.camera.position.set(x, y, z);

    state.camera.lookAt(
      Math.sin(t * 0.018) * 1.2,
      Math.cos(t * 0.022) * 0.8,
      -30,
    );
  });
  return null;
}

export function ParticlesEffect() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-2"
      style={{ opacity: 0.55 }}
    >
      <Canvas
        camera={{ position: [0, 0, CAMERA_Z], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <GiantGlobe />
        <NebulaGlow />
        <SpaceDrift />
        <WarpStreaks />
        <CameraWander />
      </Canvas>
    </div>
  );
}
