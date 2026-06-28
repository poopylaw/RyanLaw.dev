"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/work", label: "EXPERIENCE" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/skills", label: "CAPABILITIES" },
  { href: "/contact", label: "CONTACT" },
];

export default function TitleBlock() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-ink/15 bg-paper/90 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className={`font-mono text-xs tracking-[0.18em] transition-colors hover:text-blueprint ${
            pathname === "/" ? "text-blueprint" : "text-ink-soft"
          }`}
        >
          HOME
        </Link>
        <nav className="hidden gap-8 md:flex">
          {sections.map((s) => {
            const active =
              pathname === s.href || pathname.startsWith(s.href + "/");
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`font-mono text-[11px] tracking-[0.14em] transition-colors hover:text-blueprint ${
                  active ? "text-blueprint" : "text-ink-soft"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="font-mono text-[11px] tracking-[0.14em] border border-ink/30 px-3 py-1.5 text-ink hover:border-blueprint hover:text-blueprint transition-colors"
        >
          GET IN TOUCH
        </Link>
      </div>
    </header>
  );
}
