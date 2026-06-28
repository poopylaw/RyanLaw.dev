"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PageVisibleContext = createContext(false);

/** Used by <FadeText> to know when the page transition has started revealing. */
export function usePageVisible() {
  return useContext(PageVisibleContext);
}

/**
 * Wraps page content so it fades in on first load AND every time the route
 * changes (since Next.js App Router doesn't remount shared layout pieces,
 * a plain CSS animation on mount alone won't replay on navigation).
 *
 * Also provides a context flag that <FadeText> reads, so word-by-word
 * staggered text inside this wrapper starts its reveal in sync with the
 * container fade rather than firing immediately on mount.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setVisible(true);
      return;
    }

    // Reset then re-trigger the fade on every pathname change.
    setVisible(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <PageVisibleContext.Provider value={visible}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {children}
      </div>
    </PageVisibleContext.Provider>
  );
}
