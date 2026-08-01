"use client";

import { useEffect, useRef } from "react";
import type { BufferAttribute } from "three";

/**
 * Fond animé du hero : grille de points en vague (Three.js) avec parallaxe
 * souris. Logique reprise du prototype de design (méthode `_initThree`).
 *
 * Perf : Three.js (~140 Ko gzip) est chargé dynamiquement et uniquement quand
 * le canvas entre dans le viewport, il ne pèse donc pas sur le bundle initial
 * ni sur l'hydratation. L'animation se met en pause dès que le hero sort de
 * l'écran (économie CPU / batterie, meilleur INP au scroll).
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    let visible = false;
    let loading = false;
    // Contrôleurs installés une fois Three.js chargé.
    let resume: (() => void) | null = null;
    let pause: (() => void) | null = null;
    let dispose: (() => void) | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (!visible) {
          pause?.();
          return;
        }
        if (dispose) {
          resume?.();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    // La scène décorative n'est pas nécessaire au premier affichage. Elle est
    // chargée à la première intention réelle, ce qui garde le chemin critique
    // libre tout en la faisant apparaître dès que le visiteur interagit.
    const activationEvents = [
      "pointerdown",
      "touchstart",
      "wheel",
    ] as const;
    let autoInitTimer = 0;
    const removeActivationListeners = () => {
      activationEvents.forEach((event) =>
        window.removeEventListener(event, activate)
      );
      if (autoInitTimer) {
        window.clearTimeout(autoInitTimer);
        autoInitTimer = 0;
      }
    };
    const activate = () => {
      if (!visible || loading || disposed || reduce) return;
      loading = true;
      removeActivationListeners();
      void init();
    };
    if (!reduce) {
      activationEvents.forEach((event) =>
        window.addEventListener(event, activate, { passive: true })
      );
      // Démarrage automatique après le rendu critique. Une interaction réelle
      // peut toujours lancer la scène immédiatement avant ce délai.
      autoInitTimer = window.setTimeout(activate, 1400);
    }

    async function init() {
      // Chargement à la demande : la lib n'est dans aucun chunk initial.
      const THREE = await import("three");
      if (disposed) return;

      let w = parent!.clientWidth;
      let h = parent!.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas!,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.set(0, 0, 16);

      // Grille de points
      const compactParticles = w < 900;
      const GX = compactParticles ? 28 : 42;
      const GY = compactParticles ? 18 : 27;
      const SP = compactParticles ? 0.62 : 0.7;
      const initialDensity = 0.22;
      const baseX: number[] = [];
      const baseY: number[] = [];
      const colorValues: number[] = [];
      const revealValues: number[] = [];
      // Palette "spectre solaire" propre à BNB Énergie (différente de rifanor) :
      // bleu profond → sky → cyan → émeraude → or → ambre → orange.
      const palette = [
        new THREE.Color("#1e3a8a"),
        new THREE.Color("#1d4ed8"),
        new THREE.Color("#2563eb"),
        new THREE.Color("#0ea5e9"),
        new THREE.Color("#06b6d4"),
        new THREE.Color("#10b981"),
        new THREE.Color("#84cc16"),
        new THREE.Color("#fcd34d"),
        new THREE.Color("#fbbf24"),
        new THREE.Color("#f59e0b"),
        new THREE.Color("#f97316"),
        new THREE.Color("#ea580c"),
      ];
      for (let x = 0; x < GX; x++) {
        for (let y = 0; y < GY; y++) {
          const mixX = x / (GX - 1);
          const mixY = y / (GY - 1);
          const nx = mixX * 2 - 1;
          const ny = mixY * 2 - 1;
          const edgeNoise =
            Math.sin(x * 1.73 + y * 2.41) * 0.08 +
            Math.sin(x * 4.17 - y * 1.29) * 0.035;

          // Masque elliptique bruité de la version d'origine.
          if (Math.hypot(nx, ny * 1.08) > 1 + edgeNoise) continue;

          baseX.push((x - GX / 2) * SP);
          baseY.push((y - GY / 2) * SP);
          // Une fraction régulière de la grille est visible au repos. Les
          // points manquants apparaissent sans casser son alignement.
          revealValues.push(
            ((x * 0.618033 + y * 0.414214) % 1) * 0.5
          );

          const colorPosition =
            (mixX * 0.72 + mixY * 0.28) * (palette.length - 1);
          const colorIndex = Math.min(
            palette.length - 2,
            Math.floor(colorPosition)
          );
          const startColor = palette[colorIndex] ?? palette[0]!;
          const endColor = palette[colorIndex + 1] ?? palette[palette.length - 1]!;
          const base = startColor
            .clone()
            // Des zones colorées franches, reliées par une transition courte,
            // évitent qu'un dégradé continu mélange tout en une teinte brune.
            .lerp(
              endColor,
              THREE.MathUtils.smoothstep(
                colorPosition - colorIndex,
                0.68,
                1
              )
            );
          colorValues.push(base.r, base.g, base.b);
        }
      }
      const originalTotal = baseX.length;
      const radii = baseX.map((x, k) => {
        const y = baseY[k];
        if (x === undefined || y === undefined) return 0;
        return Math.hypot(x, y);
      });
      const maxGridRadius = Math.max(...radii, 1);
      for (let k = 0; k < originalTotal; k++) {
        const px = baseX[k];
        const py = baseY[k];
        if (px === undefined || py === undefined) continue;

   
        baseX.push(px + SP * 0.5);
        baseY.push(py + SP * 0.5);
        colorValues.push(
          colorValues[k * 3] ?? 0,
          colorValues[k * 3 + 1] ?? 0,
          colorValues[k * 3 + 2] ?? 0
        );
        revealValues.push(
          0.501 +
            (Math.hypot(px, py) / maxGridRadius) *
              0.499
        );
      }
      const total = baseX.length;
      const positions = new Float32Array(total * 3);
      const colors = new Float32Array(colorValues);
      const revealRanks = new Float32Array(revealValues);
      for (let k = 0; k < total; k++) {
        positions[k * 3] = baseX[k]!;
        positions[k * 3 + 1] = baseY[k]!;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.setAttribute(
        "revealRank",
        new THREE.BufferAttribute(revealRanks, 1)
      );
      const pointSize = () => (w < 600 ? 0.125 : w < 900 ? 0.145 : 0.174);
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        uniforms: {
          uOpacity: { value: 0 },
          uPointSize: { value: pointSize() },
          uDensity: { value: initialDensity },
          uViewportScale: {
            value: h * Math.min(window.devicePixelRatio, 2) * 0.5,
          },
        },
        vertexShader: `
          uniform float uPointSize;
          uniform float uViewportScale;
          uniform float uDensity;
          attribute float revealRank;
          varying vec3 vColor;
          varying float vVisible;

          void main() {
            vColor = color;
            vVisible = step(revealRank, uDensity);
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = uPointSize * uViewportScale / -viewPosition.z;
          }
        `,
        fragmentShader: `
          uniform float uOpacity;
          varying vec3 vColor;
          varying float vVisible;

          void main() {
            if (vVisible < 0.5) discard;
            // Point rond lumineux avec halo doux : signature "énergie solaire"
            // (distincte de la goutte organique de rifanor).
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float d = length(p);
            if (d > 1.0) discard;
            float core = 1.0 - smoothstep(0.0, 0.5, d);
            float halo = 1.0 - smoothstep(0.4, 1.0, d);
            float alpha = max(core, halo * 0.55);
            gl_FragColor = vec4(vColor, uOpacity * alpha);
          }
        `,
      });
      const uniforms = mat.uniforms as {
        uOpacity: { value: number };
        uPointSize: { value: number };
        uDensity: { value: number };
        uViewportScale: { value: number };
      };
      const points = new THREE.Points(geo, mat);
      points.rotation.x = -0.5;
      points.rotation.z = 0.1;
      points.scale.set(
        compactParticles ? 0.4 : 0.6,
        compactParticles ? 0.32 : 0.45,
        compactParticles ? 0.62 : 0.88
      );
      points.position.set(0, 0, 0);
      scene.add(points);

      // Parcours complet du hero : chaque étape est atteinte en douceur avant
      // que le nuage reparte vers une nouvelle zone de l'écran.
      const waypoints = [
        { x: 0, y: 0 },
        { x: 6.2, y: 3.6 },
        { x: -6, y: -3.4 },
        { x: 6.4, y: -3.1 },
        { x: -5.8, y: 3.5 },
        { x: 0, y: 0 },
      ];

      let mx = 0;
      let my = 0;
      let tmx = 0;
      let tmy = 0;
      let pointerActivity = 0;
      let previousPointerX = 0;
      let previousPointerY = 0;
      let previousPointerTime = 0;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        const rect = parent!.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (!inside) return;

        tmx = e.clientX / window.innerWidth - 0.5;
        tmy = e.clientY / window.innerHeight - 0.5;

        const now = performance.now();
        if (previousPointerTime) {
          const elapsed = Math.max(8, now - previousPointerTime);
          const distance = Math.hypot(
            e.clientX - previousPointerX,
            e.clientY - previousPointerY
          );
          pointerActivity = Math.min(
            1,
            pointerActivity + (distance / elapsed) * 0.18
          );
        }
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
        previousPointerTime = now;
      };
      window.addEventListener("pointermove", onMove);

      const onResize = () => {
        w = parent!.clientWidth;
        h = parent!.clientHeight;
        uniforms["uPointSize"].value = pointSize();
        uniforms["uViewportScale"].value =
          h * Math.min(window.devicePixelRatio, 1.5) * 0.5;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      const pos = geo.attributes["position"] as BufferAttribute;
      const start = performance.now();
      let lastFrame = start;
      let motionClock = 0;
      let waveClock = 0;
      let densityClock = 0;
      let raf = 0;

      const tick = () => {
        const now = performance.now();
        const frameInterval = w < 900 ? 1000 / 24 : 1000 / 30;
        if (now - lastFrame < frameInterval) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = (now - start) * 0.001;
        const delta = Math.min((now - lastFrame) * 0.001, 0.05);
        lastFrame = now;

        // Tempo global : le mouvement s'accélère par à-coups ponctuels puis
        // reprend sa vitesse normale (rythme varié, non linéaire).
        const tempoSignal =
          Math.sin(t * 0.16 + 0.5) + Math.sin(t * 0.09 - 1.2) * 0.8;
        const tempo = 1 + Math.max(0, tempoSignal - 0.85) ** 2 * 4.0;

        // Densité automatique : le nombre de particules "respire" tout seul,
        // sans interaction souris. Sa vitesse suit le tempo global.
        pointerActivity *= Math.exp(-delta * 0.78); // (conservé, inutilisé ici)
        densityClock += delta * 0.55 * tempo;
        const densityCycle = Math.sin(densityClock) * 0.5 + 0.5; // 0 → 1
        const targetDensity = initialDensity + densityCycle * (1 - initialDensity);
        uniforms["uDensity"].value +=
          (targetDensity - uniforms["uDensity"].value) *
          (1 - Math.exp(-delta * 2.15));

        // Houle lente, ponctuée de poussées rares et progressives. Les deux
        // signaux rendent la durée et l'intensité de chaque poussée différentes.
        const waveSurgeSignal =
          Math.sin(t * 0.17 - 0.8) + Math.sin(t * 0.37 + 1.4) * 0.46;
        const waveSurge = Math.max(0, waveSurgeSignal - 0.74) ** 2 * 2.8;
        waveClock += delta * (0.38 + waveSurge) * tempo;
        const waveT = waveClock;
        const livingPulse =
          1 +
          Math.sin(waveT * 0.86) * 0.22 +
          Math.sin(waveT * 1.73 + 1.2) * 0.1;

        for (let k = 0; k < total; k++) {
            const px = baseX[k];
            const py = baseY[k];
            if (px === undefined || py === undefined) continue;
            // Deux ondes seulement, partageant la même direction générale :
            // la formation reste ordonnée et la grande crête se lit clairement.
            const waveLine = px * 0.38 + py * 0.26 - waveT * 1.02;
            const mainWave = Math.sin(waveLine) * 0.82 * livingPulse;
            const secondaryWave =
              Math.sin(px * 0.24 - py * 0.3 + waveT * 0.56) * 0.24;
            const surfaceShimmer =
              Math.sin(waveLine * 1.7 + py * 0.12) * 0.12;
            const coherentLift = Math.sin(waveLine) * 0.28;

            // Les déplacements latéraux sont volontairement faibles : la
            // silhouette reste stable tandis que la profondeur porte la vague.
            pos.array[k * 3] =
              px +
              Math.sin(waveLine * 0.72) * 0.07;
            pos.array[k * 3 + 1] =
              py +
              coherentLift;
            pos.array[k * 3 + 2] =
              mainWave + secondaryWave + surfaceShimmer;
        }
        pos.needsUpdate = true;
        mx += (tmx - mx) * 0.04;
        my += (tmy - my) * 0.04;

        // Une horloge indépendante alterne suspension, croisière et poussées
        // rapides. Les harmoniques évitent une boucle trop prévisible.
        const drift = 0.12 + (Math.sin(t * 0.22) + 1) * 0.1;
        const flutter = Math.sin(t * 0.72 + Math.sin(t * 0.18)) ** 2 * 0.045;
        const surgeSignal =
          Math.sin(t * 0.19 - 1.1) + Math.sin(t * 0.47 + 0.8) * 0.55;
        const surge = Math.max(0, surgeSignal - 0.72) ** 3 * 0.38;
        motionClock += delta * (drift + flutter + surge) * tempo;

        const pulse = 1 + Math.sin(motionClock * 1.7) * 0.035;
        const compact = w < 900;
        points.scale.set(
          (compact ? 0.4 : 0.6) * pulse,
          (compact ? 0.32 : 0.45) * pulse,
          (compact ? 0.62 : 0.88) * pulse
        );
        points.rotation.z =
          0.1 + mx * 0.16 + Math.sin(motionClock * 0.72) * 0.04;
        points.rotation.x =
          -0.5 + my * 0.12 + Math.cos(motionClock * 0.58) * 0.03;
        points.rotation.y =
          Math.sin(waveT * 0.48) * 0.16 +
          Math.sin(waveT * 0.19 + 1.4) * 0.08;
        const travel = motionClock * 0.18;
        const segment = Math.floor(travel) % (waypoints.length - 1);
        const progress = travel - Math.floor(travel);
        // Dwell + dash : le nuage reste posé un moment (progress < dwell), puis
        // démarre d'un seul coup vers le point suivant et décélère en arrivant
        // (ease-out), avant de repartir plus tard dans une autre direction.
        const dwell = 0.68;
        const q = Math.max(0, (progress - dwell) / (1 - dwell));
        const eased = 1 - Math.pow(1 - q, 4);
        const from = waypoints[segment] ?? waypoints[0]!;
        const to = waypoints[segment + 1] ?? waypoints[waypoints.length - 1]!;
        const aspectTravel = Math.min(1, camera.aspect / 1.35);

        const travelScale = compact ? 0.45 : 1;
        const naturalX =
          THREE.MathUtils.lerp(from.x, to.x, eased) * aspectTravel * travelScale +
          Math.sin(motionClock * 1.3) * 0.12;
        const naturalY =
          THREE.MathUtils.lerp(from.y, to.y, eased) * travelScale +
          Math.sin(motionClock * 1.07) * 0.08;

        points.position.x = naturalX;
        points.position.y = naturalY;
        camera.position.x = mx * 2;

        // Profondeur au scroll : la caméra recule et les particules s'éloignent
        // et s'estompent à mesure qu'on quitte le hero (parallaxe de profondeur).
        const scrollP = Math.min(1, window.scrollY / (parent!.clientHeight || 1));
        const revealProgress = Math.min(1, t / 1.6);
        const revealOpacity = revealProgress * revealProgress * (3 - 2 * revealProgress);
        camera.position.z = 16 + scrollP * 12;
        // La profondeur principale appartient au bloc entier : la grille
        // avance et recule d'un seul mouvement, sans disperser ses points.
        const blockDepth =
          -0.4 +
          Math.sin(waveT * 0.38) * 0.8 +
          Math.sin(waveT * 0.17 + 1.1) * 0.25;
        points.position.z = blockDepth - scrollP * 4;
        uniforms["uOpacity"].value =
          0.58 * revealOpacity * (1 - scrollP * 0.85);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      resume = () => {
        if (reduce) {
          // Rendu statique unique (pas d'animation).
          uniforms["uOpacity"].value = 0.58;
          renderer.render(scene, camera);
          return;
        }
        if (!raf) raf = requestAnimationFrame(tick);
      };
      pause = () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };
      dispose = () => {
        pause?.();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };

      // Le chargement est asynchrone : ne démarrer que si le hero est
      // toujours visible au moment où la lib arrive.
      if (visible) resume();
    }

    return () => {
      disposed = true;
      removeActivationListeners();
      io.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
