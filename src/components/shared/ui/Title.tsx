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
  a:"z",b:"v",c:"x",d:"f",e:"r",f:"g",g:"h",h:"j",
  i:"o",j:"k",k:"l",l:"m",m:"n",n:"b",o:"p",p:"o",
  q:"a",r:"t",s:"d",t:"y",u:"i",v:"b",w:"x",x:"c",
  y:"u",z:"a",
};

function typoFor(char: string): string {
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

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #fbbf24, #f59e0b, #f97316, #3b82f6, #2563eb)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline",
};

function AnimatedText({ animatedText }: { animatedText: string }) {
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
        t = setTimeout(() => setDisplayed(animatedText.slice(0, len - 1)), Math.random() * 30 + 22);
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
    <span suppressHydrationWarning style={gradientStyle}>
      {visibleText.toLocaleUpperCase()}
    </span>
  );
}

interface MobileStaticTextProps {
  staticText: string;
  animatedText: string;
}

function MobileStaticText({ staticText, animatedText }: MobileStaticTextProps) {
  const firstStatic = staticText[0]?.toUpperCase();
  const restStatic = staticText.slice(1).toUpperCase();
  const firstAnimated = animatedText[0]?.toUpperCase();
  const restAnimated = animatedText.slice(1).toUpperCase();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        width: "32px",
        height: "2px",
        background: "linear-gradient(to right, #fbbf24, #3b82f6)",
        borderRadius: "999px",
        marginBottom: "10px",
      }} />
      <h1 style={{
        fontSize: "clamp(2rem, 8vw, 2.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        margin: 0,
        padding: "0 1.25rem",
        textAlign: "center",
      }}>
        <span>
          <span style={{ color: "#fbbf24" }}>{firstStatic}</span>
          <span style={{ color: "white" }}>{restStatic}</span>
        </span>
        <span>
          <span style={{ color: "#60a5fa" }}>{firstAnimated}</span>
          <span style={{ color: "white" }}>{restAnimated}</span>
        </span>
      </h1>
    </div>
  );
}

export function Title({
  staticText,
  animatedText,
  subtitle,
  seoTitle,
  spaceX = "space-x-1",
}: TitleProps) {
  const isMobile = useIsMobile();

  return (
    <div className="text-center">
      {/* SEO title caché visuellement */}
      {seoTitle && (
        <span className="sr-only">{seoTitle}</span>
      )}

      {isMobile ? (
        <div style={{ textAlign: "center", width: "100%" }}>
          <MobileStaticText staticText={staticText} animatedText={animatedText} />
          {subtitle && (
            <>
              <div style={{
                width: "48px",
                height: "1px",
                background: "rgba(255,255,255,0.15)",
                margin: "14px auto",
              }} />
              <p style={{
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
                padding: "0 1.5rem",
              }}>
                {subtitle}
              </p>
            </>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1
            className={`px-4 text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-display font-bold tracking-tight leading-tight ${spaceX}`}
          >
            <span className="inline text-white drop-shadow-sm">
              {staticText.toLocaleUpperCase()}
            </span>
            <AnimatedText animatedText={animatedText} />
          </h1>
          {subtitle && (
            <h2 className="px-4 font-medium text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl mt-3 lg:mt-5">
              {subtitle}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}