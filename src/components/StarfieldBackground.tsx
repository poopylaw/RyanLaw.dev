"use client";

import { useEffect, useMemo, useRef, forwardRef } from "react";

type Star = { x: number; y: number; size: number; opacity: number };

function makeStars(count: number, seed: number): Star[] {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 0.6 + rand() * 1.8,
    opacity: 0.25 + rand() * 0.65,
  }));
}

export default function StarfieldBackground() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  const farStars  = useMemo(() => makeStars(120, 7), []);
  const midStars  = useMemo(() => makeStars(70, 23), []);
  const nearStars = useMemo(() => makeStars(35, 41), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf = 0;
    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;

      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;

      if (farRef.current)
        farRef.current.style.transform  = `translate3d(${cx * 8}px, ${cy * 6}px, 0)`;
      if (midRef.current)
        midRef.current.style.transform  = `translate3d(${cx * 20}px, ${cy * 15}px, 0)`;
      if (nearRef.current)
        nearRef.current.style.transform = `translate3d(${cx * 38}px, ${cy * 28}px, 0)`;
    };

    // Pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        lastTime = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-paper">
      <StarLayer ref={farRef}  stars={farStars}  twinkle={false} />
      <StarLayer ref={midRef}  stars={midStars}  twinkle />
      <StarLayer ref={nearRef} stars={nearStars} twinkle glow />

      <div className="absolute inset-0" style={{
        background: "radial-gradient(700px circle at 25% 20%, rgba(62,217,232,0.06), transparent 60%), radial-gradient(800px circle at 80% 75%, rgba(62,217,232,0.05), transparent 60%)",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 30%, rgba(10,10,11,0) 0%, rgba(10,10,11,0.5) 75%, rgba(10,10,11,0.9) 100%)",
      }} />
    </div>
  );
}

const StarLayer = forwardRef<HTMLDivElement, { stars: Star[]; twinkle?: boolean; glow?: boolean }>(
  function StarLayer({ stars, twinkle, glow }, ref) {
    return (
      <div ref={ref} className="absolute -inset-[10%]" style={{ willChange: "transform" }}>
        {stars.map((star, i) => (
          <div
            key={i}
            className={twinkle ? "twinkle" : undefined}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "#F2F2F0",
              opacity: star.opacity,
              "--twinkle-base": star.opacity,
              boxShadow: glow ? `0 0 ${star.size * 2}px rgba(62,217,232,0.5)` : undefined,
              animationDelay: twinkle ? `${(i % 10) * 0.4}s` : undefined,
            } as React.CSSProperties}
          />
        ))}
      </div>
    );
  }
);
