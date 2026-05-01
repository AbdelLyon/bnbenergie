import { useEffect, useState } from "react";

const ADJACENT_KEYS = {
  a:"z",b:"v",c:"x",d:"f",e:"r",f:"g",g:"h",h:"j",
  i:"o",j:"k",k:"l",l:"m",m:"n",n:"b",o:"p",p:"o",
  q:"a",r:"t",s:"d",t:"y",u:"i",v:"b",w:"x",x:"c",
  y:"u",z:"a",
};

function typoFor(char) {
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

const gradientStyle = {
  background: "linear-gradient(to right, #fbbf24, #f59e0b, #f97316, #3b82f6, #2563eb)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline",
};

function AnimatedText({ animatedText }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing");
  const [typoChar, setTypoChar] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => { setHasHydrated(true); }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    let t;
    const len = displayed.length;

    if (phase === "typing") {
      if (len >= animatedText.length) { t = setTimeout(() => setPhase("full"), 50); return () => clearTimeout(t); }
      const isWordBoundary = len === 0 || animatedText[len - 1] === " ";
      const burstMode = !isWordBoundary && Math.random() < 0.15;
      const thinkPause = !burstMode && Math.random() < 0.05;
      let delay = burstMode ? Math.random()*20+15 : isWordBoundary ? Math.random()*90+130 : Math.random()*70+55;
      if (thinkPause) delay += Math.random()*350+250;
      const makeTypo = Math.random()<0.09 && len>1 && len<animatedText.length-1 && /[a-zA-Z]/.test(animatedText[len]??"");
      t = setTimeout(() => {
        if (makeTypo) { setTypoChar(typoFor(animatedText[len]??"")); setPhase("typo"); }
        else { setDisplayed(animatedText.slice(0, len+1)); }
      }, delay);
    } else if (phase === "typo") {
      t = setTimeout(() => setPhase("correct"), Math.random()*180+160);
    } else if (phase === "correct") {
      t = setTimeout(() => { setDisplayed(animatedText.slice(0, len+1)); setPhase("typing"); }, Math.random()*130+180);
    } else if (phase === "full") {
      t = setTimeout(() => setPhase("deleting"), 2200);
    } else if (phase === "deleting") {
      if (len > 0) { t = setTimeout(() => setDisplayed(animatedText.slice(0, len-1)), Math.random()*30+22); }
      else { setPhase("empty"); }
    } else if (phase === "empty") {
      t = setTimeout(() => setPhase("typing"), 600);
    }
    return () => clearTimeout(t);
  }, [displayed, phase, animatedText, hasHydrated]);

  const visibleText = phase === "typo" ? displayed + typoChar : displayed;

  return (
    <span style={gradientStyle}>
      {visibleText.toLocaleUpperCase()}
    </span>
  );
}

// Mobile: première lettre colorée, reste blanc
function MobileStaticText({ staticText, animatedText }) {
  const firstStatic = staticText[0].toUpperCase();
  const restStatic = staticText.slice(1).toUpperCase();
  const firstAnimated = animatedText[0].toUpperCase();
  const restAnimated = animatedText.slice(1).toUpperCase();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      {/* Ligne décorative top */}
      <div style={{
        width: "32px", height: "2px",
        background: "linear-gradient(to right, #fbbf24, #3b82f6)",
        borderRadius: "999px", marginBottom: "10px"
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
        {/* Static text */}
        <span>
          <span style={{ color: "#fbbf24" }}>{firstStatic}</span>
          <span style={{ color: "white" }}>{restStatic}</span>
        </span>

        {/* Séparateur discret */}
        <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 6px", fontWeight: 300 }}>·</span>

        {/* Animated text static on mobile */}
        <span>
          <span style={{ color: "#60a5fa" }}>{firstAnimated}</span>
          <span style={{ color: "white" }}>{restAnimated}</span>
        </span>
      </h1>
    </div>
  );
}

export default function Title({
  staticText = "Gestion",
  animatedText = "Locative",
  subtitle = "La plateforme pour vos locations",
  spaceX = "space-x-1",
}) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "2rem 1rem",
    }}>

      {isMobile ? (
        /* ── MOBILE ── */
        <div style={{ textAlign: "center", width: "100%" }}>
          <MobileStaticText staticText={staticText} animatedText={animatedText} />

          {subtitle && (
            <>
              {/* Ligne sous le titre */}
              <div style={{
                width: "48px", height: "1px",
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
        /* ── DESKTOP ── */
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: "3.75rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            margin: 0,
            padding: "0 1rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "baseline",
          }}>
            <span style={{ color: "white", display: "inline" }}>
              {staticText.toLocaleUpperCase()}
            </span>
            <AnimatedText animatedText={animatedText} />
          </h1>

          {subtitle && (
            <p style={{
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              marginTop: "1rem",
              padding: "0 1rem",
              letterSpacing: "0.02em",
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}