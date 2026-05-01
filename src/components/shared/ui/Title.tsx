"use client";

import { useEffect, useState } from "react";

interface TitleProps {
  staticText: string;
  animatedText: string;
  subtitle?: string;
  seoTitle?: string;
  spaceX?: string;
}

type Phase = "typing" | "full" | "deleting" | "empty" | "typo" | "correct";

const ADJACENT_KEYS: Record<string, string> = {
  a: "z", b: "v", c: "x", d: "f", e: "r", f: "g", g: "h", h: "j",
  i: "o", j: "k", k: "l", l: "m", m: "n", n: "b", o: "p", p: "o",
  q: "a", r: "t", s: "d", t: "y", u: "i", v: "b", w: "x", x: "c",
  y: "u", z: "a",
};

function typoFor(char: string): string {
  const lower = char.toLowerCase();
  const adj = ADJACENT_KEYS[lower] ?? (lower === "e" ? "r" : "e");
  return char !== char.toLowerCase() ? adj.toUpperCase() : adj;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function AnimatedText({ animatedText }: { animatedText: string }) {
  const [displayed, setDisplayed] = useState(animatedText);
  const [phase, setPhase] = useState<Phase>("deleting");
  const [typoChar, setTypoChar] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
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
        ? Math.random() * 20 + 15
        : isWordBoundary
          ? Math.random() * 90 + 130
          : Math.random() * 70 + 55;
      if (thinkPause) delay += Math.random() * 350 + 250;
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
      t = setTimeout(() => setPhase("correct"), Math.random() * 180 + 160);
    } else if (phase === "correct") {
      t = setTimeout(() => {
        setDisplayed(animatedText.slice(0, len + 1));
        setPhase("typing");
      }, Math.random() * 130 + 180);
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
    <span
      suppressHydrationWarning
      className="inline bg-[linear-gradient(to_right,#fbbf24,#f59e0b,#f97316,#3b82f6,#2563eb)] bg-clip-text text-transparent drop-shadow-sm"
    >
      {visibleText.toLocaleUpperCase()}
    </span>
  );
}

export function Title({
  staticText,
  animatedText,
  subtitle,
  spaceX = "space-x-2",
}: TitleProps) {
  const isMobile = useIsMobile();

  return (
    <div className="text-center">
      <h1
        className={`px-4 text-3xl sm:text-4xl lg:text-6xl xl:text-6xl font-display font-bold tracking-tight leading-tight ${spaceX}`}
      >
        <span className="inline text-white">
          {staticText.toLocaleUpperCase()}{" "}
        </span>

        {isMobile ? (
          // Statique sur mobile — pas de layout shift
          <span className="inline bg-[linear-gradient(to_right,#fbbf24,#f59e0b,#f97316,#3b82f6,#2563eb)] bg-clip-text text-transparent drop-shadow-sm">
            {animatedText.toLocaleUpperCase()}
          </span>
        ) : (
          // Animé sur desktop
          <AnimatedText animatedText={animatedText} />
        )}
      </h1>

      {subtitle && (
        <h2 className="px-4 font-medium text-white text-base sm:text-lg lg:text-2xl xl:text-3xl mt-3 lg:mt-5">
          {subtitle}
        </h2>
      )}
    </div>
  );
}