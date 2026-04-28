"use client";

import { LazyMotionDiv, LazyMotionSpan } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS, TRANSITIONS } from "@/config/constants";
import { useEffect, useState } from "react";

interface TitleProps {
  staticText: string;
  animatedText: string;
  subtitle?: string;
  seoTitle?: string;
  spaceX?: string;
}

type Phase = "typing" | "full" | "deleting" | "empty" | "typo" | "correct";

// Touches adjacentes sur clavier AZERTY pour simuler une vraie faute de frappe
const ADJACENT_KEYS: Record<string, string> = {
  a: "z",
  b: "v",
  c: "x",
  d: "f",
  e: "r",
  f: "g",
  g: "h",
  h: "j",
  i: "o",
  j: "k",
  k: "l",
  l: "m",
  m: "n",
  n: "b",
  o: "p",
  p: "o",
  q: "a",
  r: "t",
  s: "d",
  t: "y",
  u: "i",
  v: "b",
  w: "x",
  x: "c",
  y: "u",
  z: "a",
};

function typoFor(char: string): string {
  const lower = char.toLowerCase();
  const adj = ADJACENT_KEYS[lower] ?? (lower === "e" ? "r" : "e");
  return char !== char.toLowerCase() ? adj.toUpperCase() : adj;
}

export function Title({
  staticText,
  animatedText,
  spaceX = "space-x-4",
}: TitleProps) {
  const [displayed, setDisplayed] = useState(animatedText);
  const [phase, setPhase] = useState<Phase>("full");
  const [typoChar, setTypoChar] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setPhase("typing");
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    let t: NodeJS.Timeout;
    const len = displayed.length;

    if (phase === "typing") {
      if (len >= animatedText.length) {
        t = setTimeout(() => setPhase("full"), 50);
        return () => clearTimeout(t);
      }

      const isWordBoundary = len === 0 || animatedText[len - 1] === " ";
      const burstMode = !isWordBoundary && Math.random() < 0.15;
      const thinkPause = !burstMode && Math.random() < 0.05;

      let delay = burstMode
        ? Math.random() * 20 + 15 // burst : 15–35 ms
        : isWordBoundary
          ? Math.random() * 90 + 130 // début de mot : 130–220 ms
          : Math.random() * 70 + 55; // normal : 55–125 ms

      if (thinkPause) delay += Math.random() * 350 + 250; // pause pensée : +250–600 ms

      const makeTypo =
        Math.random() < 0.09 &&
        len > 1 &&
        len < animatedText.length - 1 &&
        /[a-zA-Z]/.test(animatedText[len] ?? "");

      t = setTimeout(() => {
        if (makeTypo) {
          setTypoChar(typoFor(animatedText[len] ?? ""));
          setPhase("typo");
        } else {
          setDisplayed(animatedText.slice(0, len + 1));
        }
      }, delay);
    } else if (phase === "typo") {
      // Affiche la faute un court instant avant de "réaliser"
      t = setTimeout(() => setPhase("correct"), Math.random() * 180 + 160);
    } else if (phase === "correct") {
      // Courte hésitation après la correction, puis frappe la bonne touche
      t = setTimeout(
        () => {
          setDisplayed(animatedText.slice(0, len + 1));
          setPhase("typing");
        },
        Math.random() * 130 + 180,
      );
    } else if (phase === "full") {
      t = setTimeout(() => setPhase("deleting"), 2200);
    } else if (phase === "deleting") {
      if (len > 0) {
        t = setTimeout(
          () => setDisplayed(animatedText.slice(0, len - 1)),
          Math.random() * 30 + 22,
        );
      } else {
        setPhase("empty");
      }
    } else if (phase === "empty") {
      t = setTimeout(() => setPhase("typing"), 600);
    }

    return () => clearTimeout(t);
  }, [displayed, phase, animatedText, hasHydrated]);

  const visibleText = phase === "typo" ? displayed + typoChar : displayed;

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <h1
        className={`px-4 text-4xl font-display font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  ${spaceX}`}
      >
        <LazyMotionSpan
          className="inline-block text-white "
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATIONS.slow,
            delay: 0.2,
            ...TRANSITIONS.easeOut,
          }}
        >
          {staticText.toLocaleUpperCase()}
        </LazyMotionSpan>

        <span
          suppressHydrationWarning
          className="inline-block bg-[linear-gradient(to_right,#fbbf24,#f59e0b,#f97316,#3b82f6,#2563eb)] bg-clip-text text-transparent drop-shadow-sm"
        >
          {visibleText.toLocaleUpperCase()}
        </span>
      </h1>
    </LazyMotionDiv>
  );
}
