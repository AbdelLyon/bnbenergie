"use client";

import { useEffect, useState } from "react";

interface TitleProps {
  staticText: string;
  animatedText: string;
  subtitle?: string;
  seoTitle?: string;
}

type Phase = "typing" | "full" | "deleting" | "empty" | "typo" | "correct";

const ADJACENT_KEYS: Record<string, string> = {
  a:"z",b:"v",c:"x",d:"f",e:"r",f:"g",g:"h",h:"j",
  i:"o",j:"k",k:"l",l:"m",m:"n",n:"b",o:"p",p:"o",
  q:"a",r:"t",s:"d",t:"y",u:"i",v:"b",w:"x",x:"c",
  y:"u",z:"a",
};

function typoFor(char: string): string {
  if (!char) return "";
  const lower = char.toLowerCase();
  const adj = ADJACENT_KEYS[lower] ?? (lower === "e" ? "r" : "e");
  return char !== char.toLowerCase() ? adj.toUpperCase() : adj;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function AnimatedText({ animatedText }: { animatedText: string }) {
  const firstChar = animatedText[0]?.toUpperCase() ?? "";
  const restText = animatedText.slice(1);

  const [displayed, setDisplayed] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [typoChar, setTypoChar] = useState<string>("");
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => { setHasHydrated(true); }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    let t: NodeJS.Timeout;
    const len = displayed.length;

    if (phase === "typing") {
      if (len >= restText.length) {
        t = setTimeout(() => setPhase("full"), 50);
        return () => clearTimeout(t);
      }
      const isWordBoundary = len === 0 || restText[len - 1] === " ";
      const burstMode = !isWordBoundary && Math.random() < 0.15;
      const thinkPause = !burstMode && Math.random() < 0.05;
      let delay = burstMode
        ? Math.random() * 40 + 30          
        : isWordBoundary
        ? Math.random() * 140 + 180      
        : Math.random() * 100 + 90;        
      if (thinkPause) delay += Math.random() * 500 + 350; 
      const makeTypo =
        Math.random() < 0.09 &&
        len > 1 &&
        len < restText.length - 1 &&
        /[a-zA-Z]/.test(restText[len] ?? "");
      t = setTimeout(() => {
        if (makeTypo) {
          setTypoChar(typoFor(restText[len] ?? ""));
          setPhase("typo");
        } else {
          setDisplayed(restText.slice(0, len + 1));
        }
      }, delay);
    } else if (phase === "typo") {
      t = setTimeout(() => setPhase("correct"), Math.random() * 200 + 180);
    } else if (phase === "correct") {
      t = setTimeout(() => {
        setDisplayed(restText.slice(0, len + 1));
        setPhase("typing");
      }, Math.random() * 160 + 200);
    } else if (phase === "full") {
      t = setTimeout(() => setPhase("deleting"), 2800);   
    } else if (phase === "deleting") {
      if (len > 0) {
        t = setTimeout(
          () => setDisplayed(restText.slice(0, len - 1)),
          Math.random() * 45 + 35,                        
        );
      } else {
        setPhase("empty");
      }
    } else if (phase === "empty") {
      t = setTimeout(() => setPhase("typing"), 800);     
    }

    return () => clearTimeout(t);
  }, [displayed, phase, restText, hasHydrated]);

  const visibleText = phase === "typo" ? displayed + typoChar : displayed;

  return (
    <>
      <span className="text-blue-400">{firstChar}</span>
      <span
        suppressHydrationWarning
        className="inline bg-[linear-gradient(to_right,#fbbf24,#f59e0b,#f97316,#3b82f6,#2563eb)] bg-clip-text text-transparent"
      >
        {visibleText.toLocaleUpperCase()}
      </span>
    </>
  );
}

interface TitleContentProps {
  staticText: string;
  animatedText: string;
  subtitle?: string;
  desktop?: boolean;
}

function TitleContent({ staticText, animatedText, subtitle, desktop = false }: TitleContentProps) {
  const firstStatic = staticText[0]?.toUpperCase() ?? "";
  const restStatic = staticText.slice(1).toUpperCase();
  const firstAnimated = animatedText[0]?.toUpperCase() ?? "";
  const restAnimated = animatedText.slice(1).toUpperCase();

  return (
    <div className="flex flex-col items-center">

      {/* Ligne dégradée */}
      <div className={`
        bg-[linear-gradient(to_right,#fbbf24,#3b82f6)] rounded-full
        ${desktop ? "w-16 h-[3px] mb-5" : "w-12 h-[2px] mb-3.5"}
      `} />

      {/* Titre */}
      <h1 className={`
        font-display font-extrabold tracking-tight leading-tight text-center
        ${desktop
          ? "text-4xl lg:text-5xl xl:text-6xl px-8"
          : "text-[clamp(2rem,8vw,2.5rem)] px-5"
        }
      `}>
        <span>
          <span className="text-amber-400">{firstStatic}</span>
          <span className="text-white">{restStatic}</span>
        </span>
        {" "}
        {desktop ? (
          <AnimatedText animatedText={animatedText} />
        ) : (
          <span>
            <span className="text-blue-400">{firstAnimated}</span>
            <span className="text-white">{restAnimated}</span>
          </span>
        )}
      </h1>

      {/* Subtitle */}
      {subtitle && (
          <p className={`
            uppercase tracking-widest text-white/80 font-normal
            ${desktop ? "text-sm lg:text-[0.9rem] mt-2.5 px-8" : "text-xs mt-1.5 px-6"}
          `}>
            {subtitle}
          </p>
      )}
    </div>
  );
}

export function Title({
  staticText,
  animatedText,
  subtitle,
  seoTitle,
}: TitleProps) {
  const isMobile = useIsMobile();

  return (
    <div className="text-center">
      {seoTitle && <span className="sr-only">{seoTitle}</span>}
      <TitleContent
        staticText={staticText}
        animatedText={animatedText}
        subtitle={subtitle}
        desktop={!isMobile}
      />
    </div>
  );
}