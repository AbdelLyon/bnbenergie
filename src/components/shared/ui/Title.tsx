"use client";

import { useEffect, useState } from "react";
import { Heading } from "./Heading";

interface TitleProps {
  staticText: string;
  animatedText: string;
  subtitle?: string;
}

type Phase = "full" | "deleting" | "empty" | "typing";

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

function useTypewriter(text: string, enabled: boolean) {
  const upper = text.toUpperCase();
  // Start with full text visible — no flash of empty on first render
  const [displayed, setDisplayed] = useState(upper);
  const [phase, setPhase] = useState<Phase>("full");

  useEffect(() => {
    if (!enabled) return;
    let t: ReturnType<typeof setTimeout>;
    const len = displayed.length;

    if (phase === "full") {
      t = setTimeout(() => setPhase("deleting"), 2500);
    } else if (phase === "deleting") {
      if (len > 0) {
        t = setTimeout(
          () => setDisplayed(upper.slice(0, len - 1)),
          Math.random() * 30 + 20,
        );
      } else {
        setPhase("empty");
      }
    } else if (phase === "empty") {
      t = setTimeout(() => setPhase("typing"), 600);
    } else if (phase === "typing") {
      if (len >= upper.length) {
        t = setTimeout(() => setPhase("full"), 900);
      } else {
        const delay =
          len === 0 || upper[len - 1] === " "
            ? Math.random() * 120 + 140
            : Math.random() * 70 + 60;
        t = setTimeout(() => setDisplayed(upper.slice(0, len + 1)), delay);
      }
    }

    return () => clearTimeout(t);
  }, [displayed, phase, upper, enabled]);

  return displayed;
}

function splitFirst(text: string) {
  return { first: text[0] ?? "", rest: text.slice(1) };
}

export function Title({ staticText, animatedText, subtitle }: TitleProps) {
  const isDesktop = useIsDesktop();
  const upper = animatedText.toUpperCase();
  const animated = useTypewriter(animatedText, isDesktop);

  const displayed = isDesktop ? animated : upper;
  const { first: sf, rest: sr } = splitFirst(staticText.toUpperCase());
  const { first: af, rest: ar } = splitFirst(displayed);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
        <span className="inline-block text-[clamp(1.8rem,4.6vw,3.6rem)]">
          <span>
            <span className="text-secondary">{sf}</span>
            <span className="text-white">{sr}</span>
          </span>{" "}
          <span className="text-white">
            <span className="text-primary">{af}</span>
            {ar}
            {isDesktop && (
              <span className="ml-1 inline-block h-1 w-8 rounded-full bg-white/80 animate-[blink_1s_step-end_infinite]" />
            )}
          </span>
        </span>
      </h1>

      {subtitle && (
        <Heading
          as="h2"
          className="font-display mt-3 md:mt-4 max-w-3xl text-[clamp(0.8rem,1.5vw,1rem)] text-white/70 font-semibold"
        >
          {subtitle}
        </Heading>
      )}
    </div>
  );
}
