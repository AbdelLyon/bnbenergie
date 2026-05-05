"use client";

import { useEffect, useMemo, useState } from "react";
import { Heading } from "./Heading";

interface TitleProps {
  staticText: string;
  animatedText: string;
  seoTitle?: string;
  subtitle?: string;
}

type Phase = "typing" | "full" | "deleting" | "empty";

/* 📱 hook desktop propre */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
}

/* ⌨️ typewriter optimisé (moins de re-render) */
function useTypewriter(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    let t: NodeJS.Timeout;
    const len = displayed.length;

    if (phase === "typing") {
      if (len >= text.length) {
        t = setTimeout(() => setPhase("full"), 900);
      } else {
        const delay =
          len === 0 || text[len - 1] === " "
            ? Math.random() * 120 + 140
            : Math.random() * 70 + 60;

        t = setTimeout(() => {
          setDisplayed(text.slice(0, len + 1));
        }, delay);
      }
    }

    if (phase === "full") {
      t = setTimeout(() => setPhase("deleting"), 2500);
    }

    if (phase === "deleting") {
      if (len > 0) {
        t = setTimeout(
          () => {
            setDisplayed(text.slice(0, len - 1));
          },
          Math.random() * 30 + 20,
        );
      } else {
        setPhase("empty");
      }
    }

    if (phase === "empty") {
      t = setTimeout(() => {
        setDisplayed("");
        setPhase("typing");
      }, 600);
    }

    return () => clearTimeout(t);
  }, [displayed, phase, text]);

  return displayed;
}

/* 🎯 clean string util */
function splitFirstLetter(text: string) {
  return {
    first: text?.[0] ?? "",
    rest: text?.slice(1) ?? "",
  };
}

export function Title({
  staticText,
  animatedText,
  seoTitle,
  subtitle,
}: TitleProps) {
  const isDesktop = useIsDesktop();
  const animated = useTypewriter(animatedText.toUpperCase());
  const upper = useMemo(() => animatedText.toUpperCase(), [animatedText]);

  const staticSplit = splitFirstLetter(staticText.toUpperCase());
  const animatedSplit = splitFirstLetter(animated);
  const fallbackSplit = splitFirstLetter(upper);

  const showAnimated = isDesktop;

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
        {seoTitle && <span className="sr-only">{seoTitle}</span>}
        {/* 🧱 SINGLE LINE WRAPPER (IMPORTANT FIX) */}
        <span className="inline-block whitespace-nowrap text-[clamp(2.2rem,6vw,4.6rem)]">
          {/* STATIC PART */}
          <span>
            <span className="text-secondary">{staticSplit.first}</span>
            <span className="text-white">{staticSplit.rest}</span>
          </span>

          {/* SPACE */}
          <span className="mx-2" />

          {/* ANIMATED PART */}
          <span className="text-white">
            {showAnimated ? (
              <>
                <span className="text-primary">{animatedSplit.first}</span>
                {animatedSplit.rest}
                <span className="ml-1 inline-block h-1 w-8 rounded-full bg-white/80 animate-[blink_1s_step-end_infinite]" />
              </>
            ) : (
              <>
                <span className="text-primary">{fallbackSplit.first}</span>
                {fallbackSplit.rest}
              </>
            )}
          </span>
        </span>
      </h1>

      {/* SUBTITLE */}
      {subtitle && (
        <Heading
          as="h2"
          className="mt-4 md:text-xl opacity-90 text-white/70 font-medium lowercase!"
        >
          {subtitle}
        </Heading>
      )}
    </div>
  );
}
