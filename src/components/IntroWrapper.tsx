"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const IntroAnimation = dynamic(() => import("./IntroAnimation"), { ssr: false });

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const handleDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <IntroAnimation onDone={handleDone} />}
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: introDone ? "opacity 1.2s ease" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
