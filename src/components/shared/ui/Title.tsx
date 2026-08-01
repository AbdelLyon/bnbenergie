"use client";

import { useEffect, useMemo, useState } from "react";

interface TitleProps {
  staticText: string;
  animatedText: string;
  seoTitle?: string;
  subtitle?: string;
  /** onDark = texte blanc (hero image) ; onLight = texte sombre (hero clair) */
  tone?: "onDark" | "onLight";
}

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

/* ⌨️ typewriter : écriture UNE seule fois au premier chargement (pas de boucle) */
function useTypewriter(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const len = displayed.length;
    if (len >= text.length) {
      setDone(true);
      return;
    }

    const delay =
      len === 0 || text[len - 1] === " "
        ? Math.random() * 120 + 140
        : Math.random() * 70 + 60;

    const t = setTimeout(() => {
      setDisplayed(text.slice(0, len + 1));
    }, delay);

    return () => clearTimeout(t);
  }, [displayed, done, text]);

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
  tone = "onDark",
}: TitleProps) {
  const isDesktop = useIsDesktop();
  const animated = useTypewriter(animatedText.toUpperCase());
  const upper = useMemo(() => animatedText.toUpperCase(), [animatedText]);

  const staticSplit = splitFirstLetter(staticText.toUpperCase());
  const animatedSplit = splitFirstLetter(animated);
  const fallbackSplit = splitFirstLetter(upper);

  const showAnimated = isDesktop;

  const isLight = tone === "onLight";
  const restColor = isLight ? "text-neutral-700" : "text-white";
  const subtitleColor = isLight ? "text-neutral-600" : "text-white/85";
  const caretColor = isLight ? "bg-neutral-900/80" : "bg-white/80";
  const titleShadow = isLight ? "" : " [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]";

  return (
    <div className="flex flex-col items-center text-center">
      <h1
        className={`hero-antigravity-title mx-auto max-w-[24ch] uppercase${titleShadow}`}
      >
        {seoTitle && <span className="sr-only">{seoTitle}</span>}
        <span className="inline-block whitespace-nowrap ">
          <span>
            <span className="text-secondary">{staticSplit.first}</span>
            <span className={restColor}>{staticSplit.rest}</span>
          </span>

          <span className="mx-2" />

          <span className={restColor}>
            {showAnimated ? (
              <>
                <span className="text-primary">{animatedSplit.first}</span>
                {animatedSplit.rest}
                {animated.length < upper.length && (
                  <span
                    className={`ml-1 inline-block h-1 w-8 rounded-full ${caretColor} animate-[blink_1s_step-end_infinite]`}
                  />
                )}
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

      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-[82ch] text-[clamp(16.5px,1.8vw,19px)] font-medium leading-[1.58] ${subtitleColor}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
