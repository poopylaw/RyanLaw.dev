"use client";

import Link from "next/link";
import FadeText from "./FadeText";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-20 pt-28 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <FadeText
          as="p"
          text="MECHANICAL ENGINEERING / FABRICATION / SYSTEMS"
          className="font-mono text-xs tracking-[0.2em] text-blueprint"
        />

        <h1
          className="mt-6 text-[15vw] leading-[0.92] tracking-tight text-ink md:text-[7.5rem]"
          style={{ fontWeight: 500 }}
        >
          <FadeText text="RYAN" wordDelay={0.06} />
          <br />
          <FadeText text="LAW" baseDelay={0.06} wordDelay={0.06} />
        </h1>

        <FadeText
          as="p"
          baseDelay={0.18}
          className="mt-8 block max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          text="Mechanical engineering student at UC Irvine. I like taking things apart, racing karts, and figuring out why air does what it does. Right now I'm chasing aerodynamics work — anything where speed and shape have to fight it out."
        />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="border border-ink px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            VIEW PROJECTS →
          </Link>
          <Link
            href="/work"
            className="border border-ink/30 px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ink-soft transition-colors hover:border-blueprint hover:text-blueprint"
          >
            EXPERIENCE
          </Link>
          <a
            href="/ryan-law-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.12em] text-ink-soft underline-offset-4 hover:text-blueprint hover:underline"
          >
            VIEW RESUME (PDF) ↗
          </a>
        </div>
      </div>
    </section>
  );
}
