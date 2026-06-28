"use client";

import { useEffect, useRef } from "react";

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const linesAliveRef = useRef(true);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { onDone(); return; }

    const overlay = overlayRef.current;
    const car = carRef.current;
    if (!overlay || !car) return;

    const W = window.innerWidth;

    car.style.transition = "none";
    car.style.transform = `translateX(${-W - 450}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 1) Fly in, decelerate to center
        car.style.transition = "transform 0.9s cubic-bezier(0.15, 0.85, 0.35, 1)";
        car.style.transform = "translateX(0px)";

        // 2) Idle shake at center
        setTimeout(() => {
          car.style.transition = "transform 0.08s ease-in-out";
          car.style.transform = "translateX(3px)";
          setTimeout(() => { car.style.transform = "translateX(-3px)";
          setTimeout(() => { car.style.transform = "translateX(2px)";
          setTimeout(() => { car.style.transform = "translateX(0px)"; }, 80);
          }, 80); }, 80);
        }, 950);

        // 3) Launch off right
        setTimeout(() => {
          car.style.transition = "transform 0.45s cubic-bezier(0.55, 0, 1, 0.45)";
          car.style.transform = `translateX(${W + 450}px)`;
        }, 1350);

        // 4) Fade overlay, kill speed lines
        setTimeout(() => {
          linesAliveRef.current = false; // stop canvas loop
          overlay.style.transition = "opacity 0.7s ease";
          overlay.style.opacity = "0";
        }, 1600);

        // 5) Done
        setTimeout(() => {
          if (!doneRef.current) { doneRef.current = true; onDone(); }
        }, 2300);
      });
    });
  }, [onDone]);

  const handleSkip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    linesAliveRef.current = false;
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "0";
      setTimeout(onDone, 400);
    } else {
      onDone();
    }
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#0A0A0B",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", opacity: 1,
      }}
    >
      <SpeedLines aliveRef={linesAliveRef} />

      <div
        ref={carRef}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", willChange: "transform" }}
      >
        <F1CarSVG />
        <div style={{
          width: 340, height: 6, marginTop: 2, borderRadius: 999,
          background: "radial-gradient(ellipse, rgba(62,217,232,0.18) 0%, transparent 70%)",
        }} />
      </div>

      <button
        onClick={handleSkip}
        style={{
          position: "absolute", bottom: 24, right: 32,
          fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em",
          color: "rgba(242,242,240,0.25)", background: "none", border: "none", cursor: "pointer",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(242,242,240,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(242,242,240,0.25)")}
      >
        SKIP →
      </button>
    </div>
  );
}

function SpeedLines({ aliveRef }: { aliveRef: React.MutableRefObject<boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    type Line = { x: number; y: number; len: number; speed: number; opacity: number };
    const lines: Line[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      len: 60 + Math.random() * 180,
      speed: 18 + Math.random() * 30,
      opacity: 0.03 + Math.random() * 0.08,
    }));

    let lastTime = 0;
    const INTERVAL = 1000 / 30; // 30fps for speed lines

    const draw = (now: number) => {
      if (!aliveRef.current) { ctx.clearRect(0, 0, W, H); return; }
      requestAnimationFrame(draw);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;

      ctx.clearRect(0, 0, W, H);
      for (const l of lines) {
        const grad = ctx.createLinearGradient(l.x, 0, l.x + l.len, 0);
        grad.addColorStop(0,   `rgba(62,217,232,0)`);
        grad.addColorStop(0.5, `rgba(62,217,232,${l.opacity})`);
        grad.addColorStop(1,   `rgba(62,217,232,0)`);
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + l.len, l.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
        l.x += l.speed;
        if (l.x > W + 220) l.x = -l.len - Math.random() * 100;
      }
    };
    requestAnimationFrame(draw);
  }, [aliveRef]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

function F1CarSVG() {
  return (
    <svg width="420" height="120" viewBox="0 0 380 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="22" width="52" height="5" rx="1" fill="#1C1C1E" stroke="#3ED9E8" strokeWidth="0.6"/>
      <rect x="22" y="16" width="46" height="4" rx="1" fill="#1C1C1E" stroke="#3ED9E8" strokeWidth="0.6"/>
      <rect x="18" y="16" width="3" height="11" rx="0.5" fill="#222226" stroke="#3ED9E8" strokeWidth="0.5"/>
      <rect x="67" y="16" width="3" height="11" rx="0.5" fill="#222226" stroke="#3ED9E8" strokeWidth="0.5"/>
      <line x1="44" y1="27" x2="44" y2="40" stroke="#3ED9E8" strokeWidth="0.7" strokeOpacity="0.6"/>
      <path d="M 55 72 L 30 82 L 75 82 Z" fill="#111113" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.5"/>
      <path d="M 60 44 C 60 38 70 36 90 36 L 260 36 C 285 36 300 40 310 48 L 315 60 L 310 72 L 60 72 Z" fill="#141416" stroke="#3ED9E8" strokeWidth="0.7"/>
      <line x1="100" y1="40" x2="95" y2="68" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.4"/>
      <line x1="115" y1="39" x2="110" y2="68" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.4"/>
      <line x1="130" y1="38" x2="125" y2="68" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.3"/>
      <path d="M 130 36 C 130 36 145 20 175 18 L 235 18 C 255 18 265 28 265 36 Z" fill="#1A1A1C" stroke="#3ED9E8" strokeWidth="0.7"/>
      <path d="M 162 28 C 162 22 178 18 195 18 C 212 18 230 22 230 28" fill="none" stroke="#3ED9E8" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="196" y1="18" x2="196" y2="30" stroke="#3ED9E8" strokeWidth="1.4"/>
      <path d="M 165 30 C 165 25 178 22 196 22 C 214 22 228 25 228 30 L 220 36 L 172 36 Z" fill="#0A0A0B" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.5"/>
      <line x1="173" y1="27" x2="183" y2="24" stroke="#3ED9E8" strokeWidth="0.8" strokeOpacity="0.5"/>
      <path d="M 265 36 C 280 36 310 42 340 52 L 362 56 L 350 60 L 310 56 C 290 54 270 52 265 48 Z" fill="#121214" stroke="#3ED9E8" strokeWidth="0.7"/>
      <line x1="350" y1="56" x2="362" y2="56" stroke="#3ED9E8" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 318 60 L 375 58 L 375 63 L 318 65 Z" fill="#141416" stroke="#3ED9E8" strokeWidth="0.6"/>
      <path d="M 322 65 L 374 63 L 374 67 L 322 69 Z" fill="#0F0F11" stroke="#3ED9E8" strokeWidth="0.5"/>
      <path d="M 374 57 L 376 57 L 376 70 L 374 70 Z" fill="#222226" stroke="#3ED9E8" strokeWidth="0.5"/>
      <line x1="340" y1="60" x2="335" y2="56" stroke="#3ED9E8" strokeWidth="0.7" strokeOpacity="0.6"/>
      <path d="M 60 72 L 310 72 L 315 76 L 55 78 Z" fill="#0F0F11" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.5"/>
      <circle cx="75" cy="80" r="18" fill="#0D0D0F" stroke="#3ED9E8" strokeWidth="1.2"/>
      <circle cx="75" cy="80" r="12" fill="#111113" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="75" cy="80" r="4" fill="#3ED9E8" opacity="0.6"/>
      <circle cx="75" cy="80" r="16" fill="none" stroke="#FF5C4D" strokeWidth="0.8" strokeOpacity="0.3"/>
      <line x1="75" y1="62" x2="75" y2="98" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.3"/>
      <line x1="57" y1="80" x2="93" y2="80" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.3"/>
      <circle cx="302" cy="80" r="16" fill="#0D0D0F" stroke="#3ED9E8" strokeWidth="1.2"/>
      <circle cx="302" cy="80" r="10" fill="#111113" stroke="#3ED9E8" strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="302" cy="80" r="3.5" fill="#3ED9E8" opacity="0.6"/>
      <circle cx="302" cy="80" r="14" fill="none" stroke="#FF5C4D" strokeWidth="0.8" strokeOpacity="0.3"/>
      <line x1="302" y1="64" x2="302" y2="96" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.3"/>
      <line x1="286" y1="80" x2="318" y2="80" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.3"/>
      <rect x="155" y="30" width="70" height="3" rx="1" fill="#1E1E20" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.5"/>
      <rect x="220" y="38" width="22" height="14" rx="1" fill="#1A1A1C" stroke="#3ED9E8" strokeWidth="0.6"/>
      <text x="231" y="49" textAnchor="middle" fill="#3ED9E8" fontSize="8" fontFamily="monospace" fontWeight="bold">1</text>
      <line x1="90" y1="54" x2="260" y2="42" stroke="#3ED9E8" strokeWidth="1" strokeOpacity="0.45"/>
      <line x1="90" y1="58" x2="260" y2="46" stroke="#3ED9E8" strokeWidth="0.4" strokeOpacity="0.2"/>
      <defs>
        <filter id="exblur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>
      <ellipse cx="45" cy="56" rx="12" ry="4" fill="#FF5C4D" opacity="0.2" filter="url(#exblur)"/>
      <ellipse cx="38" cy="56" rx="7" ry="2.5" fill="#FF8C4D" opacity="0.3" filter="url(#exblur)"/>
    </svg>
  );
}
