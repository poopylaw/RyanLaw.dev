"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 8;

export default function CustomCursor() {
  const orbRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.body.classList.add("cursor-ready");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let orbX = targetX, orbY = targetY;
    let hovering = false;
    let hidden = true;
    let raf = 0;
    let lastTime = 0;
    const INTERVAL = 1000 / 60; // cursor stays 60fps for smoothness

    const history: { x: number; y: number }[] = Array.from(
      { length: TRAIL_LENGTH },
      () => ({ x: targetX, y: targetY })
    );

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (hidden) {
        hidden = false;
        if (orbRef.current) orbRef.current.style.opacity = "1";
        trailRefs.current.forEach(el => el && (el.style.opacity = ""));
      }
      const el = e.target as HTMLElement;
      hovering = Boolean(el.closest("a, button, [role='button'], input, textarea"));
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;

      orbX += (targetX - orbX) * 0.15;
      orbY += (targetY - orbY) * 0.15;

      const size  = hovering ? 20 : 12;
      const color = hovering ? "#FF5C4D" : "#3ED9E8";
      const glow  = hovering
        ? "0 0 10px 3px #FF5C4D99, 0 0 22px 8px #FF5C4D44"
        : "0 0 10px 3px #3ED9E899, 0 0 22px 8px #3ED9E844";

      if (orbRef.current) {
        const o = orbRef.current;
        o.style.transform  = `translate3d(${orbX}px, ${orbY}px, 0)`;
        o.style.width      = `${size}px`;
        o.style.height     = `${size}px`;
        o.style.background = color;
        o.style.boxShadow  = glow;
        o.style.marginLeft = `-${size / 2}px`;
        o.style.marginTop  = `-${size / 2}px`;
      }

      history.unshift({ x: orbX, y: orbY });
      history.length = TRAIL_LENGTH;

      trailRefs.current.forEach((el, i) => {
        const pos = history[i + 1];
        if (!el || !pos) return;
        const t  = i / (TRAIL_LENGTH - 2);
        const ts = size * (1 - t * 0.7);
        el.style.transform  = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        el.style.width      = `${ts}px`;
        el.style.height     = `${ts}px`;
        el.style.marginLeft = `-${ts / 2}px`;
        el.style.marginTop  = `-${ts / 2}px`;
        el.style.background = color;
        el.style.opacity    = String((1 - t) * 0.4);
      });
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { lastTime = 0; raf = requestAnimationFrame(tick); }
    };

    if (!reduced) raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => {
      hidden = true;
      if (orbRef.current) orbRef.current.style.opacity = "0";
      trailRefs.current.forEach(el => el && (el.style.opacity = "0"));
    });
    document.addEventListener("mouseenter", () => {
      hidden = false;
      if (orbRef.current) orbRef.current.style.opacity = "1";
    });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      document.body.classList.remove("cursor-ready");
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          style={{
            position: "fixed", top: 0, left: 0,
            width: 12, height: 12,
            borderRadius: "50%",
            background: "#3ED9E8",
            pointerEvents: "none",
            zIndex: 9998,
            opacity: 0,
            filter: "blur(1px)",
            willChange: "transform",
          }}
        />
      ))}
      <div
        ref={orbRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 12, height: 12,
          borderRadius: "50%",
          background: "#3ED9E8",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          boxShadow: "0 0 10px 3px #3ED9E899, 0 0 22px 8px #3ED9E844",
          willChange: "transform",
        }}
      />
    </div>
  );
}
