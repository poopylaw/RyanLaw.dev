"use client";

import { useEffect, useState, Fragment } from "react";
import { usePageVisible } from "./PageTransition";

/**
 * Splits text into words and fades/slides each one in with a small stagger.
 * By default, syncs its reveal to the nearest <PageTransition>'s visibility
 * state (pass `active` explicitly to override, e.g. for content that isn't
 * inside a PageTransition).
 */
export default function FadeText({
  text,
  active,
  baseDelay = 0,
  wordDelay = 0.045,
  as: Tag = "span",
  className,
}: {
  text: string;
  active?: boolean;
  /** seconds before the first word starts */
  baseDelay?: number;
  /** seconds between each word's start */
  wordDelay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const pageVisible = usePageVisible();
  const isActive = active !== undefined ? active : pageVisible;

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const words = text.split(" ");

  const Comp = Tag as any;

  if (reducedMotion) {
    return <Comp className={className}>{text}</Comp>;
  }

  return (
    <Comp className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            style={{
              display: "inline-block",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(0.35em)",
              filter: isActive ? "blur(0px)" : "blur(2px)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${(
                baseDelay +
                i * wordDelay
              ).toFixed(3)}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${(
                baseDelay +
                i * wordDelay
              ).toFixed(3)}s, filter 0.5s ease ${(
                baseDelay +
                i * wordDelay
              ).toFixed(3)}s`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Comp>
  );
}
